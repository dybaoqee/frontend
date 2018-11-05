import Document, {Head, Main, NextScript} from 'next/document'
import {ServerStyleSheet} from 'styled-components'
import globalStyles from 'styles/global'

const RD_STATION_SCRIPT =
  'https://d335luupugsy2.cloudfront.net/js/loader-scripts/10ac8a83-57de-4007-b3e7-532ac8ee60ac-loader.js'

export default class AppDocument extends Document {
  static getInitialProps({renderPage}) {
    const sheet = new ServerStyleSheet()
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = [sheet.getStyleElement()]
    return {...page, styleTags, prod: process.env.NODE_ENV === 'production'}
  }

  render() {
    const {styleTags, prod} = this.props

    return (
      <html>
        <Head>
          {prod ? (
            <script
              key="gtm-head"
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5ZF5DFW');`
              }}
            />
          ) : (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || []`
              }}
            />
          )}
          {styleTags}
          {globalStyles}
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
          <link
            rel="shortcut icon"
            href={`https://res.cloudinary.com/emcasa/image/upload/v1523561414/${
              process.env.REACT_APP_FAVICON
            }`}
            key="favicon"
          />
        </Head>
        <body>
          {prod && (
            <noscript key="gtm-body">
              <iframe
                key="gtm-body-iframe"
                src="https://www.googletagmanager.com/ns.html?id=GTM-5ZF5DFW"
                height="0"
                width="0"
                style={{display: 'none', visibility: 'hidden'}}
              />
            </noscript>
          )}
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
