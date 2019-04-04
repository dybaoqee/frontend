import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Text from '@emcasa/ui-dom/components/Text'
import uniq from 'lodash/uniq'
import { Container } from './styles'

class Item extends PureComponent {
  render() {
    return (
      <Container>
        <Text inline color="grey">{this.props.title}</Text><br/>
        <Text inline>{this.props.value}{this.props.suffix}</Text>
      </Container>
    )
  }
}

Item.Range = ({values, ...props}) => {
  const min = Math.min(...values)
  const max = Math.min(...values)
  if (min == max) return <Item value={min} {...props} />
  return <Item value={`${min} a ${max}`} {...props} />
}

Item.List = ({values: [...values], ...props}) => {
  const last = values.pop()
  let text = values.length ? `${uniq(values).sort().join(', ')} e ${last}` : last
  return <Item value={text} {...props} />
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default Item
