import React, { Component } from 'react'
import PropTypes from 'prop-types'
import enhanceWithClickOutside from 'react-click-outside'
import {
  Background,
  Container
} from './styles'

class ContainerClickOutside extends Container {
  handleClickOutside(e) {
    e.preventDefault()
    this.props.onClose()
  }
}

const EnhancedContainer = enhanceWithClickOutside(ContainerClickOutside)

class Modal extends Component {
  render() {
    console.log('justifyContent:', this.props.justifyContent)
    return (
      <Background>
        <EnhancedContainer
          justifyContent={this.props.justifyContent}
          onClose={this.props.onClose}
          onClick={(e) => {e.preventDefault()}}
        >
          {this.props.children}
        </EnhancedContainer>
      </Background>
    )
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  justifyContent: PropTypes.string
}

export default Modal
