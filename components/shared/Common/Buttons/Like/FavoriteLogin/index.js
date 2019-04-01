import React, { Component } from 'react'
import PropTypes from 'prop-types'
import enhanceWithClickOutside from 'react-click-outside'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faHeart from '@fortawesome/fontawesome-free-solid/faHeart'
import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import Input from '@emcasa/ui-dom/components/Input'
import {
  Background,
  Container,
  HeartContainer
} from './styles'

class ContainerClickOutside extends Container {
  handleClickOutside(e) {
    e.preventDefault()
    this.props.onClose()
  }
}

const EnhancedContainer = enhanceWithClickOutside(ContainerClickOutside)

class FavoriteLogin extends Component {
  render() {
    return (
      <Background>
        <EnhancedContainer onClose={this.props.onClose}>
          <Row justifyContent="center">
            <HeartContainer>
              <FontAwesomeIcon icon={faHeart} />
            </HeartContainer>
          </Row>
          <Text>Salvar imóvel</Text>
          <Text>Este imóvel será salvo na sua aba de favoritos. Para isso, só precisamos do seu nome e telefone.</Text>
          <Input
            label="Nome"
          />
        </EnhancedContainer>
      </Background>
    )
  }
}

FavoriteLogin.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default FavoriteLogin
