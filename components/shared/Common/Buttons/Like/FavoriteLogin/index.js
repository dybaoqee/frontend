import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faHeart from '@fortawesome/fontawesome-free-solid/faHeart'
import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import Input from '@emcasa/ui-dom/components/Input'
import Modal from 'components/shared/Modal'
import {TEST_SAVE_LISTING_USER_NAME} from 'components/shared/Flagr/tests'
import Case from 'components/shared/Flagr/Case'
import Flagr from 'components/shared/Flagr'
import { HeartContainer } from './styles'

class FavoriteLogin extends Component {
  constructor(props) {
    super(props)
    this.nameField = React.createRef()
  }

  state = {
    nameFieldValid: false
  }

  componentDidMount() {
    document.addEventListener('keypress', this.onPressEnter)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.onPressEnter)
  }

  onPressEnter = (e) => {
    if (e.key !== 'Enter') return
    if (this.state.nameFieldValid) {
      this.submit()
    }
  }

  validateNameField = (event) => {
    const valid = event && event.target && event.target.value && event.target.value.trim()
    this.setState({ nameFieldValid: valid })
  }

  submit = () => {
    const name = (this.nameField && this.nameField.current) ? this.nameField.current.value : ''
    this.props.onSignIn(name)
  }

  render() {
    return (
      <Modal onClose={this.props.onClose} justifyContent="center" padding unstyledCloseButton>
        <Row justifyContent="center">
          <HeartContainer>
            <FontAwesomeIcon icon={faHeart} />
          </HeartContainer>
        </Row>
        <Row m={2} justifyContent="center">
          <Text inline fontWeight="bold" textAlign="center">Salvar imóvel</Text>
        </Row>
        <Flagr flagKey={TEST_SAVE_LISTING_USER_NAME}>
          <Case variant="default">
            <Text inline textAlign="center">Este imóvel será salvo na sua aba de favoritos. Para isso, só precisamos do seu nome e telefone.</Text>
            <Row justifyContent="center">
              <Col width={3/4} mt="40px">
                <Input
                  fluid
                  label="Nome"
                  height="medium"
                  onChange={this.validateNameField}
                  ref={this.nameField}
                />
              </Col>
            </Row>
            <Row justifyContent="center">
              <Col mt="40px">
                <Button
                  active
                  height="tall"
                  onClick={this.submit}
                  disabled={!this.state.nameFieldValid}
                >
                  Continuar
                </Button>
              </Col>
            </Row>
          </Case>
          <Case variant="name_not_required">
            <Text inline textAlign="center">Este imóvel será salvo na sua aba de favoritos. Para isso, só precisamos do seu telefone.</Text>
            <Row justifyContent="center">
              <Col mt="40px">
                <Button
                  active
                  height="tall"
                  onClick={this.submit}
                >
                  Continuar
                </Button>
              </Col>
            </Row>
          </Case>
        </Flagr>
      </Modal>
    )
  }
}

FavoriteLogin.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
}

export default FavoriteLogin
