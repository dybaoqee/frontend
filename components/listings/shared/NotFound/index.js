import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Container from './styles'
import {
  log,
  LISTING_SEARCH_NOT_FOUND
} from 'lib/amplitude'

class NotFound extends PureComponent {
  componentDidMount() {
    log(LISTING_SEARCH_NOT_FOUND)
  }

  render() {
    const {
      resetAllParams,
      filtered,
      messages,
      href = '/listings',
      as = '/imoveis'
    } = this.props

    if (filtered) {
      return (
        <Container onClick={resetAllParams}>
          <div>
            <p>Não encontramos imóveis com base nesses critérios, tente alterar os filtros para outros resultados</p>
          </div>
        </Container>
      )
    }

    return (
      <Link href={href} as={as}>
        <Container>
          <div>
            {messages &&
              messages.map((message) => <p key={message}>{message}</p>)}
          </div>
        </Container>
      </Link>
    )
  }
}

NotFound.propTypes = {
  resetAllParams: PropTypes.func.isRequired,
  filtered: PropTypes.bool.isRequired,
  messages: PropTypes.string.isRequired,
  href: PropTypes.string,
  as: PropTypes.string
}

export default NotFound
