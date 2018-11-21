import '@emcasa/ui-dom/components/global-styles'
import {Component} from 'react'
import styled from 'styled-components'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'
import {ThemeProvider} from 'styled-components'
import SellListing from 'components/listings/sell/SellListing'
import Benefits from 'components/listings/sell/Benefits'
import HowItWorks from 'components/listings/sell/HowItWorks'

const Container = styled(View)`
  display: flex;
  flex-direction: column;
`

const Block = styled(View)`
  display: flex;
  flex: 1;
  min-height: 80vh;
  align-items: center;
  justify-content: center;
`

export default class Sell extends Component {
  static async getInitialProps() {
    return {
      shortLogo: true,
      hideSeparator: true,
      transparentHeader: true
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Block>
            <SellListing />
          </Block>
          <Block>
            <Benefits />
          </Block>
          <Block>
            <HowItWorks />
          </Block>
        </Container>
      </ThemeProvider>
    )
  }
}
