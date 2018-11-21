import '@emcasa/ui-dom/components/global-styles'
import {Component} from 'react'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'
import {ThemeProvider} from 'styled-components'
import SellListing from 'components/listings/sell/SellListing'
import Benefits from 'components/listings/sell/Benefits'
import HowItWorks from 'components/listings/sell/HowItWorks'

export default class Sell extends Component {
  static async getInitialProps() {
    return {
      shortLogo: true,
      hideSeparator: true
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <View>
          <SellListing />
          <Benefits />
          <HowItWorks />
        </View>
      </ThemeProvider>
    )
  }
}
