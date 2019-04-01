import React, { Component } from 'react'
import PropTypes from 'prop-types'
import enhanceWithClickOutside from 'react-click-outside'
import {
  Container
} from './styles'

class FavoriteLogin extends Component {
  handleClickOutside(e) {
    e.preventDefault()
    this.props.onClose()
  }

  render() {
    return (
      <Container>
        <Text></Text>
      </Container>
    )
  }
}

FavoriteLogin.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default enhanceWithClickOutside(FavoriteLogin)
