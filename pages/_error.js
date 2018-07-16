import {Component, Fragment} from 'react'
import Error from 'components/shared/Shell/Error'
import Link from 'next/link'
import codes from 'constants/statusCodes'

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

  get title() {
    const {statusCode} = this.props

    return codes[statusCode]
  }

  get message() {
    const {statusCode} = this.props

    switch (statusCode) {
      case 404:
        return 'O link que você clicou pode estar quebrado ou a página pode ter sido removida.'
      default:
        return null
    }
  }

  render() {
    const {statusCode} = this.props

    return (
      <Fragment>
        <Error>
          <h1>{this.title}</h1>
          <h2>{statusCode}</h2>
          <p>{this.message}</p>
          <p>
            Visite nossa <Link href="/">página inicial</Link> ou entre em&nbsp;
            <Link href="mailto:contato@emcasa.com">contato</Link> com a gente
          </p>
        </Error>
      </Fragment>
    )
  }
}
