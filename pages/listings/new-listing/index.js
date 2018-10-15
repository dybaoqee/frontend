import React, { Component } from 'react'
import Router from 'next/router'
import { PoseGroup } from 'react-pose'
import { ThemeProvider } from 'styled-components'
import injectGlobal from '@emcasa/ui-dom/components/global-styles'
import theme from '@emcasa/ui'

import { getScreen, getStepEntry } from './navigation'

class NewListing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 'intro'
    }
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
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
      const key = as.split('#')[1]
      this.previousStep(key)
      return false
    });
  }

  nextStep(key) {
    const stepEntry = getStepEntry(this.state.step)
    const nextKey = stepEntry.canPushTo.find((item) => item === key)
    if (!nextKey) {
      throw Error('Navigation key ' + key + ' not found in ' + this.state.step)
    }

    this.setState({ step: nextKey }, () => {
      Router.push('/anuncie', `/anuncie#${nextKey}`, { shallow: true })
    })
  }

  previousStep(key) {
    if (!key) {
      this.resetNavigation()
      return
    }

    this.setState({ step: key }, () => {
      Router.push('/anuncie', `/anuncie#${key}`, { shallow: true })
    })
  }

  resetNavigation() {
    this.setState({ step: 'intro' }, () => {
      Router.push('/anuncie', `/anuncie#intro`, { shallow: true })
    })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <PoseGroup>
          {getScreen(this.state.step, this.nextStep, this.previousStep)}
        </PoseGroup>
      </ThemeProvider>
    )
  }
}

export default NewListing
