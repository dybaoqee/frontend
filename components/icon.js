import { Component } from 'react'
import PropTypes from 'prop-types'

const icons = {
  trash: 'M192 1024h640l64-704h-768zM640 128v-128h-256v128h-320v192l64-64h768l64 64v-192h-320zM576 128h-128v-64h128v64z',
}

class Icon extends Component {
  render() {
    const { icon } = this.props
    return (
      <svg width="22" height="22" viewBox="0 0 1024 1024">
        <path d={icons[icon]}></path>
      </svg>
    )
  }
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
}

export default Icon
