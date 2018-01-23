import { Component } from 'react'
import Link from 'next/link'
import Layout from '../../components/main-layout'
import Error from '../../components/error'
import { getCookie, removeCookie } from '../../lib/session'
import { signIn, signUp, redirectIfAuthenticated } from '../../lib/auth'

export default class Login extends Component {
  state = {
    error: null
  }

  static getInitialProps(ctx) {
    if (redirectIfAuthenticated(ctx)) {
      return {}
    } else {
      const success = getCookie("success", ctx.req)

      if (success) {
        removeCookie("success")
      }
      return {
        success
      }
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const name = e.target.elements.name.value
    const email = e.target.elements.email.value
    const phone = e.target.elements.phone.value
    const password = e.target.elements.password.value

    const error = await signUp(name, email, password)

    if (error) {
      console.log(error)
      this.setState({
        error
      })
      return false
    }
  }

  render() {
    const { url, success } = this.props
    const { error } = this.state

    return (
      <Layout>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="name" name="name" />
            <input type="email" placeholder="email" name="email" />
            <input type="phone" placeholder="phone" name="phone" />
            <input type="password" placeholder="password" name="password" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </Layout>
    )
  }
}
