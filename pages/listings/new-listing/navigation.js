import { getAnimatedScreen } from './animation'

import Intro from 'components/listings/new-listing/steps/Intro'
import AddressInput from 'components/listings/new-listing/steps/AddressInput'

// Navigation steps
const steps = {
  intro: {
    component: Intro,
    canPushTo: ['addressInput'],
  },
  addressInput: {
    component: AddressInput
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
  return (
    <AnimatedScreen
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
