import React, {Component} from 'react'
import _ from 'lodash'
const AuthContext = React.createContext()

export const AuthConsumer = AuthContext.Consumer
export const Provider = AuthContext.Provider

export class AuthProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  setUser = (user) => {
    this.setState({user})
    localStorage.setItem(
      'user',
      JSON.stringify(_.pick(user, ['token', 'role', 'name', 'id']))
    )
  }

  componentDidMount() {
    const user = localStorage.getItem('user')
    if (user) {
      const parsedUser = JSON.parse(user)
      this.setState({user: _.pick(parsedUser, ['token', 'role', 'name', 'id'])})
    }
  }

  render() {
    const {user} = this.state
    return (
      <Provider value={{user, setUser: this.setUser}}>
        {this.props.children}
      </Provider>
    )
  }
}
