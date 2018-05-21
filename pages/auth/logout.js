import {Component} from 'react'
import {signOut} from 'lib/auth'
import {withApollo} from 'react-apollo'

class Logout extends Component {
  static async getInitialProps() {
    return {
      renderFooter: false
    }
  }
  componentDidMount() {
    const {client} = this.props

    //Force a reload of all the current queries now that the user is
    //logged in, so we don't accidentally leave any state around.
    client.cache.reset().then(() => {
      signOut()
    })

    return {}
  }

  render() {
    return <div />
  }
}

export default withApollo(Logout)
