import {Component, Fragment} from 'react'
import {Query} from 'react-apollo'
import {GET_USER_INFO} from 'graphql/user/queries'
import {Mutation} from 'react-apollo'
import {EDIT_PROFILE, EDIT_EMAIL, EDIT_PASSWORD} from 'graphql/user/mutations'
import Tabs from 'components/shared/Common/Tabs'
import {isEmailValid} from 'lib/validation'
import {getCurrentUserId, redirectIfNotAuthenticated} from 'lib/auth'
import EmCasaButton from 'components/shared/Common/Buttons'
import Form, {Field} from 'components/shared/Common/Form/styles'
import CheckBox from 'components/shared/Common/Form/CheckBox'
import isNull from 'lodash/isNull'
import isUndefined from 'lodash/isUndefined'
import isEqualWith from 'lodash/isEqualWith'
import pickBy from 'lodash/pickBy'
import Head from 'next/head'

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

  checkComparison = (objValue, othValue) => {
    if (objValue === othValue || (isNull(objValue) && othValue === '')) {
      return true
    }
  }

  handleProfileUpdate = async (e, editProfile, editEmail, userProfile) => {
    const {
      name: actualName,
      email: actualEmail,
      phone: actualPhone,
      notificationPreferences: {email: actualEmailPreference}
    } = userProfile
    e.preventDefault()
    const {currentUser: {id}} = this.props

    const name = e.target.elements.name.value
    const email = e.target.elements.email.value
    const phone = e.target.elements.phone.value
    const emailPreference = e.target.elements.emailPreference.checked

    if (!isEmailValid(email)) {
      this.setState({errors: {email: 'Digite um e-mail válido'}})
      return
    }

    this.setState({errors: {}})

    const attributesToBeChanged = {
      name: isEqualWith(actualName, name, this.checkComparison)
        ? undefined
        : name,
      email: isEqualWith(actualEmail, email, this.checkComparison)
        ? undefined
        : email,
      phone: isEqualWith(actualPhone, phone, this.checkComparison)
        ? undefined
        : phone,
      emailPreference: isEqualWith(
        actualEmailPreference,
        emailPreference,
        this.checkComparison
      )
        ? undefined
        : emailPreference
    }

    const attributesChanged = pickBy(
      attributesToBeChanged,
      (val) => !isUndefined(val)
    )

    if (
      attributesChanged.name === undefined ||
      attributesChanged.phone === undefined ||
      attributesChanged.emailPreference === undefined
    ) {
      editProfile({
        variables: {id, ...attributesChanged},
        refetchQueries: [{query: GET_USER_INFO, variables: {id}}]
      })
    }

    if (attributesChanged.email) {
      editEmail({
        variables: {id, email}
      }).catch(() => {
        this.setState({
          errors: {email: 'Esse e-mail já está em uso'}
        })
      })
    }
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
                        this.handleProfileUpdate(
                          e,
                          editProfile,
                          editEmail,
                          userProfile
                        )
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
                      <Field>
                        <label htmlFor="emailPreference">
                          Notificações por e-mail
                        </label>
                        <CheckBox
                          defaultChecked={
                            userProfile.notificationPreferences.email
                          }
                          name="emailPreference"
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
    const seoTitle = 'EmCasa | Meu Perfil'
    return (
      <Fragment>
        <Head>
          <title>{seoTitle}</title>
          <meta name="twitter:title" content={seoTitle} />
        </Head>
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

export default UserProfile
