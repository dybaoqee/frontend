import Document, {Head, Main, NextScript} from 'next/document'
import {ServerStyleSheet} from 'styled-components'
import flush from 'styled-jsx/server'

export default class AppDocument extends Document {
  static getInitialProps ({renderPage}) {
    const sheet = new ServerStyleSheet()
    const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />))
    const styleTags = [sheet.getStyleElement(), flush()]
    return {...page, styleTags}
  }

  render () {
    const {styleTags} = this.props

    return (
      <html>
        <Head>
          {styleTags}
          <link
            rel="stylesheet"
            href="https://s3.sa-east-1.amazonaws.com/emcasa/css/react-select.css"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800"
            rel="stylesheet"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${
              process.env.GOOGLE_ANALYTICS_TRACKING_ID
            }`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || []
            function gtag(){
              dataLayer.push(arguments)
            }
            gtag('js', new Date())
            gtag('config', '${process.env.GOOGLE_ANALYTICS_TRACKING_ID}')

            <!-- Facebook Pixel Code -->
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '710980862398359');
            fbq('track', 'PageView');
            <!-- End Facebook Pixel Code -->
          `}}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
            <!-- Facebook Pixel Code -->
            <img height="1" width="1"
            src="https://www.facebook.com/tr?id=710980862398359&ev=PageView
            &noscript=1"/>
            <!-- End Facebook Pixel Code -->
          `}}
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
          <link
            rel="shortcut icon"
            href={`/static/${process.env.REACT_APP_FAVICON}`}
            key="favicon"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
