import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Text from '@emcasa/ui-dom/components/Text'
import View from '@emcasa/ui-dom/components/View'
import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Input from '@emcasa/ui-dom/components/Input'
import Modal from 'components/shared/Modal'
import {
  PinkBox,
  Logo
} from './styles'

class ContactForm extends Component {
  constructor(props) {
    super(props)
    this.nameField = React.createRef()
    this.phoneField = React.createRef()
  }

  state = {
    nameFieldValid: false,
    phoneFieldValid: false,
    showSuccess: false
  }

  componentDidMount() {
    document.addEventListener('keypress', this.onPressEnter)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.onPressEnter)
  }

  onPressEnter = (e) => {
    if (e.key !== 'Enter') return
    if (this.state.nameFieldValid && this.state.phoneFieldValid) {
      this.submit()
    }
  }

  validateNameField = (event) => {
    const valid = event && event.target && event.target.value && event.target.value.trim()
    this.setState({nameFieldValid: valid})
  }

  validatePhoneField = (event) => {
    const valid = event && event.target && event.target.value && event.target.value.trim()
    this.setState({phoneFieldValid: valid})
  }

  submit = (e) => {
    if (this.nameField && this.nameField.current && this.phoneField && this.phoneField.current) {
      const name = this.nameField.current.value ? this.nameField.current.value.trim() : ''
      const phone = this.phoneField.current.value ? this.phoneField.current.value.trim() : ''
      this.props.onSubmit(e, {name, phone})
    }
  }

  render() {
    const {onClose, onSubmit, data, onChange} = this.props
    return (
      <Modal onClose={onClose}>
        <PinkBox>
          <Logo />
          <View px={4} pt={4}>
            <Text textAlign="center" color="white">Olá, você está mais perto de encontrar sua nova casa.</Text>
          </View>
        </PinkBox>
        <Row justifyContent="space-around">
          <Col width={1/2} mt="40px" ml={4} mr={2}>
            <Input
              fluid
              label="Nome"
              height="medium"
              onChange={this.validateNameField}
              ref={this.nameField}
            />
          </Col>
          <Col width={1/2} mt="40px" ml={2} mr={4}>
            <Input
              fluid
              label="Telefone"
              height="medium"
              onChange={this.validatePhoneField}
              ref={this.phoneField}
            />
          </Col>
        </Row>
        <Row justifyContent="center">
          <Col mt="40px">
            <Button
              active
              height="tall"
              onClick={this.submit}
              disabled={!(this.state.nameFieldValid && this.state.phoneFieldValid)}
            >
              Solicitar atendimento
            </Button>
          </Col>
        </Row>
      </Modal>
    )
  }
}

ContactForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object,
  onChange: PropTypes.func.isRequired
}

export default ContactForm
