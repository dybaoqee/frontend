import {Component} from 'react'
import Container from './styles'
import Head from 'next/head'
import AccountKit from 'components/shared/Auth/AccountKit'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPhone from '@fortawesome/fontawesome-pro-light/faMobileAndroidAlt'
import EmCasaButton from 'components/shared/Common/Buttons'

export default class AccountKitPage extends Component {
  static getInitialProps() {
    return {
      appId: process.env.FACEBOOK_APP_ID,
      appSecret: process.env.ACCOUNT_KIT_APP_SECRET
    }
  }
  onSuccess = (userInfo) => console.log(userInfo)

  render() {
    const {appId, appSecret} = this.props
    return (
      <Container>
        <Head>
          <title>Login por telefone | EmCasa</title>
        </Head>
        <AccountKit
          appId={appId}
          appSecret={appSecret}
          version="v1.0"
          onSuccess={this.onSuccess}
        >
          {({signIn}) => (
            <EmCasaButton onClick={signIn}>
              <FontAwesomeIcon icon={faPhone} />
              Fazer login pelo celular
            </EmCasaButton>
          )}
        </AccountKit>
      </Container>
    )
  }
}
