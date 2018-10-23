import React, { Component } from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { PoseGroup } from 'react-pose'
import {
  navigateTo,
  resetStore
} from 'redux/actions'
import { ThemeProvider } from 'styled-components'
import injectGlobal from '@emcasa/ui-dom/components/global-styles'
import theme from '@emcasa/ui'

import { getScreen, getStepEntry } from './navigation'
import ProgressDialog from './components/ProgressDialog'

class NewListing extends Component {
  constructor(props) {
    super(props)
    this.navigate = this.navigate.bind(this)
    this.onReset = this.onReset.bind(this)
    this.onResume = this.onResume.bind(this)
  }

  static async getInitialProps(context) {
    return {
      shortLogo: true,
      renderFooter: false,
      hideSeparator: true
    }
  }

  state = {
    checkedProgress: false,
    resuming: false
  }

  componentDidMount() {
    // Browser back button
    Router.beforePopState(({ url, as, options }) => {
      const { navigateTo } = this.props
      const key = as.split('#')[1]
      navigateTo(key ? key : 'intro')
      return false
    });
  }

  componentWillReceiveProps(props) {
    // Resume from where the user left off
    const hasProgress = this.props.location && this.props.location.address !== null
    if (hasProgress && !this.state.checkedProgress) {
      this.setState({
        resuming: true,
        checkedProgress: true
      })
    } else {
      // Keep navigation state
      const nextStep = props.step
      if (this.props.step !== nextStep) {
        this.navigate(nextStep)
      }
    }
  }

  /**
   * Reset redux store to its initial state and navigate back to intro step.
   */
  onReset() {
    this.setState({resuming: false})
    const { resetStore } = this.props
    resetStore()
    this.navigate('intro')
  }

  onResume() {
    this.setState({resuming: false})
  }

  navigate(nextStep) {
    const currentStep = this.props.step
    const stepEntry = getStepEntry(currentStep)
    const nextKey = stepEntry.canNavigateTo.find((item) => item === nextStep)
    if (!nextKey && currentStep !== 'intro' && nextStep !== 'intro') {
      throw Error('Navigation key ' + nextStep + ' not found in ' + currentStep)
    }
    Router.push('/anuncie', `/anuncie#${nextStep}`, { shallow: true })
  }

  render() {
    const step = this.props.step || 'intro'
    return (
      <ThemeProvider theme={theme}>
        {this.state.resuming ?
          <ProgressDialog
            onReset={this.onReset}
            onResume={this.onResume}
          />
        :
          <PoseGroup>
            {getScreen(step)}
          </PoseGroup>
        }
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
    },
    resetStore: () => {
      dispatch(resetStore())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewListing)
