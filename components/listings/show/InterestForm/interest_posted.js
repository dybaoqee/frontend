import { Component } from 'react'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import Modal from 'components/shared/Modal'

const Title = Text.withComponent('h1')

export default class InterestPosted extends Component {
  render() {
    const {onClose} = this.props
    return (
      <Modal onClose={onClose} justifyContent="center" padding>
        <Title textAlign="center" fontSize="large">Notificação Enviada</Title>
        <Text textAlign="center">
          Entraremos em contato o mais rápido possível para agendarmos sua visita!
        </Text>
        <Button active onClick={onClose}>Fechar</Button>
      </Modal>
    )
  }
}
