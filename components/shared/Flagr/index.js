import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const LOCAL_URL = 'http://localhost:18000'
const STAGING_URL = 'https://flagr.staging.emcasa.com'
const PRODUCTION_URL = 'https://flagr.staging.emcasa.com'
const FLAGR_EVALUATION_URL = '/api/v1/evaluation/'
const DEFAULT = 'default'

class Flagr extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      fetched: false,
      variant: DEFAULT
    }
  }

  getUrl() {
    if (process.env.NODE_ENV === 'production') {
      return PRODUCTION_URL
    } else if (process.env.IS_STAGING === 'true') {
      return STAGING_URL
    }
    return LOCAL_URL
  }

  componentDidMount() {
    const { flagKey } = this.props
    if (!flagKey) {
      console.error('flagKey is required in Flagr')
      return null
    }

    const entityID = amplitude.getInstance().options.deviceId
    const url = `${this.getUrl()}${FLAGR_EVALUATION_URL}`
    const params = {
      flagKey,
      entityID,
      enableDebug: false
    }
    fetch(url, {
      method: 'post', headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params)}).then((response) => {
        return response.json()
    }).then((result) => {
      this.setState({ fetched: true })
      if (result && result.variantKey) {
        this.setState({ variant: result.variantKey })
      }
    })
    .catch((error) => {
      this.setState({ fetched: true })
    })
  }

  render() {
    const { variant, fetched } = this.state
    const { children } = this.props
    if (!fetched && variant === DEFAULT) {
      return null
    }
    return children.find((child) => child.props.variant === variant)
  }
}

Flagr.propTypes = {
  flagKey: PropTypes.string.isRequired
}

export default Flagr
