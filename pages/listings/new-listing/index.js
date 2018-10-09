import React, { Component } from 'react'
import { ThemeProvider, injectGlobal } from 'styled-components'
import Intro from './steps/intro'
import theme from '@emcasa/ui'

/**
 * Global styles for EmCasa's redesign. Once we roll it out to the rest of the site,
 * we can move these styles up to a root component.
 */
injectGlobal`
  @font-face {
    font-family: "FaktSoftPro-Normal";
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Normal.eot");
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Normal.woff") format('woff'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Normal.woff2") format('woff2'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Normal.ttf") format('ttf');
  }
  @font-face {
    font-family: "FaktSoftPro-Blond";
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Blond.eot");
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Blond.woff") format('woff'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Blond.woff2") format('woff2'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Blond.ttf") format('ttf');
  }
  @font-face {
    font-family: "FaktSoftPro-Medium";
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Medium.eot");
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Medium.woff") format('woff'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Medium.woff2") format('woff2'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Medium.ttf") format('ttf');
  }

  * {
    font-family: 'FaktSoftPro-Normal';
  }
`

class NewListing extends Component {
  static async getInitialProps(context) {
    return {
      shortLogo: true,
      renderFooter: false,
      hideSeparator: true
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Intro />
      </ThemeProvider>
    )
  }
}

export default NewListing
