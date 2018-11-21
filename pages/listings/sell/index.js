import {Component} from 'react'
import SellListing from 'components/listings/sell/SellListing'
import Benefits from 'components/listings/sell/Benefits'
import HowItWorks from 'components/listings/sell/HowItWorks'
import View from '@emcasa/ui-dom/components/View'

export default class Sell extends Component {
  render() {
    return (
      <View>
        <SellListing />
        <Benefits />
        <HowItWorks />
      </View>
    )
  }
}
