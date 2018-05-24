const path = require('path')
const glob = require('glob')
const fs = require('fs')
const format = require('xml-formatter')
const axios = require('axios')
const env = require('../../env-config')
const buildSlug = require('../listings').buildSlug

const SITE_ROOT = 'https://www.emcasa.com'
const SOURCE =
  process.env.SOURCE ||
  path.join(
    process.cwd(),
    'pages',
    '/**/!(_document|_error|confirm|search|user|edit|styles|images|show|password_reset)*.js'
  )
const DESTINATION =
  process.env.DESTINATION || path.join(process.cwd(), 'static', 'sitemap.xml')

function buildSitemap() {
  return new Promise(async (resolve, reject) => {
    if (env['process.env.TEST'] === 'cypress') {
      resolve('Sitemap building skipped in cypress')
      return
    }
    console.log('Building sitemap...')
    try {
      const listings = await axios.get(
        env['process.env.REACT_APP_API_URL'] + '/sitemap_listings'
      )

      let diskPages = glob.sync(SOURCE)
      const content = fs.readFileSync(path.join(process.cwd(), 'server.js'), {
        encoding: 'utf8'
      })

      const regex = /'\/(.*?)'/g

      const routes = content.match(regex)

      let xml = ''
      xml += '<?xml version="1.0" encoding="UTF-8"?>'
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
         http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`

      diskPages.forEach((page) => {
        let stats = fs.statSync(page)
        let modDate = new Date(stats.mtime)
        let lastMod = `${modDate.getFullYear()}-${(
          '0' +
          (modDate.getMonth() + 1)
        ).slice(-2)}-${('0' + modDate.getDate()).slice(-2)}`

        page = page.replace(path.join(process.cwd(), 'pages'), '')
        page = page.replace(/.js$/, '')
        page = page.replace('/index', '')

        let matched = undefined
        routes.forEach((route, index) => {
          if (route.indexOf(page) > 0) {
            matched = routes[index - 1]
          }
        })
        if (matched) {
          page = `${SITE_ROOT}${matched.replace(/'/g, '') || page}`

          if (page.match(/.*\/index$/)) {
            page = page.replace(/(.*)index$/, '$1')
          }

          xml += '<url>'
          xml += `<loc>${page}</loc>`
          xml += `<lastmod>${lastMod}</lastmod>`
          xml += '<changefreq>always</changefreq>'
          xml += '<priority>1.0</priority>'
          xml += '</url>'
        }
      })

      listings.data.listings.forEach((listing) => {
        let modDate = new Date(listing.updated_at)
        let lastMod = `${modDate.getFullYear()}-${(
          '0' +
          (modDate.getMonth() + 1)
        ).slice(-2)}-${('0' + modDate.getDate()).slice(-2)}`

        const listingUrl = `${SITE_ROOT}${buildSlug(listing)}`

        xml += '<url>'
        xml += `<loc>${listingUrl}</loc>`
        xml += `<lastmod>${lastMod}</lastmod>`
        xml += '<changefreq>always</changefreq>'
        xml += '<priority>1.0</priority>'
        xml += '</url>'
      })
      xml += '</urlset>'

      fs.writeFileSync(
        DESTINATION,
        format(xml, {indentation: '  ', stripComments: true})
      )

      resolve(
        `Wrote sitemap for ${diskPages.length +
          listings.data.listings.length} pages to ${DESTINATION}`
      )
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = buildSitemap
