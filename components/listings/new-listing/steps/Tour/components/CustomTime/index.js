import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import RadioButton from '@emcasa/ui-dom/components/RadioButton'
import Col from '@emcasa/ui-dom/components/Col'
import Row from '@emcasa/ui-dom/components/Row'
import View from '@emcasa/ui-dom/components/View'
import Icon from '@emcasa/ui-dom/components/Icon'
import Text from '@emcasa/ui-dom/components/Text'

import {
  Title,
  StyledBullet,
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
      <Col width={1}>
        <Row>
          <Col width={1}>
            <Title>
              <View mr={3}>
                {selected ?
                  <Icon name="dot-circle" color="pink" />
                :
                  <StyledBullet />}
              </View>
              <Text inline>Escolher horário específico</Text>
            </Title>
          </Col>
        </Row>
        <Row flexWrap="wrap" justifyContent="space-between">
          {selected && this.props.children}
        </Row>
        </Col>
      </StyledCustomTime>
    )
  }
}

CustomTime.propTypes = {
  selected: PropTypes.bool
}

CustomTime.Item = (props) => <StyledCustomTimeItem> <RadioButton {...props} /></StyledCustomTimeItem>

export default CustomTime
