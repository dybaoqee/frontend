import {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Mutation} from 'react-apollo'
import {SIGN_IN_ACCOUNT_KIT} from 'graphql/user/mutations'
import UserInfo from 'components/shared/Auth/AccountKit/UserInfo'
import redirect from 'lib/redirect'
import {getCookie} from 'lib/session'
import {signUpUser} from 'lib/auth'

class AccountKit extends Component {
  state = {
    canSignIn: false,
    signingIn: false,
    loading: false
  }
  setAccountKit = () => (window.AccountKit_OnInteractive = this.onLoad)

  componentDidMount() {
    const {autoLogin} = this.props
    if (!window.AccountKit) {
      const {language} = this.props
      const tag = document.createElement('script')
      tag.setAttribute('src', `https://sdk.accountkit.com/${language}/sdk.js`)
      tag.setAttribute('id', 'account-kit')
      tag.setAttribute('type', 'text/javascript')
      tag.onload = this.setAccountKit
      document.head.appendChild(tag)
    } else {
      if (autoLogin) {
        this.signIn()
      }
    }
  }

  onLoad = () => {
    const {appId, csrf, version, autoLogin} = this.props
    window.AccountKit.init({
      appId,
      state: csrf,
      version,
      fbAppEventsEnabled: true,
      display: 'modal'
    })
    if (autoLogin) {
      this.signIn()
    }
  }

  signIn = () => {
    const {loginType, countryCode, phoneNumber, emailAddress} = this.props

    const options = {}
    if (countryCode) {
      options.countryCode = countryCode
    }

    if (loginType === 'PHONE' && phoneNumber) {
      options.phoneNumber = phoneNumber
    } else if (loginType === 'EMAIL' && emailAddress) {
      options.emailAddress = emailAddress
    }

    window.AccountKit.login(loginType, options, (resp) => this.onSuccess(resp))
  }

  onSuccess = async (resp) => {
    const {code} = resp
    const {onSuccess, appId, appSecret} = this.props

    if (code) {
      const data = await fetch(
        `https://graph.accountkit.com/v1.0/access_token?grant_type=authorization_code&code=${code}&
        access_token=AA%7C${appId}%7C${appSecret}`
      )

      const signInInfo = await data.json()

      const userInfo = await this.serverSignIn({
        variables: {
          accessToken: signInInfo.access_token
        }
      })

      onSuccess && onSuccess(userInfo.data)
    }
  }

  render() {
    const {signIn} = this
    const {children} = this.props

    return (
      <Mutation mutation={SIGN_IN_ACCOUNT_KIT}>
        {(serverSignIn, {data, loading}) => {
          this.serverSignIn = serverSignIn
          return children({
            signIn,
            signingIn: loading,
            userInfo: data ? data.accountKitSignIn : null
          })
        }}
      </Mutation>
    )
  }
}

AccountKit.propTypes = {
  csrf: PropTypes.string.isRequired,
  appId: PropTypes.string.isRequired,
  appSecret: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  loginType: PropTypes.oneOf(['PHONE', 'EMAIL']),
  language: PropTypes.string,
  countryCode: PropTypes.string,
  phoneNumber: PropTypes.string,
  emailAddress: PropTypes.string
}

AccountKit.defaultProps = {
  language: 'pt_BR',
  loginType: 'PHONE',
  countryCode: '+55',
  phoneNumber: '',
  csrf: 'RANDOMCSRF'
}

export default AccountKit
