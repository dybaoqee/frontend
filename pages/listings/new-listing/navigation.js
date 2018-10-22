import { connect } from 'react-redux'
import { getAnimatedScreen } from './animation'
import {
  navigateTo,
  updateLocation,
  updateHomeDetails,
  updateRooms,
  updateGarage
} from 'redux/actions'
import Intro from 'components/listings/new-listing/steps/Intro'
import AddressInput from 'components/listings/new-listing/steps/AddressInput'
import HomeDetails from 'components/listings/new-listing/steps/HomeDetails'
import Bedrooms from 'components/listings/new-listing/steps/Bedrooms'
import Garage from 'components/listings/new-listing/steps/Garage'
import Differential from 'components/listings/new-listing/steps/Differential'

// Navigation steps
const steps = {
  intro: {
    component: Intro,
    canNavigateTo: []
  },
  addressInput: {
    component: AddressInput,
    canNavigateTo: ['homeDetails', 'intro']
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
    canNavigateTo: ['garage']
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
const getScreen = (key) => {
  const entry = getStepEntry(key)
  const Screen = entry.component
  const AnimatedScreen = getAnimatedScreen(Screen)
  const ConnectedScreen = connect(mapStateToProps, mapDispatchToProps)(AnimatedScreen)
  return (
    <ConnectedScreen key={key} />
  )
}

export {
  getStepEntry,
  getScreen
}
