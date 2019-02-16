import { Component } from 'react'
import Head from 'next/head'
import Popup from 'components/shared/Popup'
import Text from '@emcasa/ui-dom/components/Text'
import Input from '@emcasa/ui-dom/components/Input'
import Button from '@emcasa/ui-dom/components/Button'
import {
  Container,
  Form,
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
      <Popup handleClose={handleClose}>
        <Container>
          <Title>Marcar Visita</Title>
          <Text>
            Por favor, informe seu nome e telefone.
          </Text>
          <Form onSubmit={onSubmit}>
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
            <Button fluid height="tall" active>Marcar</Button>
          </Form>
        </Container>
      </Popup>
    )
  }
}
