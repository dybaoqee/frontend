import { Component } from 'react'
import Link from 'next/link'
import Layout from '../../components/main-layout'
import Error from '../../components/error'
import { getCookie, removeCookie } from '../../lib/session'
import { signIn, redirectIfAuthenticated } from '../../lib/auth'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  static getInitialProps(ctx) {
    if (redirectIfAuthenticated(ctx)) {
      return {}
    }

    const success = getCookie("success", ctx.req)
    if (success) {
      removeCookie("success")
    }
    return {
      success
    }
  }

  render() {
    const { url, success } = this.props
    const { error } = this.state

    return (
      <Layout>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="email" placeholder="email" name="email" />
            <input type="password" placeholder="password" name="password" />
            <button type="submit">Submit</button>
          </form>

          <p>
            {"Don't have a user? "}
            <Link href="/register">
              <a>Register</a>
            </Link>
          </p>
        </div>
      </Layout>
    )
  }

  handleSubmit = async e => {
    e.preventDefault()

    const email = e.target.elements.email.value
    const password = e.target.elements.password.value

    const error = await signIn(email, password)

    if (error) {
      this.setState({
        error
      })
      return false
    }
  }
}
