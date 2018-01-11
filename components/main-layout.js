import Head from 'next/head'
import ReactGA from 'react-ga'
import Router from 'next/router'

import Header from './header'
import { mobileMedia } from '../constants/media'
import * as colors from '../constants/colors'

const googleAnalyticsTrackingId = 'UA-108127087-1'

Router.onRouteChangeComplete = () => {
  ReactGA.initialize(googleAnalyticsTrackingId)
  ReactGA.pageview(window.location.pathname)
}

export default class Layout extends React.Component {
  render() {
    const { authenticated } = this.props

    return (
      <div>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800" rel="stylesheet" />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsTrackingId}`} />

          <script dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || []
            function gtag(){
              dataLayer.push(arguments)
            }
            gtag('js', new Date())
            gtag('config', '${googleAnalyticsTrackingId}')

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
          `}} />

          <noscript dangerouslySetInnerHTML={{ __html: `
            <!-- Facebook Pixel Code -->
            <img height="1" width="1"
            src="https://www.facebook.com/tr?id=710980862398359&ev=PageView
            &noscript=1"/>
            <!-- End Facebook Pixel Code -->
          `}} />

          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          <link rel="shortcut icon" href={`/static/${process.env.REACT_APP_FAVICON}`} key="favicon" />
        </Head>

        <Header authenticated={authenticated} />
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
            font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
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
            &.gray {
              background: ${colors.lightGray};
              &:hover {
                background: ${colors.lightGray};
              }
            }
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
