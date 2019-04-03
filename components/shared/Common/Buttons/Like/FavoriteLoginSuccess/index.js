import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import enhanceWithClickOutside from 'react-click-outside'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
import theme from '@emcasa/ui'
import { FAVORITES_TAB } from 'pages/user/profile'
import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import CloseButton from 'components/shared/CloseButton'
import {
  Background,
  Container,
  CheckContainer,
  GreenBox
} from './styles'

class ContainerClickOutside extends Container {
  handleClickOutside(e) {
    e.preventDefault()
    this.props.onClose()
  }
}

const EnhancedContainer = enhanceWithClickOutside(ContainerClickOutside)

class FavoriteLoginSuccess extends Component {
  render() {
    return (
      <Background>
        <EnhancedContainer onClose={this.props.onClose} onClick={(e) => {e.preventDefault()}}>
          <GreenBox>
            <CloseButton
              color={theme.colors.white}
              onClick={this.props.onClose}
            />
            <Row justifyContent="center">
              <CheckContainer>
                <FontAwesomeIcon icon={faCheck} />
              </CheckContainer>
            </Row>
            <Row m={2} justifyContent="center">
              <Text fontWeight="bold" textAlign="center" color="white">Seu imóvel foi salvo com sucesso.</Text>
            </Row>
          </GreenBox>
          <Row flexDirection="column" justifyContent="center" p={4}>
            <Col justifyContent="center" mt="40px">
              <Text textAlign="center">A partir de agora, os imóveis salvos vão aparecer na sua aba de Favoritos.</Text>
            </Col>
            <Row alignItems="center" flexDirection="column">
              <Col mt="40px">
                <Link href={{pathname: '/meu-perfil', query: {tab: FAVORITES_TAB}}}><a>
                  <Button>Ver Favoritos</Button>
                </a></Link>
              </Col>
              <Col mt={4}>
                <Button onClick={this.props.onClose}>Ver outros imóveis</Button>
              </Col>
            </Row>
          </Row>
        </EnhancedContainer>
      </Background>
    )
  }
}

FavoriteLoginSuccess.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default FavoriteLoginSuccess
