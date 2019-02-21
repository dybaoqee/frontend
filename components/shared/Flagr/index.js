import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export const DEVICE_ID_COOKIE = 'flagrDeviceId'
const FLAGR_EVALUATION_URL = '/api/v1/evaluation/'
const DEFAULT = 'default'

/**
 * Fetches the result of a flag.
 * @param flagKey
 * @param entityID user identifier.
 */
export const fetchFlag = async (flagKey, entityID) => {
  const url = `${process.env.FLAGR_URL}${FLAGR_EVALUATION_URL}`
  const params = {
    flagKey,
    entityID,
    enableDebug: false
  }
  const result = await fetch(url, {
    method: 'post', headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params)}).then((response) => {
      return response.json()
  }).then((result) => {
    if (result && result.variantKey) {
      return result.variantKey
    }
    return DEFAULT
  })
  .catch((error) => {
    return DEFAULT
  })
  return result
}

class Flagr extends PureComponent {
  componentDidMount() {
    const { flagKey, flagrFlags } = this.props
    if (!flagKey) {
      console.error('flagKey is required in Flagr')
      return null
    }
    // Set user property for this test in Amplitude
    let identify = new amplitude.Identify().set(flagKey, flagrFlags[flagKey])
    amplitude.identify(identify)
  }

  render() {
    const { children, flagKey, flagrFlags } = this.props
    return children.find((child) => child.props.variant === flagrFlags[flagKey]) || null
  }
}

Flagr.propTypes = {
  flagKey: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Flagr
