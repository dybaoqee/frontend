import {Component, Fragment} from 'react'
import {Query} from 'react-apollo'
import {GET_USER_INFO} from 'graphql/user/queries'
import {Mutation} from 'react-apollo'
import {EDIT_PROFILE, EDIT_EMAIL} from 'graphql/user/mutations'
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

import {ThemeProvider} from 'styled-components'
import theme from '@emcasa/ui'
import Row from '@emcasa/ui-dom/components/Row'
import Tab from '@emcasa/ui-dom/components/Tab'
import Input from '@emcasa/ui-dom/components/Input'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'
import {
  TabWrapper,
  InitialView,
  ProfileAvatar
} from './styles'

class UserProfile extends Component {
  state = {
    editProfile: false,
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
        renderFooter: false,
        newFooter: true,
        newHeader: true
      }
    } catch (e) {
      return {
        error: e.message,
        newFooter: true,
        newHeader: true
      }
    }
  }

  checkComparison = (objValue, othValue) => {
    if (objValue === othValue || (isNull(objValue) && othValue === '')) {
      return true
    }
  }

  changeProfileView = () => this.setState({ editProfile: !this.state.editProfile })

  handleProfileButtonClick = (e) => {
    e.preventDefault()
    this.changeProfileView()
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
        : phone
    }

    const attributesChanged = pickBy(
      attributesToBeChanged,
      (val) => !isUndefined(val)
    )

    if (
      attributesChanged.name === undefined ||
      attributesChanged.phone === undefined
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

  getInitialView = () => {
    const {currentUser: {id}} = this.props

    return (
      <Mutation mutation={EDIT_PROFILE}>
        {(editProfile, {loading: updatingProfile}) => (
          <Query query={GET_USER_INFO} variables={{id}}>
            {({loading, data: {userProfile}}) => {
              if (loading) return <div />
              return (
                <InitialView
                  flexDirection={'column'}
                  alignItems={'center'}
                  width="100%"
                  maxWidth={"100%"}
                >
                  <ProfileAvatar
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    PS
                  </ProfileAvatar>
                  <Text
                    margin={6}
                    textAlign="center"
                    fontSize="large"
                  >
                    {userProfile.name}
                  </Text>
                  <Text
                    margin={6}
                    textAlign="center"
                    color="grey"
                  >
                    {userProfile.email}
                  </Text>
                  <Text
                    margin={6}
                    textAlign="center"
                    color="grey"
                  >
                    {userProfile.phone}
                  </Text>
                  <Button
                    active
                    fluid
                    height="tall"
                    onClick={this.handleProfileButtonClick}
                  >
                    Editar
                  </Button>
                  <Button
                    fluid
                    height="tall"
                  >
                    Sair
                  </Button>
                </InitialView>
              )
            }}
          </Query>
        )}
      </Mutation>
    )
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
                      <Input
                        name="name"
                        type="text"
                        defaultValue={userProfile.name}
                      />
                      <Input
                        name="email"
                        type="text"
                        defaultValue={userProfile.email}
                      />
                      <Input
                        disabled
                        name="phone"
                        type="tel"
                        defaultValue={userProfile.phone}
                      />
                      <Row
                        justifyContent="space-between"
                      >
                        <Button
                          height="tall"
                          onClick={this.handleProfileButtonClick}
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          height="tall"
                          disabled={updatingProfile || updatingEmail}
                        >
                          {updatingProfile || updatingEmail
                            ? 'Atualizando...'
                            : 'Salvar'}
                        </Button>
                      </Row>
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

  getMyRealEstate = () => {
    return (
      <Text fontSize="xlarge">Meus imóveis</Text>
    )
  }

  getMyFavorites = () => {
    return (
      <Text fontSize="xlarge">Meus favoritos</Text>
    )
  }

  render() {
    const seoTitle = 'EmCasa | Meu Perfil'
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <Head>
            <title>{seoTitle}</title>
            <meta name="twitter:title" content={seoTitle} />
          </Head>
          <TabWrapper>
            <Tab.Group>
              <Tab label="Meu Perfil">
                {this.state.editProfile ? this.getProfileForm() : this.getInitialView()}
              </Tab>
              <Tab label="Meus Imóveis">
                {this.getMyRealEstate()}
              </Tab>
              <Tab label="Meus Favoritos">
                {this.getMyFavorites()}
              </Tab>
            </Tab.Group>
          </TabWrapper>
        </Fragment>
      </ThemeProvider>
    )
  }
}

export default UserProfile
