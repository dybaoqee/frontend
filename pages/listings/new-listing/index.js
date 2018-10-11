import React, { Component } from 'react'
import Router from 'next/router'
import { PoseGroup } from 'react-pose'
import { ThemeProvider } from 'styled-components'

import injectGlobal from '@emcasa/ui-dom/components/global-styles'
import theme from '@emcasa/ui'
import Intro from 'components/listings/new-listing/steps/Intro'
import AddressInput from 'components/listings/new-listing/steps/AddressInput'
import { getAnimatedScreen } from './animation'

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
    const AnimatedScreen = getAnimatedScreen(Screen)
    return (
      <AnimatedScreen
        key={step}
        nextStep={this.nextStep}
        previousStep={this.previousStep}
      />
    )
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <PoseGroup>
          {this.getScreen(this.state.step)}
        </PoseGroup>
      </ThemeProvider>
    )
  }
}

export default NewListing
