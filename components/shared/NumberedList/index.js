import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Text from '@emcasa/ui-dom/components/Text'
import {
  Container,
  Item,
  Number
} from './styles'

class NumberedList extends PureComponent {
  render() {
    const { content, textColor } = this.props
    return (
      <Container>
        {content.map((item, index) => {
          const last = index === content.length - 1
          return (
            <Item key={index}>
              <Number inline color="white" last={last ? 1 : 0}>{index + 1}</Number>
              <Text inline color={textColor ? textColor : 'dark'}>{item}</Text>
            </Item>
          )
        })}
      </Container>
    )
  }
}

NumberedList.propTypes = {
  content: PropTypes.array.isRequired,
  textColor: PropTypes.string
}

export default NumberedList
