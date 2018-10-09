import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import injectGlobal from '@emcasa/ui-dom/components/global-styles'
import Intro from './steps/intro'
import theme from '@emcasa/ui'

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
