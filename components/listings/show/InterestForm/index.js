import {Component} from 'react'
import PropTypes from 'prop-types'
import Text from '@emcasa/ui-dom/components/Text'
import Input from '@emcasa/ui-dom/components/Input'
import Button from '@emcasa/ui-dom/components/Button'
import Modal from 'components/shared/Common/Buttons/Like/Modal'
import CloseButton from 'components/shared/CloseButton'
import {
  log,
  LISTING_DETAIL_VISIT_FORM_NAME_INPUT,
  LISTING_DETAIL_VISIT_FORM_PHONE_INPUT
} from 'lib/logging'

const Title = Text.withComponent('h1')

export default class InterestForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      error: null,
      nameTouched: false,
      phoneTouched: false
    }
  }

  logInputTouched = (e, stateKey, eventName) => {
    const {value} = e.target
    if (!this.state[stateKey] && value) {
      log(eventName)
    }
    if (value) {
      this.setState({[stateKey]: true})
    }
  }

  render() {
    const {onClose, onSubmit, data, onChange} = this.props
    const {name, phone} = data

    return (
      <Modal onClose={onClose} justifyContent="center" padding>
        <CloseButton unstyled onClick={onClose} />
        <Title fontSize="large" textAlign="center">Contato</Title>
        <Text textAlign="center">
          Por favor, informe seu nome e telefone.
        </Text>
        <Input
          type="text"
          name="name"
          label="Nome"
          value={name}
          onChange={(e) => {
            this.logInputTouched(e, 'nameTouched', LISTING_DETAIL_VISIT_FORM_NAME_INPUT)
            onChange(e)
          }}
          required
        />
        <Input
          type="text"
          name="phone"
          label="Telefone"
          value={phone}
          onChange={(e) => {
            this.logInputTouched(e, 'phoneTouched', LISTING_DETAIL_VISIT_FORM_PHONE_INPUT)
            onChange(e)
          }}
          required
        />
        <Button fluid active height="tall" onClick={onSubmit}>Enviar</Button>
      </Modal>
    )
  }
}

InterestForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object,
  onChange: PropTypes.func.isRequired
}
