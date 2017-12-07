import Head from 'next/head'
import ReactGA from 'react-ga'
import Router from 'next/router'

import Header from './header'
import { mobileMedia } from '../constants/media'

const googleAnalyticsTrackingId = 'UA-108127087-1'

Router.onRouteChangeComplete = () => {
  ReactGA.initialize(googleAnalyticsTrackingId)
  ReactGA.pageview(window.location.pathname)
}

export default class Layout extends React.Component {
  render() {
    const { isAuthenticated } = this.props

    return (
      <div>
        <Head>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsTrackingId}`} />

          <script dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || []
            function gtag(){
              dataLayer.push(arguments)
            }
            gtag('js', new Date())
            gtag('config', '${googleAnalyticsTrackingId}')
          `}} />

          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          {(process.env.NODE_ENV == 'production') ?
            <link rel="shortcut icon" href="/static/favicon.png" key="favicon" /> :
            <link rel="shortcut icon" href="/static/favicon-dev.png" key="favicon" />
          }
        </Head>

        <Header isAuthenticated={isAuthenticated} />
        <main>
          {this.props.children}
        </main>

        <style jsx global>{`
          html {
            font-size: 100%;
          }

          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            font-size: 1rem;
            line-height: 1.5;
          }

          main > div {
            padding-top: 60px;
          }

          button,
          .btn {
            background-color: #2c6e8e;
            border: none;
            border-radius: 4px;
            color: white;
            cursor: pointer;
            font-size: 13px;
            outline: none;
            padding: 3px 15px 5px;
            text-decoration: none;
            transition: background-color 0.10s ease;
            transform: 0.25;
          }

          button:hover,
          .btn:hover {
            background-color: #265f7b;
            text-decoration: none;
          }

          button.green {
            background: #24a11e;
          }

          button.green:hover {
            background: #1f8c1a;
          }

          button:disabled {
            opacity: 0.5;
          }

          @media ${mobileMedia} {
            h1 {
              font-size: 22px;
            }
          }
        `}</style>
      </div>
    )
  }
}
