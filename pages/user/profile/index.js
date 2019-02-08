import React, {Component, Fragment} from 'react'
import {
  GET_USER_INFO,
  GET_USER_LISTINGS,
  GET_FAVORITE_LISTINGS
} from 'graphql/user/queries'
import {
  EDIT_PROFILE,
  EDIT_EMAIL
} from 'graphql/user/mutations'
import {
  Mutation,
  Query
} from 'react-apollo'
import {isEmailValid} from 'lib/validation'
import {
  getCurrentUserId,
  redirectIfNotAuthenticated
} from 'lib/auth'
import isNull from 'lodash/isNull'
import isUndefined from 'lodash/isUndefined'
import isEqualWith from 'lodash/isEqualWith'
import pickBy from 'lodash/pickBy'
import Head from 'next/head'
import Link from 'next/link'
import Form from 'components/shared/Common/Form/styles'
import ListingCard from 'components/listings/shared/ListingCard'
import {ThemeProvider} from 'styled-components'
import theme from '@emcasa/ui'
import Col from '@emcasa/ui-dom/components/Col'
import Row from '@emcasa/ui-dom/components/Row'
import Tab from '@emcasa/ui-dom/components/Tab'
import Input from '@emcasa/ui-dom/components/Input'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'
import {
  log,
  PROFILE_OPEN,
  PROFILE_MY_LISTINGS,
  PROFILE_FAVORITES,
  PROFILE_LOGOUT,
  PROFILE_EDIT,
  PROFILE_EDIT_CANCEL,
  PROFILE_EDIT_SAVE
} from 'lib/amplitude'
import {
  TabWrapper,
  InitialView,
  ProfileAvatar,
  ProfileList,
  Icon
} from './styles'

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.nameField = React.createRef()
    this.emailField = React.createRef()
  }
  state = {
    editingProfile: false,
    editedProfile: false,
    hasChanged: false,
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

  componentDidMount() {
    log(PROFILE_OPEN)
  }

  checkComparison = (objValue, othValue) => {
    if (objValue === othValue || (isNull(objValue) && othValue === '')) {
      return true
    }
  }

  checkFieldsChange = (userName, userEmail) => {
    let hasBeenChanged = false

    if (this.nameField.current && this.emailField.current) {
      hasBeenChanged = this.nameField.current.value != userName || this.emailField.current.value != userEmail
    }

    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState({hasChanged: hasBeenChanged})
    }, 300)
  }

  changeProfileView = () => {
    this.state.editingProfile ? log(PROFILE_EDIT_CANCEL) : log(PROFILE_EDIT)
    this.setState({ editingProfile: !this.state.editingProfile })
  }

  getUserAcronym = (name) => name.match(/\b(\w)/g).join('').substring(0, 2)

  handleProfileButton = (e) => {
    e.preventDefault()
    this.changeProfileView()
  }

  handleProfileUpdate = async (e, editProfile, editEmail, userProfile) => {
    log(PROFILE_EDIT_SAVE)
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
      <Query query={GET_USER_INFO} variables={{id}}>
        {({loading, error, data: {userProfile}}) => {
          if (loading) return <div />
          if (error) return `Error!: ${error}`
              return (
                <InitialView
                  flexDirection={'column'}
                  alignItems={'center'}
                >
                  <ProfileAvatar
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    {this.getUserAcronym(userProfile.name)}
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
                    onClick={this.handleProfileButton}
                  >
                    Editar
                  </Button>
                  <Link href="/auth/logout">
                    <Button
                      fluid
                      height="tall"
                      onClick={() => {log(PROFILE_LOGOUT)}}
                    >
                      Sair
                    </Button>
                  </Link>
                </InitialView>
              )
        }}
      </Query>
    )
  }

  getProfileForm = () => {
    const {currentUser: {id}} = this.props
    const {errors, editedProfile} = this.state
    return (
      <Mutation mutation={EDIT_EMAIL}>
        {(editEmail, {loading: updatingEmail}) => (
          <Mutation mutation={EDIT_PROFILE}>
            {(editProfile, {loading: updatingProfile}) => (
              <Query query={GET_USER_INFO} variables={{id}}>
                {({loading, data: {userProfile}}) => {
                  if (loading) return <div />
                  this.checkFieldsChange(userProfile.name, userProfile.email)
                  return (
                    <InitialView
                      flexDirection={'column'}
                      alignItems={'center'}
                      maxWidth="100%"
                    >
                      <ProfileAvatar
                        justifyContent={'center'}
                        alignItems={'center'}
                      >
                        {this.getUserAcronym(userProfile.name)}
                      </ProfileAvatar>
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
                          hideLabelView
                          hideErrorView
                          name="name"
                          type="text"
                          ref={this.nameField}
                          defaultValue={userProfile.name}
                          onChange={(e) => {
                            this.checkFieldsChange(userProfile.name, userProfile.email)
                          }}
                        />
                        <Input
                          hideLabelView
                          hideErrorView
                          required
                          name="email"
                          type="email"
                          ref={this.emailField}
                          defaultValue={userProfile.email}
                          onChange={(e) => {
                            this.checkFieldsChange(userProfile.name, userProfile.email)
                          }}
                        />
                        <Input
                          hideLabelView
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
                            type="button"
                            onClick={this.handleProfileButton}
                          >
                            Cancelar
                          </Button>
                          <Button
                            type="submit"
                            height="tall"
                            active={this.state.hasChanged}
                            disabled={!this.state.hasChanged || updatingProfile || updatingEmail}
                          >
                            {updatingProfile || updatingEmail
                              ? 'Atualizando...'
                              : 'Salvar'}
                          </Button>
                        </Row>
                      </Form>
                    </InitialView>
                  )
                }}
              </Query>
            )}
          </Mutation>
        )}
      </Mutation>
    )
  }

  getUserListings = () => {
    const {user} = this.props
    return (
      <Query query={GET_USER_LISTINGS}>
        {({loading, error, data: {userProfile}}) => {
          if (loading) return <div />
          if (error) return `Error!: ${error}`
          if (userProfile.listings.length > 0) {
            return (
              <ProfileList
                width="100%"
                flexWrap="wrap"
                justifyContent="space-between"
              >
                {userProfile.listings.map((listing) => {
                  return (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      currentUser={user}
                      loading={loading}
                      favorited={userProfile.favorites || []}
                    />
                  )
                })}
              </ProfileList>
            )
          } else {
            return (
            <InitialView maxWidth="440px">
              <Col
                width="100%"
                alignItems="center"
              >
                <Text
                  textAlign="center"
                  fontSize="large"
                  fontWeight="bold"
                >Você não tem nenhum imóvel anunciado</Text>
                <Row
                  justifyContent="center"
                  py={5}
                >
                  <Icon icon="/static/svg-icons/house.svg"/>
                </Row>
                <Text
                  textAlign="center"
                  color="gray"
                >Venda seu imóvel de um jeito fácil e seguro.<br /> Quer anunciar aqui na EmCasa?</Text>
                <Link href="/vender/imovel">
                  <Button
                    active
                    fluid
                    height="tall"
                  >Começar</Button>
                </Link>
              </Col>
            </InitialView>
            )
          }
        }}
      </Query>
    )
  }

  getUserFavorites = () => {
    const {user} = this.props
    return (
      <Query query={GET_FAVORITE_LISTINGS}>
        {({loading, error, data: {userProfile}}) => {
          if (loading) return <div />
          if (error) return `Error!: ${error}`

          if (userProfile.favorites.length > 0) {
            return (
              <ProfileList
                width="100%"
                flexWrap="wrap"
                justifyContent="space-between"
              >
                {userProfile.favorites.map((listing) => {
                  return (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      currentUser={user}
                      loading={loading}
                      favorited={userProfile.favorites || []}
                    />
                  )
                })}
              </ProfileList>
            )
          } else {
            return (
              <InitialView maxWidth="440px">
                <Col
                  width="100%"
                  alignItems="center"
                >
                  <Text
                    textAlign="center"
                    fontSize="large"
                    fontWeight="bold"
                  >Você não cadastrou nenhum imóvel</Text>
                  <Row
                    justifyContent="center"
                    py={5}
                  >
                    <Icon icon="/static/svg-icons/happy-face-favorite.svg"/>
                  </Row>
                  <Text
                    textAlign="center"
                    color="gray"
                  >Navegue pelos nosso imóveis e dê um coração para os que você mais gostar. Esses imóveis ficarão salvos aqui nessa lista para você ver e rever quando quiser.</Text>
                  <Link href="/imoveis">
                    <Button
                      active
                      fluid
                      height="tall"
                    >Explorar</Button>
                  </Link>
                </Col>
              </InitialView>
            )
          }
        }}
      </Query>
    )
  }

  render() {
    const seoTitle = 'EmCasa | Meu Perfil'
    const {currentUser: {id}} = this.props
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
                {this.state.editingProfile ? this.getProfileForm() : this.getInitialView()}
              </Tab>
              <Tab label="Meus Imóveis">
                {this.getUserListings()}
              </Tab>
              <Tab label="Favoritos">
                {this.getUserFavorites()}
              </Tab>
            </Tab.Group>
          </TabWrapper>
        </Fragment>
      </ThemeProvider>
    )
  }
}

export default UserProfile
