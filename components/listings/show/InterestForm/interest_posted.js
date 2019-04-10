import {Component} from 'react'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import Modal from 'components/shared/Modal'

export default class InterestPosted extends Component {
  render() {
    const {onClose} = this.props
    return (
      <Modal onClose={onClose} justifyContent="center" padding>
        <Text as="h1" textAlign="center" fontSize="large">Notificação Enviada</Text>
        <Text textAlign="center">
          Entraremos em contato o mais rápido possível para agendarmos sua visita!
        </Text>
        <Button active onClick={onClose}>Fechar</Button>
      </Modal>
    )
  }
}
