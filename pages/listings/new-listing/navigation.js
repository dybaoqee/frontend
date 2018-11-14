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
    canNavigateTo: [],
    display: 'bem-vindo'
  },
  addressInput: {
    component: AddressInput,
    canNavigateTo: ['homeDetails', 'intro', 'notifyCoverage'],
    display: 'endereco'
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
    canNavigateTo: ['homeDetails', 'garage'],
    display: 'quartos'
  },
  garage: {
    component: Garage,
    canNavigateTo: ['bedrooms', 'differential'],
    display: 'vagas'
  },
  differential: {
    component: Differential,
    canNavigateTo: ['garage', 'phone', 'personal', 'pricing'],
    display: 'diferencial'
  },
  phone: {
    component: Phone,
    canNavigateTo: ['differential', 'personal', 'pricing'],
    display: 'telefone'
  },
  personal: {
    component: Personal,
    canNavigateTo: ['differential', 'pricing'],
    display: 'pessoal'
  },
  pricing: {
    component: Pricing,
    canNavigateTo: ['services', 'differential'],
    display: 'preco'
  },
  services: {
    component: Services,
    canNavigateTo: ['pricing', 'scheduling', 'summary', 'tour'],
    display: 'servicos'
  },
  tour: {
    component: Tour,
    canNavigateTo: ['services', 'summary'],
    display: 'tour'
  },
  summary: {
    component: Summary,
    canNavigateTo: ['tour', 'services', 'success'],
    display: 'resumo'
  },
  success: {
    component: Success,
    canNavigateTo: ['summary'],
    display: 'sucesso'
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

const getStepDisplay = (key) => {
  const step = steps[key]
  if (!step) {
    throw `No step found with key ${key}`
  }
  return step.display
}

const getKeyFromDisplay = (display) => {
  return Object.entries(steps).find((step) => {
    if(step[1].display === display) {
      return step[0]
    }
  })[0]
}

export {
  getStepEntry,
  getScreen,
  getStepDisplay,
  getKeyFromDisplay
}
