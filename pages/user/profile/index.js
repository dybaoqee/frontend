import {Component, Fragment} from 'react'
import withData from '/lib/apollo/withData'
import {Query} from 'react-apollo'
import {GET_USER_INFO} from 'graphql/user/queries'
import {Mutation} from 'react-apollo'
import {EDIT_PROFILE, EDIT_EMAIL, EDIT_PASSWORD} from 'graphql/user/mutations'
import Tabs from 'components/shared/Common/Tabs'
import {isEmailValid} from 'lib/validation'
import {getCurrentUserId, redirectIfNotAuthenticated} from 'lib/auth'
import EmCasaButton from 'components/shared/Common/Buttons'
import Form, {Field} from 'components/shared/Common/Form/styles'

class UserProfile extends Component {
  state = {
    errors: {}
  }

  static async getInitialProps(context) {
    if (redirectIfNotAuthenticated(context)) {
      return {}
    }

    const currentUser = {
      id: getCurrentUserId(context)
    }
    try {
      return {
        currentUser,
        renderFooter: false
      }
    } catch (e) {
      return {
        error: e.message
      }
    }
  }

  handleProfileUpdate = async (e, editProfile, editEmail) => {
    e.preventDefault()
    const {currentUser: {id}} = this.props

    const name = e.target.elements.name.value
    const email = e.target.elements.email.value
    const phone = e.target.elements.phone.value

    if (!isEmailValid(email)) {
      this.setState({errors: {email: 'Digite um e-mail válido'}})
      return
    }

    this.setState({errors: {}})

    editProfile({
      variables: {id, name, phone},
      refetchQueries: [{query: GET_USER_INFO, variables: {id}}]
    })

    editEmail({
      variables: {id, email}
    }).catch(() => {
      this.setState({
        errors: {email: 'Esse e-mail já está em uso'}
      })
    })
  }

  handlePasswordUpdate = async (e, editPassword) => {
    e.preventDefault()
    e.persist()
    const {currentUser: {id}} = this.props

    const currentPassword = e.target.elements.actual_password.value
    const newPassword = e.target.elements.new_password.value
    const confirm_password = e.target.elements.confirm_password.value

    if (currentPassword.length === 0) {
      this.setState({errors: {actual_password: 'Digite sua senha atual'}})
      return
    }

    if (newPassword.length === 0) {
      this.setState({errors: {new_password: 'A nova senha é muito curta'}})
      return
    }

    if (newPassword !== confirm_password) {
      this.setState({errors: {confirm_password: 'As senhas não coincidem'}})
      return
    }

    this.setState({errors: {}})

    editPassword({
      variables: {id, currentPassword, newPassword}
    })
      .then(() => {
        e.target.reset()
      })
      .catch(() => {
        this.setState({
          errors: {actual_password: 'A senha atual está incorreta'}
        })
      })
  }

  getProfileForm = () => {
    const {currentUser: {id}} = this.props
    const {errors} = this.state
    return (
      <Mutation mutation={EDIT_EMAIL}>
        {(editEmail, {loading: updatingEmail}) => (
          <Mutation mutation={EDIT_PROFILE}>
            {(editProfile, {loading: updatingProfile}) => (
              <Query query={GET_USER_INFO} variables={{id}}>
                {({loading, data: {userProfile}}) => {
                  if (loading) return <div />
                  return (
                    <Form
                      onSubmit={(e) =>
                        this.handleProfileUpdate(e, editProfile, editEmail)
                      }
                      errors={errors}
                    >
                      <Field>
                        <label htmlFor="name">Nome completo</label>
                        <input
                          name="name"
                          type="text"
                          defaultValue={userProfile.name}
                        />
                      </Field>
                      <Field>
                        <label htmlFor="email">Endereço de e-mail</label>
                        <input
                          name="email"
                          type="text"
                          defaultValue={userProfile.email}
                        />
                      </Field>
                      <Field>
                        <label htmlFor="phone">Telefone</label>
                        <input
                          name="phone"
                          type="tel"
                          defaultValue={userProfile.phone}
                        />
                      </Field>

                      <EmCasaButton disabled={updatingProfile || updatingEmail}>
                        {updatingProfile || updatingEmail
                          ? 'Atualizando...'
                          : 'Salvar'}
                      </EmCasaButton>
                    </Form>
                  )
                }}
              </Query>
            )}
          </Mutation>
        )}
      </Mutation>
    )
  }

  getPasswordForm = () => {
    const {errors} = this.state
    return (
      <Mutation mutation={EDIT_PASSWORD}>
        {(editPassword, {loading: updatingPassword}) => (
          <Form
            onSubmit={(e) => this.handlePasswordUpdate(e, editPassword)}
            errors={errors}
          >
            <Field>
              <label htmlFor="actual_password">Senha atual</label>
              <input name="actual_password" type="password" />
            </Field>
            <Field>
              <label htmlFor="new_password">Nova senha</label>
              <input name="new_password" type="password" />
            </Field>
            <Field>
              <label htmlFor="confirm_password">Confirmar nova senha</label>
              <input name="confirm_password" type="password" />
            </Field>
            <EmCasaButton disabled={updatingPassword}>
              {updatingPassword ? 'Atualizando...' : 'Salvar'}
            </EmCasaButton>
          </Form>
        )}
      </Mutation>
    )
  }

  render() {
    return (
      <Fragment>
        <Tabs
          tabs={[
            {title: 'Perfil', component: this.getProfileForm},
            {title: 'Senha', component: this.getPasswordForm}
          ]}
        />
      </Fragment>
    )
  }
}

export default withData(UserProfile)
