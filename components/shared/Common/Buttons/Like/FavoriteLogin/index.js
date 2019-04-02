import React, { Component } from 'react'
import PropTypes from 'prop-types'
import enhanceWithClickOutside from 'react-click-outside'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faHeart from '@fortawesome/fontawesome-free-solid/faHeart'
import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import Input from '@emcasa/ui-dom/components/Input'
import CloseButton from 'components/shared/CloseButton'
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
        <EnhancedContainer onClose={this.props.onClose} onClick={(e) => {e.preventDefault()}}>
          <CloseButton onClick={this.props.onClose} />
          <Row justifyContent="center">
            <HeartContainer>
              <FontAwesomeIcon icon={faHeart} />
            </HeartContainer>
          </Row>
          <Row m={2} justifyContent="center">
            <Text inline fontWeight="bold" textAlign="center">Salvar imóvel</Text>
          </Row>
          <Text inline textAlign="center">Este imóvel será salvo na sua aba de favoritos. Para isso, só precisamos do seu nome e telefone.</Text>
          <Row justifyContent="center">
            <Col width={3/4} mt="40px">
              <Input
                fluid
                label="Nome"
                height="medium"
              />
            </Col>
          </Row>
          <Row justifyContent="center">
            <Col mt="40px">
              <Button active height="tall" onClick={this.props.onSignIn}>
                Continuar
              </Button>
            </Col>
          </Row>
        </EnhancedContainer>
      </Background>
    )
  }
}

FavoriteLogin.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSignin: PropTypes.func.isRequired,
}

export default FavoriteLogin
