import {Component} from 'react'
import HTTPMessage from 'components/shared/Shell/HTTPMessage'

export default class ErrorPage extends Component {
  static getInitialProps({err, res}) {
    if (err && err.response) {
      res.statusCode = err.response.status
    }

    return {
      err,
      statusCode: res ? res.statusCode : 404
    }
  }

  render() {
    const {statusCode} = this.props

    return (
      <HTTPMessage statusCode={statusCode} />
    )
  }
}
