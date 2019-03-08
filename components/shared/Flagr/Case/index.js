import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Case extends PureComponent {
  render() {
    return (
      <>
        {this.props.children}
      </>
    )
  }
}

Case.propTypes = {
  children: PropTypes.any.isRequired
}

export default Case
