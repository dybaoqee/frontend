import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Text from '@emcasa/ui-dom/components/Text'
import { Container } from './styles'

class Item extends PureComponent {
  render() {
    return (
      <Container>
        <Text inline color="grey">{this.props.title}</Text><br/>
        <Text inline>{this.props.value}</Text>
      </Container>
    )
  }
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

export default Item
