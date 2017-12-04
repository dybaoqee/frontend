import React from 'react'

import { setCookie } from '../utils/cookies'
import Layout from '../components/main-layout'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { email, password } = this.state

    return fetch(process.env.REACT_APP_API_URL + 'users/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password
        }
      })
    }).then(response => response.json())
    .then(response => {
      setCookie('access-token', response.user.token)
      console.log("Logou:", response)
    })
  }

  render() {
    const { email, password } = this.state

    return (
      <Layout>
        <div>
          <form onSubmit={this.onSubmit}>
            <input type="text" name="email" placeholder="Email" value={email} onChange={this.onChange} />
            <input type="password" name="password" placeholder="Senha" value={password} onChange={this.onChange} />
            <button type="submit">Enviar</button>
          </form>
        </div>
      </Layout>
    )
  }
}

export default Login
