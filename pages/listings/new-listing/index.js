import React, { Component } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import * as Sentry from '@sentry/browser'
import { connect } from 'react-redux'
import { PoseGroup } from 'react-pose'
import {
  navigateTo,
  updateLocation,
  start,
  resetStore
} from 'redux/actions'
import { ThemeProvider } from 'styled-components'
import '@emcasa/ui-dom/components/global-styles'
import theme from '@emcasa/ui'
import {
  getScreen,
  getStepEntry,
  getStepDisplay,
  getKeyFromDisplay,
  FINAL_STEPS
} from './navigation'
import ProgressDialog from './components/ProgressDialog'
import {imageUrl} from 'utils/image_url'
import NextHead from 'components/shared/NextHead'


const seoImg = imageUrl('sell.jpg')
const seoTitle = 'Anuncie e Venda seu Imóvel no Rio de Janeiro ou em São Paulo'
const seoDescription =
  'Anuncie e Venda seu Imóvel no Rio de Janeiro ou em São Paulo com Emcasa, a startup imobiliária que tem exclusivo sistema de Tour Virtual 3D para aumentar suas chances de venda.'


class NewListing extends Component {
  constructor(props) {
    super(props)
    this.navigate = this.navigate.bind(this)
    this.onReset = this.onReset.bind(this)
    this.onResume = this.onResume.bind(this)
    this.hasProgress = this.hasProgress.bind(this)
    this.restartForm = this.restartForm.bind(this)
  }

  static async getInitialProps(context) {
    return {
      newHeader: true,
      renderFooter: false
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

      // User is trying to back from final screen. Reset store
      if (this.props.listing && this.props.listing.id && key === 'services') {
        this.restartForm()
        return
      }
      if (!this.hasProgress() && FINAL_STEPS.includes(key)) {
        this.restartForm()
        return
      }

      navigateTo(key ? key : 'intro')
      return false
    })

    // Scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0)
  }

  componentWillReceiveProps(props) {
    // Check for previous progress
    if (this.hasProgress() && this.getKey() === 'success') {
      this.restartForm()
      return
    }
    if (this.hasProgress() && !this.state.checkedProgress) {
      this.setState({
        resuming: true,
        checkedProgress: true
      })
    }

    // Keep navigation state
    const nextStep = props.step
    if (this.props.step !== nextStep) {
      this.navigate(nextStep)
    }

    if (!this.hasProgress()) {
      const { start } = this.props
      start(this.state.startedAt)
    }

    // Get Seller Home data
    const sellerAddressFormatted = localStorage.getItem('sellerAddressFormatted')
    const sellerAddressData = localStorage.getItem('sellerAddressData')
    if (sellerAddressFormatted && sellerAddressData) {
      localStorage.removeItem('sellerAddressFormatted')
      localStorage.removeItem('sellerAddressData')
      this.setState({
        checkedProgress: true
      })
      const { updateLocation, resetStore, navigateTo } = this.props
      resetStore()
      updateLocation({
        address: sellerAddressFormatted,
        addressData: JSON.parse(sellerAddressData)
      })
      navigateTo('addressInput')
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.resuming || this.state.resuming) {
      return true
    }

    const currentStep = this.props.step
    const nextStep = nextProps.step
    if (currentStep !== nextStep) {
      return true
    }

    return false
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      if (errorInfo) {
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key])
        })
      }
      Sentry.captureException(error)
    });
  }

  restartForm() {
    this.props.resetStore()
    Router.replace('/vender/imovel')
    return
  }

  hasProgress() {
    const { startedAt, location: { address } } = this.props
    return startedAt && startedAt !== this.state.startedAt && address !== null
  }

  getKey() {
    try {
      const keyDisplay = window.location.hash.split('#')[1]
      const key = getKeyFromDisplay(keyDisplay)
      return key
    } catch (e) {
      return ''
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
    Router.push('/vender/imovel', `/vender/imovel#${stepDisplay}`, {shallow: true})
    window.scrollTo(0, 0)
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
        <>
          <NextHead
            title={seoTitle}
            description={seoDescription}
            imageSrc={seoImg}
            imageWidth={'1476'}
            imageHeight={'838'}
            url={'https://www.emcasa.com/vender/imovel'}
          />
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
        </>
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
    updateLocation: value => {
      dispatch(updateLocation(value))
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
