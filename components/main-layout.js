import {Component} from 'react'
import Head from 'next/head'
import ReactGA from 'react-ga'
import Router from 'next/router'

import Header from './header'
import Footer from './footer'
import {mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

Router.onRouteChangeComplete = () => {
  ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID)
  ReactGA.pageview(window.location.pathname)
}

export default class Layout extends Component {
  render() {
    const {authenticated, renderFooter} = this.props

    return (
      <div>
        <Header authenticated={authenticated} />
        <main>{this.props.children}</main>
        {renderFooter && <Footer />}
        <style jsx global>{`
          html {
            color: ${colors.text};
            font-size: 100%;
            -webkit-font-smoothing: antialiased;
          }

          body {
            margin: 0;
            padding: 0;
            font-family: 'Open Sans', -apple-system, BlinkMacSystemFont,
              'Segoe UI', Helvetica, Arial, sans-serif;
            font-size: 1rem;
            line-height: 1.5;
          }

          main {
            margin-top: 76px;
          }

          button,
          .btn {
            background-color: ${colors.blue};
            border: 1px solid ${colors.darkenedBlue};
            border-radius: 4px;
            box-shadow: inset 0 2px 2px 0 rgba(255, 255, 255, 0.2),
              0 4px 6px 0 rgba(38, 38, 38, 0.2);
            color: white;
            cursor: pointer;
            font-size: 16px;
            outline: none;
            padding: 10px 20px 12px;
            text-decoration: none;
            transition: background-color 0.1s ease;
            transform: 0.25;
            &:hover {
              background-color: ${colors.darkenedBlue};
              text-decoration: none;
            }
          }

          button.gray {
            background: ${colors.lightGray};
            &:hover {
              background: ${colors.lightGray};
            }
          }

          button.green {
            background: ${colors.green};
            border: 1px solid ${colors.darkenedGreen};
            color: white;
            &:hover {
              background: ${colors.darkenedGreen};
            }
          }

          button.white {
            background: ${colors.offWhite};
            border: 1px solid ${colors.mediumGray};
            color: ${colors.text};
            &:hover {
              background: ${colors.lightestGray};
            }
          }

          button:disabled {
            opacity: 0.5;
          }

          input,
          textarea {
            font-family: 'Open Sans', -apple-system, BlinkMacSystemFont,
              'Segoe UI', Helvetica, Arial, sans-serif;
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
