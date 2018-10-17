import { connect } from 'react-redux'
import { getAnimatedScreen } from './animation'
import { navigateTo } from 'redux/actions'
import Intro from 'components/listings/new-listing/steps/Intro'
import AddressInput from 'components/listings/new-listing/steps/AddressInput'
import HomeDetails from 'components/listings/new-listing/steps/HomeDetails'

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
    canNavigateTo: ['addressInput']
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
const getScreen = (key, nextStep, previousStep) => {
  const entry = getStepEntry(key)
  const Screen = entry.component
  const AnimatedScreen = getAnimatedScreen(Screen)
  const ConnectedScreen = connect(mapStateToProps, mapDispatchToProps)(AnimatedScreen)
  return (
    <ConnectedScreen
      key={key}
      nextStep={nextStep}
      previousStep={previousStep}
    />
  )
}

export {
  getStepEntry,
  getScreen
}
