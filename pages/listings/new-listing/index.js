import { Component } from 'react'
import Button from '@emcasa/ui-dom/components/button'
import { ThemeProvider } from 'styled-components'
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
        <Button active>Quero Anunciar</Button>
      </ThemeProvider>
    )
  }
}

export default NewListing
