import React, { Component } from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { PoseGroup } from 'react-pose'
import {
  navigateTo,
  start,
  resetStore
} from 'redux/actions'
import { ThemeProvider } from 'styled-components'
import injectGlobal from '@emcasa/ui-dom/components/global-styles'
import theme from '@emcasa/ui'
import {
  getScreen,
  getStepEntry,
  getStepDisplay,
  getKeyFromDisplay
} from './navigation'
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
    startedAt: Date.now(),
    checkedProgress: false,
    resuming: false
  }

  componentDidMount() {
    // Browser back button
    Router.beforePopState(({ url, as, options }) => {
      const { navigateTo } = this.props
      const display = as.split('#')[1]
      const key = getKeyFromDisplay(display)
      navigateTo(key ? key : 'intro')
      return false
    })
  }

  componentWillReceiveProps(props) {
    // Check for previous progress
    const { startedAt, location: { address } } = this.props
    const hasProgress = startedAt && startedAt !== this.state.startedAt && address !== null
    if (hasProgress && !this.state.checkedProgress) {
      this.setState({
        resuming: true,
        checkedProgress: true
      })
    }

    if (!hasProgress && !this.state.checkedProgress) {
      this.setState({
        checkedProgress: true
      })
      const { resetStore, start } = this.props
      resetStore()
      start(this.state.startedAt)
      return
    }

    // Keep navigation state
    const nextStep = props.step
    if (this.props.step !== nextStep) {
      this.navigate(nextStep)
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
    const stepDisplay = getStepDisplay(nextStep)
    Router.push('/anuncie', `/anuncie#${stepDisplay}`, { shallow: true })
  }

  render() {
    const { client, user } = this.props
    const step = this.props.step || 'intro'
    const { address } = this.props.location
    const screenProps = {
      step,
      client,
      user
    }
    return (
      <ThemeProvider theme={theme}>
        {this.state.resuming ?
          <ProgressDialog
            address={address}
            onReset={this.onReset}
            onResume={this.onResume}
          />
        :
          <PoseGroup>
            {getScreen(screenProps)}
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
    },
    start: timestamp => {
      dispatch(start(timestamp))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewListing)
