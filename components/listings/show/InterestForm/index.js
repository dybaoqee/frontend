import { Component } from 'react'
import Text from '@emcasa/ui-dom/components/Text'
import Input from '@emcasa/ui-dom/components/Input'
import Button from '@emcasa/ui-dom/components/Button'
import Modal from 'components/shared/Common/Buttons/Like/Modal'
import CloseButton from 'components/shared/CloseButton'
import {
  Title
} from './styles'

export default class InterestForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      error: null
    }
  }

  render() {
    const {
      handleClose,
      onSubmit,
      data,
      onChange
    } = this.props
    const {
      name,
      phone
    } = data

    return (
      <Modal onClose={handleClose} justifyContent="center" padding>
        <CloseButton onClick={handleClose} />
        <Title fontSize="large" textAlign="center">Contato</Title>
        <Text textAlign="center">
          Por favor, informe seu nome e telefone.
        </Text>
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            name="name"
            label="Nome"
            value={name}
            onChange={onChange}
            required
          />
          <Input
            type="text"
            name="phone"
            label="Telefone"
            value={phone}
            onChange={onChange}
            required
          />
          <Button fluid height="tall" active>Enviar</Button>
        </form>
      </Modal>
    )
  }
}
