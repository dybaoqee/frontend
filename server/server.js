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

const startServer = () => {
  app
    .prepare()
    .then(() => {
      const server = express()
      server.use(compression())
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

      server.get('/jobs', (req, res) => {
        return app.render(req, res, '/jobs', req.query)
      })

      server.get('/indique', (req, res) => {
        return app.render(req, res, '/indique', req.query)
      })

      server.get('/logout', (req, res) => {
        return app.render(req, res, '/auth/logout', req.query)
      })

      server.get('/login', (req, res) => {
        return app.render(req, res, '/auth/login', req.query)
      })

      server.get('/signup', (req, res) => {
        return app.render(req, res, '/auth/signup', req.query)
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

      server.get('/saiba-mais-para-vender', (req, res) => {
        return app.render(req, res, '/listings/sell/know-more', req.query)
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

      server.get('/mensagens', (req, res) => {
        return app.render(req, res, '/user/messages', req.query)
      })

      server.get('*', (req, res) => {
        const parsedUrl = parse(req.url, true)
        const rootStaticFiles = ['/robots.txt', '/sitemap.xml']
        if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
          if (parsedUrl.pathname.indexOf('sitemap') > -1) {
            buildSitemap()
              .then((response) => {
                console.log(response)

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
