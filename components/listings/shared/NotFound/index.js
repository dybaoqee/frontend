import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  log,
  LISTING_SEARCH_NOT_FOUND
} from 'lib/logging'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'

class NotFound extends PureComponent {
  componentDidMount() {
    log(LISTING_SEARCH_NOT_FOUND)
  }

  render() {
    return (
      <Col px={4}>
        <Text fontWeight="bold">Nenhum imóvel encontrado</Text>
        <Text color="grey" my={0}>Tente alterar os critérios selecionados para encontrar outros imóveis.</Text>
      </Col>
    )
  }
}

NotFound.propTypes = {
  filters: PropTypes.object,
  params: PropTypes.object
}

export default NotFound
