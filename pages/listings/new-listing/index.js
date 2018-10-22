import React, { Component, PureComponent } from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { PoseGroup } from 'react-pose'
import { navigateTo } from 'redux/actions'
import { ThemeProvider } from 'styled-components'
import injectGlobal from '@emcasa/ui-dom/components/global-styles'
import theme from '@emcasa/ui'

import { getScreen, getStepEntry } from './navigation'

class NewListing extends PureComponent {
  constructor(props) {
    super(props)
    this.navigate = this.navigate.bind(this)
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
      const { navigateTo } = this.props
      const key = as.split('#')[1]
      navigateTo(key ? key : 'intro')
      return false
    });
  }

  componentWillReceiveProps(props) {
    const nextStep = props.step
    if (this.props.step !== nextStep) {
      this.navigate(nextStep)
    }
  }

  navigate(nextStep) {
    const currentStep = this.props.step
    const stepEntry = getStepEntry(currentStep)
    const nextKey = stepEntry.canNavigateTo.find((item) => item === nextStep)
    if (!nextKey && currentStep !== 'intro') {
      throw Error('Navigation key ' + nextStep + ' not found in ' + currentStep)
    }
    Router.push('/anuncie', `/anuncie#${nextStep}`, { shallow: true })
  }

  render() {
    const step = this.props.step || 'intro'
    return (
      <ThemeProvider theme={theme}>
        <PoseGroup>
          {getScreen(step)}
        </PoseGroup>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    navigateTo: step => {
      dispatch(navigateTo(step))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewListing)
