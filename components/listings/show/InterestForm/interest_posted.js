import { Component } from 'react'
import Popup from 'components/shared/Popup'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import {
  Container,
  Title
} from './styles'

export default class InterestPosted extends Component {
  render() {
    const {handleClose} = this.props
    return (
      <Popup handleClose={handleClose}>
        <Container>
          <Title fontSize="large">Notificação Enviada</Title>
          <Text>
            Entraremos em contato o mais rápido possível para agendarmos uma sua visita!
          </Text>
          <Button active onClick={handleClose}>Fechar</Button>
        </Container>
      </Popup>
    )
  }
}
