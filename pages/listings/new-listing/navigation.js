import { connect } from 'react-redux'
import { getAnimatedScreen } from './animation'
import {
  navigateTo,
  resetStore,
  resetStoreExceptStep,
  updateLocation,
  updateHomeDetails,
  updateRooms,
  updateGarage,
  updateDifferential,
  updatePhone,
  updatePersonal,
  updatePricing,
  updateServices,
  updateTour
} from 'redux/actions'
import Intro from 'components/listings/new-listing/steps/Intro'
import AddressInput from 'components/listings/new-listing/steps/AddressInput'
import HomeDetails from 'components/listings/new-listing/steps/HomeDetails'
import Bedrooms from 'components/listings/new-listing/steps/Bedrooms'
import Garage from 'components/listings/new-listing/steps/Garage'
import Differential from 'components/listings/new-listing/steps/Differential'
import Phone from 'components/listings/new-listing/steps/Phone'
import Personal from 'components/listings/new-listing/steps/Personal'
import Pricing from 'components/listings/new-listing/steps/Pricing'
import Services from 'components/listings/new-listing/steps/Services'
import Summary from 'components/listings/new-listing/steps/Summary'
import NotifyCoverage from 'components/listings/new-listing/steps/NotifyCoverage'
import NotifyCoverageSuccess from 'components/listings/new-listing/steps/NotifyCoverageSuccess'
import Tour from 'components/listings/new-listing/steps/Tour'
import Success from 'components/listings/new-listing/steps/Success'

// Navigation steps
const steps = {
  intro: {
    component: Intro,
    canNavigateTo: []
  },
  addressInput: {
    component: AddressInput,
    canNavigateTo: ['homeDetails', 'intro', 'notifyCoverage']
  },
  notifyCoverage: {
    component: NotifyCoverage,
    canNavigateTo: ['addressInput', 'notifyCoverageSuccess']
  },
  notifyCoverageSuccess: {
    component: NotifyCoverageSuccess,
    canNavigateTo: ['']
  },
  homeDetails: {
    component: HomeDetails,
    canNavigateTo: ['addressInput', 'bedrooms']
  },
  bedrooms: {
    component: Bedrooms,
    canNavigateTo: ['homeDetails', 'garage']
  },
  garage: {
    component: Garage,
    canNavigateTo: ['bedrooms', 'differential']
  },
  differential: {
    component: Differential,
    canNavigateTo: ['garage', 'phone', 'pricing']
  },
  phone: {
    component: Phone,
    canNavigateTo: ['differential', 'personal', 'pricing']
  },
  personal: {
    component: Personal,
    canNavigateTo: ['phone', 'pricing']
  },
  pricing: {
    component: Pricing,
    canNavigateTo: ['personal', 'services', 'differential']
  },
  services: {
    component: Services,
    canNavigateTo: ['pricing', 'scheduling', 'summary', 'tour']
  },
  tour: {
    component: Tour,
    canNavigateTo: ['services', 'summary']
  },
  summary: {
    component: Summary,
    canNavigateTo: ['tour', 'services', 'success']
  },
  success: {
    component: Success,
    canNavigateTo: ['summary']
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
    updateLocation: value => {
      dispatch(updateLocation(value))
    },
    updateHomeDetails: value => {
      dispatch(updateHomeDetails(value))
    },
    updateRooms: value => {
      dispatch(updateRooms(value))
    },
    updateGarage: value => {
      dispatch(updateGarage(value))
    },
    updateDifferential: value => {
      dispatch(updateDifferential(value))
    },
    updatePhone: value => {
      dispatch(updatePhone(value))
    },
    updatePersonal: value => {
      dispatch(updatePersonal(value))
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
    resetStore: () => {
      dispatch(resetStore())
    },
    resetStoreExceptStep: () => {
      dispatch(resetStoreExceptStep())
    }
  }
}

/**
 * Returns the navigation step object with the given key.
 */
const getStepEntry = (key) => {
  return Object.entries(steps).find((step) => {
    return step[0] === key
  })[1]
}

/**
 * Returns the Screen Component with the given key.
 */
const getScreen = (screenProps) => {
  const { step, client, user } = screenProps
  const entry = getStepEntry(step)
  const Screen = entry.component
  const AnimatedScreen = getAnimatedScreen(Screen)
  const ConnectedScreen = connect(mapStateToProps, mapDispatchToProps)(AnimatedScreen)
  return (
    <ConnectedScreen
      key={step}
      client={client}
      user={user}
    />
  )
}

export {
  getStepEntry,
  getScreen
}
