import {Component, Fragment} from 'react'
import {isEmailValid} from 'lib/validation'
import {Mutation} from 'react-apollo'
import {SEND_CONTACT} from 'graphql/contact/mutations'

import Form, {Field} from 'components/shared/Common/Form/styles'

import Popup from 'components/shared/Popup'
import {BaseButton} from 'components/shared/Common/Buttons/styles'
import EmCasaButton from 'components/shared/Common/Buttons'

import FormContainer from './styles'

export default class InterestForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showForm: false
    }
  }

  handleContact = async (e, sendContact) => {
    e.preventDefault()
    e.persist()

    const name = e.target.elements.name.value
    const email = e.target.elements.email.value
    const phone = e.target.elements.phone.value
    const message = e.target.elements.message.value

    if (name.length === 0) {
      this.setState({errors: {name: 'Digite seu nome'}})
      return
    }
    if (!isEmailValid(email)) {
      this.setState({errors: {email: 'Digite um e-mail válido'}})
      return
    }

    if (phone.length === 0) {
      this.setState({errors: {phone: 'Digite seu telefone'}})
      return
    }

    this.setState({errors: {}})

    sendContact({
      variables: {name, email, phone, message}
    }).then(() => {
      this.setState({showForm: false})
      e.target.reset()
    })
  }

  getForm = () => {
    const {errors} = this.state
    return (
      <Mutation mutation={SEND_CONTACT}>
        {(sendContact, {loading: sendingContact}) => (
          <Form
            onSubmit={(e) => this.handleContact(e, sendContact)}
            errors={errors}
          >
            <Field>
              <label htmlFor="name">Nome</label>
              <input name="name" type="text" />
            </Field>
            <Field>
              <label htmlFor="email">Endereço de e-mail</label>
              <input name="email" type="text" />
            </Field>
            <Field>
              <label htmlFor="phone">Telefone</label>
              <input name="phone" type="tel" />
            </Field>
            <Field>
              <label htmlFor="message">Mensagem</label>
              <textarea name="message" />
            </Field>

            <EmCasaButton disabled={sendingContact}>
              {sendingContact ? 'Enviando...' : 'Enviar'}
            </EmCasaButton>
          </Form>
        )}
      </Mutation>
    )
  }

  changeFormVisibility = () =>
    this.setState(({showForm}) => {
      return {showForm: !showForm}
    })

  render() {
    const {showForm} = this.state

    return (
      <Fragment>
        <BaseButton onClick={this.changeFormVisibility}>
          Falar com um consultor
        </BaseButton>
        {showForm && (
          <Popup handleClose={this.changeFormVisibility}>
            <FormContainer>
              <h3>Falar com um consultor</h3>
              {this.getForm()}
            </FormContainer>
          </Popup>
        )}
      </Fragment>
    )
  }
}
