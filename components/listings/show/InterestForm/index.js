import {Component} from 'react'
import PropTypes from 'prop-types'
import Text from '@emcasa/ui-dom/components/Text'
import Row from '@emcasa/ui-dom/components/Row'
import Input from '@emcasa/ui-dom/components/Input'
import Button from '@emcasa/ui-dom/components/Button'
import Modal from 'components/shared/Modal'
import {isMobile} from 'lib/mobile'
import {
  log,
  LISTING_DETAIL_VISIT_FORM_NAME_INPUT,
  LISTING_DETAIL_VISIT_FORM_PHONE_INPUT
} from 'lib/logging'

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
    const mobile = isMobile()

    return (
      <Modal onClose={onClose} justifyContent="center" padding unstyledCloseButton>
        <Text as="h1" fontSize="large" textAlign="center">Contato</Text>
        <Row my={2} justifyContent="center"><Text inline textAlign="center">Por favor, informe seu nome e telefone.</Text></Row>
        <Input
          height={mobile ? "medium" : "tall"}
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
          height={mobile ? "medium" : "tall"}
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
