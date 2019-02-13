const express = require('express')
const next = require('next')
const {parse} = require('url')
const compression = require('compression')
const {join} = require('path')
const path = require('path')
const sslRedirect = require('heroku-ssl-redirect')
const checkPort = require('../lib/middlewares/checkPort')
const buildSitemap = require('../lib/sitemap')
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({dir: '.', dev})
const handle = app.getRequestHandler()
const MapsService = require('../services/google-maps-api')
const listingsRouter = require('./routes/listings')
const timber = require('timber')

timber.config.append_metadata = true

const startServer = () => {
  app
    .prepare()
    .then(() => {
      const server = express()
      server.use(compression())
      server.use(timber.middlewares.express())
      server.use(sslRedirect(['production'], 301))

      if (process.env.NODE_ENV === 'production') {
        server.use((req, res, next) => {
          if (req.hostname === 'localhost' || req.subdomains.length > 0)
            return next()
          res.redirect(301, `https://www.${req.headers.host}${req.url}`)
        })
      }

      server.use(function(req, res, next) {
        res.locals.app = app
        next()
      })

      server.use('/imoveis', listingsRouter)

      server.get(
        '/:state/:city/:neighborhood/:street/:listingId(id-\\d+)',
        (req, res) => {
          const actualPage = '/listings/show'
          const queryParams = {id: req.params.id, ...req.query}
          res.locals.app.render(req, res, actualPage, queryParams)
        }
      )

      server.get('/maps/autocomplete', async (req, res) => {
        const {q} = req.query
        try {
          const result = await MapsService.search(
            MapsService.placesAutoComplete,
            {
              input: q,
              language: 'pt-BR',
              components: {country: 'br'},
              types: ['address']
            }
          )
          res.status(200).send(result)
        } catch (e) {
          res.status(500).send({error: e})
        }
      })

      server.get('/maps/placeDetail', async (req, res) => {
        const {q} = req.query
        try {
          const result = await MapsService.search(MapsService.place, {
            placeid: q,
            language: 'pt-BR'
          })
          res.status(200).send(result)
        } catch (e) {
          res.status(500).send({error: e})
        }
      })

      server.get('/privacy_policy', (req, res) => {
        return app.render(req, res, '/privacy_policy', req.query)
      })

      server.get('/vender-imovel', (req, res) => {
        res.redirect(301, '/vender')
      })

      server.get('/jobs', (req, res) => {
        res.redirect(301, 'https://jobs.emcasa.com/')
      })

      server.get('/logout', (req, res) => {
        return app.render(req, res, '/auth/logout', req.query)
      })

      server.get('/login', (req, res) => {
        return app.render(req, res, '/auth/login', req.query)
      })

      server.get('/lembrar_senha', (req, res) => {
        return app.render(req, res, '/auth/password_recovery', req.query)
      })

      server.get('/resetar_senha/:token', (req, res) => {
        return app.render(req, res, '/auth/password_reset', req.query)
      })

      server.get('/confirmar_cadastro/:token', (req, res) => {
        app.render(req, res, '/auth/confirm', req.query)
      })

      server.get('/vender', (req, res) => {
        return app.render(req, res, '/listings/sell', req.query)
      })

      server.get('/vender/sao-paulo', (req, res) => {
        return app.render(req, res, '/listings/sell', {city: 'sp'})
      })

      server.get('/vender/rio-de-janeiro', (req, res) => {
        return app.render(req, res, '/listings/sell', {city: 'rj'})
      })

      server.get('/vender/imovel', (req, res) => {
        return app.render(req, res, '/listings/new-listing', req.query)
      })

      server.get('/', (req, res) => {
        return app.render(req, res, '/listings/buy', req.query)
      })

      server.get('/sao-paulo', (req, res) => {
        return app.render(req, res, '/listings/buy', {city: 'sp'})
      })

      server.get('/rio-de-janeiro', (req, res) => {
        return app.render(req, res, '/listings/buy', {city: 'rj'})
      })


      server.get('/comprar', (req, res) => {
        return res.redirect(301, '/')
      })

      server.get('/comprar/sao-paulo', (req, res) => {
        return res.redirect(301, '/sao-paulo')
      })

      server.get('/comprar/rio-de-janeiro', (req, res) => {
        return res.redirect(301, '/rio-de-janeiro')
      })

      server.get('/saiba-mais-para-vender', (req, res) => {
        return res.redirect(301, '/vender')
      })

      server.get('/avaliacao-imovel', (req, res) => {
        return app.render(req, res, '/listings/estimate-price', req.query)
      })

      server.get('/meu-perfil', (req, res) => {
        app.render(req, res, '/user/profile', req.query)
      })

      server.get('/meus-imoveis', (req, res) => {
        return app.render(req, res, '/listings/user-listings', req.query)
      })

      server.get('/busca', (req, res) => {
        return app.render(req, res, '/search', req.query)
      })

      server.get('/google1e5ce96173e3bf9d.html', (req, res) => {
        app.serveStatic(
          req,
          res,
          path.join(process.cwd(), 'static', 'google1e5ce96173e3bf9d.html')
        )
      })

      server.get('*', (req, res) => {
        const parsedUrl = parse(req.url, true)
        const rootStaticFiles = ['/robots.txt', '/sitemap.xml']
        if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
          if (parsedUrl.pathname.indexOf('sitemap') > -1) {
            buildSitemap()
              .then((response) => {
                const pathToSitemap = path.join(
                  process.cwd(),
                  'static',
                  'sitemap.xml'
                )
                app.serveStatic(req, res, pathToSitemap)
              })
              .catch((e) => {
                console.log(
                  `The following error has ocurred while trying to build sitemap: ${
                    e.message
                  }`
                )
                app.render(req, res, '/', req.query)
              })
          } else if (parsedUrl.pathname.indexOf('robots') > -1) {
            const pathToRobots = path.join(
              process.cwd(),
              'static',
              process.env.IS_STAGING === 'true' ? 'robots-staging.txt' : 'robots.txt'
            )
            app.serveStatic(req, res, pathToRobots)
          } else {
            const path = join(__dirname, 'static', parsedUrl.pathname)
            app.serveStatic(req, res, path)
          }
        } else {
          return handle(req, res)
        }
      })

      server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
        return server
      })
    })
    .catch((ex) => {
      console.error(ex.stack)
      process.exit(1)
    })
}

checkPort(port)
  .then(() =>
    console.log(`> Server already running on http://localhost:${port}`)
  )
  .catch(() => startServer())

module.exports = startServer
