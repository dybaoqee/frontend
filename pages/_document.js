import Document, {Head, Main, NextScript} from 'next/document'
import {ServerStyleSheet} from 'styled-components'
import globalStyles from 'styles/global'

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
          <link
            rel="stylesheet"
            href="https://s3.sa-east-1.amazonaws.com/emcasa/css/react-select.css"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
            rel="stylesheet"
          />

          {/* Start code for Google AdWords */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                /* <![CDATA[ */
                var google_conversion_id = 830164609;
                var google_custom_params = window.google_tag_params;
                var google_remarketing_only = true;
                /* ]]> */
              `
            }}
          />

          <script
            type="text/javascript"
            src="//www.googleadservices.com/pagead/conversion.js"
          />

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
            <noscript>
              <iframe
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
