import React from 'react'
import * as Sentry from '@sentry/browser'
import { connect } from 'react-redux'
import { getAnimatedScreen } from './animation'
import {
  navigateTo,
  resetStore,
  resetStoreExceptStep,
  updateLocation,
  updateHomeDetails,
  updateRooms,
  updatePhone,
  updatePricing,
  updateServices,
  updateTour,
  updateListing
} from 'redux/actions'
import Intro from 'components/listings/new-listing/steps/Intro'
import AddressInput from 'components/listings/new-listing/steps/AddressInput'
import AddressInputMobile from 'components/listings/new-listing/steps/AddressInputMobile'
import HomeDetails from 'components/listings/new-listing/steps/HomeDetails'
import Bedrooms from 'components/listings/new-listing/steps/Bedrooms'
import Phone from 'components/listings/new-listing/steps/Phone'
import Pricing from 'components/listings/new-listing/steps/Pricing'
import Services from 'components/listings/new-listing/steps/Services'
import NotifyCoverage from 'components/listings/new-listing/steps/NotifyCoverage'
import NotifyCoverageSuccess from 'components/listings/new-listing/steps/NotifyCoverageSuccess'
import Tour from 'components/listings/new-listing/steps/Tour'
import Success from 'components/listings/new-listing/steps/Success'

// Navigation steps
export const steps = {
  intro: {
    component: Intro,
    canNavigateTo: ['addressInput'],
    display: 'bem-vindo'
  },
  addressInput: {
    component: AddressInput,
    canNavigateTo: ['intro', 'homeDetails', 'notifyCoverage', 'addressInputMobile'],
    display: 'endereco'
  },
  addressInputMobile: {
    component: AddressInputMobile,
    canNavigateTo: ['intro', 'addressInput'],
    display: 'endereco-mobile'
  },
  notifyCoverage: {
    component: NotifyCoverage,
    canNavigateTo: ['addressInput', 'notifyCoverageSuccess'],
    display: 'notificar'
  },
  notifyCoverageSuccess: {
    component: NotifyCoverageSuccess,
    canNavigateTo: [],
    display: 'notificacao-sucesso'
  },
  homeDetails: {
    component: HomeDetails,
    canNavigateTo: ['addressInput', 'bedrooms'],
    display: 'detalhes'
  },
  bedrooms: {
    component: Bedrooms,
    canNavigateTo: ['homeDetails', 'phone', 'pricing'],
    display: 'quartos'
  },
  phone: {
    component: Phone,
    canNavigateTo: ['pricing', 'bedrooms'],
    display: 'telefone'
  },
  pricing: {
    component: Pricing,
    canNavigateTo: ['services', 'bedrooms', 'phone'],
    display: 'preco'
  },
  services: {
    component: Services,
    canNavigateTo: ['pricing', 'success', 'tour'],
    display: 'servicos'
  },
  tour: {
    component: Tour,
    canNavigateTo: ['services', 'success'],
    display: 'tour'
  },
  success: {
    component: Success,
    canNavigateTo: ['services', 'tour'],
    display: 'sucesso'
  }
}

const FINAL_STEPS = [
  'success',
  'notifyCoverageSuccess',
  'notifyCoverage'
]

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    navigateTo: step => {
      dispatch(navigateTo(step))
    },
    updateLocation: value => {
      dispatch(updateLocation(value))
    },
    updateHomeDetails: value => {
      dispatch(updateHomeDetails(value))
    },
    updateRooms: value => {
      dispatch(updateRooms(value))
    },
    updatePhone: value => {
      dispatch(updatePhone(value))
    },
    updatePricing: value => {
      dispatch(updatePricing(value))
    },
    updateServices: value => {
      dispatch(updateServices(value))
    },
    updateTour: value => {
      dispatch(updateTour(value))
    },
    updateListing: value => {
      dispatch(updateListing(value))
    },
    resetStore: () => {
      dispatch(resetStore())
    },
    resetStoreExceptStep: () => {
      dispatch(resetStoreExceptStep())
    }
  }
}

/**
 * Returns the navigation step object with the given key. If a step with that key is not found (because it's been)
 * removed, for example), return the intro step.
 */
const getStepEntry = (key) => {
  const navigationStep = steps[key]
  if (!navigationStep) {
    return steps.intro
  }
  return navigationStep
}

/**
 * Returns the Screen Component with the given key.
 */
const getScreen = (screenProps) => {
  const { step, client, user, title, evaluation } = screenProps
  const entry = getStepEntry(step)
  const Screen = entry.component
  const AnimatedScreen = getAnimatedScreen(
    React.forwardRef((props, ref) => <Screen hostRef={ref} {...props} />)
  )
  const ConnectedScreen = connect(
    mapStateToProps,
    mapDispatchToProps,
  )((props) => <AnimatedScreen {...props} />)
  return (
    <ConnectedScreen
      key={step}
      client={client}
      user={user}
      title={title}
      evaluation={evaluation}
    />
  )
}

const getStepDisplay = (key) => {
  const step = steps[key]
  if (!step) {
    const errorMessage = `No step found with key ${key}. Resetting store.`
    Sentry.captureException(new Error(errorMessage))
    resetStore()
    return steps.intro.display
  }
  return step.display
}

const getKeyFromDisplay = (display) => {
  const key = Object.entries(steps).find((step) => {
    if(step[1].display === display) {
      return step[0]
    }
  })
  if (key) {
    return key[0]
  }
  return 'intro'
}

export {
  getStepEntry,
  getScreen,
  getStepDisplay,
  getKeyFromDisplay,
  FINAL_STEPS
}
