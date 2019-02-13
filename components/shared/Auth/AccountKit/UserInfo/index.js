import {Component} from 'react'
import Form from 'components/shared/Common/Form'
import Errors from 'components/shared/Common/Errors'
import EmCasaButton from 'components/shared/Common/Buttons'
import {getCookie, removeCookie} from 'lib/session'
import {validateName, validateEmail} from 'lib/validation'
import isArray from 'lodash/isArray'
import flattenDeep from 'lodash/flattenDeep'
import {Mutation} from 'react-apollo'
import {EDIT_PROFILE, EDIT_EMAIL} from 'graphql/user/mutations'
import {signUpUser} from 'lib/auth'
import redirect from 'lib/redirect'
import Container from './styles'
import Router from 'next/router'
import {
  log,
  SIGNUP_SUCCESS
} from 'lib/logging'

export default class UserInfo extends Component {
  state = {
    errors: [],
    loading: false,
    data: {}
  }

  handleSubmit = async (editEmail, editProfile, e) => {
    const {userInfo: {accountKitSignIn: userInfo}} = this.props

    const user = {
      jwt: this.props.userInfo.jwt || userInfo.jwt,
      id: parseInt(userInfo.user.id),
      role: userInfo.user.role
    }

    e.preventDefault()
    this.setState({errors: [], loading: true})

    const name = e.target.elements.name.value
    const email = e.target.elements.email.value

    try {
      validateName(name)

      signUpUser(user)

      const profileEdit = await editProfile({
        variables: {
          name,
          id: user.id
        }
      })

      if (email && email.length > 0) {
        validateEmail(email)
        const emailEdit = await editEmail({
          variables: {email, id: user.id}
        })
      }

      log(SIGNUP_SUCCESS, null, {userId: user.id})
      removeCookie('accountkitinit')

      getCookie('redirectTo')
        ? redirect(getCookie('redirectTo') || '/')
        : Router.replace('/')
    } catch (error) {
      if (error.graphQLErrors) {
        this.setState({errors: ['E-mail já está em uso'], loading: false})
        return
      }
      const errors = isArray(error)
        ? error
        : [error.data ? flattenDeep(Object.values(error.data.errors)) : e]
      this.setState({errors, loading: false})
    }
  }

  render() {
    const {errors, loading} = this.state

    return (
      <Container>
        <img
          src="/static/emcasa-imobiliaria-rio-de-janeiro.png"
          alt="Emcasa Imobiliária no Rio de Janeiro"
        />
        <Mutation mutation={EDIT_EMAIL}>
          {(editEmail) => (
            <Mutation mutation={EDIT_PROFILE}>
              {(editProfile) => (
                <Form
                  onSubmit={this.handleSubmit.bind(
                    null,
                    editEmail,
                    editProfile
                  )}
                >
                  <h3>Só mais algumas informações...</h3>
                  <input type="text" placeholder="Nome" name="name" />
                  <input type="text" placeholder="Email" name="email" />
                  <EmCasaButton disabled={loading} full type="submit">
                    {loading ? 'Aguarde...' : 'Enviar'}
                  </EmCasaButton>
                  <Errors errors={errors} />
                </Form>
              )}
            </Mutation>
          )}
        </Mutation>
      </Container>
    )
  }
}
