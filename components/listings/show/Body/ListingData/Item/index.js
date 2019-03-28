import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Text from '@emcasa/ui-dom/components/Text'
import { Container } from './styles'

class Item extends PureComponent {
  render() {
    return (
      <Container flexDirection="column">
        <Text>{this.props.value}</Text>
        <Text fontSize="small">{this.props.title}</Text>
      </Container>
    )
  }
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default Item
