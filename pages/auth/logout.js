import {Component} from 'react'
import {signOut} from 'lib/auth'
import {withApollo, compose} from 'react-apollo'
import withData from '/lib/apollo/withData'

class Logout extends Component {
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

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo
)(Logout)
