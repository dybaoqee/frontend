import React, { Component } from 'react'
import Router from 'next/router'
import { ThemeProvider } from 'styled-components'
import injectGlobal from '@emcasa/ui-dom/components/global-styles'
import Intro from 'components/listings/new-listing/steps/Intro'
import AddressInput from 'components/listings/new-listing/steps/AddressInput'
import theme from '@emcasa/ui'

const steps = [
  Intro,
  AddressInput
]

class NewListing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0
    }
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.getScreen = this.getScreen.bind(this)
  }

  static async getInitialProps(context) {
    return {
      shortLogo: true,
      renderFooter: false,
      hideSeparator: true
    }
  }

  componentDidMount() {
    Router.beforePopState(({ url, as, options }) => {
      this.previousStep()
      return false
    });
  }

  nextStep() {
    const nextStep = this.state.step + 1
    this.setState({ step: nextStep }, () => {
      Router.push('/anuncie', `/anuncie#${nextStep}`, {shallow: true})
    })
  }

  previousStep() {
    const previousStep = this.state.step - 1
    if (previousStep >= 0) {
      this.setState({ step: previousStep }, () => {
        Router.push('/anuncie', `/anuncie#${previousStep}`, {shallow: true})
      })
    }
  }

  getScreen(step) {
    const Screen = steps[step]
    return (
      <Screen
        nextStep={this.nextStep}
        previousStep={this.previousStep}
      />
    )
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        {this.getScreen(this.state.step)}
      </ThemeProvider>
    )
  }
}

export default NewListing
