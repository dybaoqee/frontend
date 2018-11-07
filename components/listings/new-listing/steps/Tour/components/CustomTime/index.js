import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import RadioButton from '@emcasa/ui-dom/components/RadioButton'
import Row from '@emcasa/ui-dom/components/Row'
import View from '@emcasa/ui-dom/components/View'
import Icon from '@emcasa/ui-dom/components/Icon'
import Text from '@emcasa/ui-dom/components/Text'
import {
  Title,
  StyledCustomTime,
  StyledCustomTimeItem
} from './styles'

class CustomTime extends PureComponent {
  render() {
    const { selected, onClick } = this.props
    return (
      <StyledCustomTime
        onClick={onClick}
        selected={selected}
      >
        <Title>
          <View mr={3}><Icon name="check-circle" color={selected ? 'pink' : 'grey'} /></View>
          <Text inline>Escolher horário específico</Text>
        </Title>
        {selected && <Row flexWrap="wrap" justifyContent="space-between">
          {this.props.children}
        </Row>}
      </StyledCustomTime>
    )
  }
}

CustomTime.propTypes = {
  selected: PropTypes.bool
}

CustomTime.Item = (props) => <StyledCustomTimeItem> <RadioButton {...props} /></StyledCustomTimeItem>

export default CustomTime
