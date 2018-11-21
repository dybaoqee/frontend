import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Button from '@emcasa/ui-dom/components/Button'
import Col from '@emcasa/ui-dom/components/Col'
import Row from '@emcasa/ui-dom/components/Row'
import View from '@emcasa/ui-dom/components/View'
import Icon from '@emcasa/ui-dom/components/Icon'
import Text from '@emcasa/ui-dom/components/Text'

import {
  getTimeDisplay
} from '../../times'

import {
  Title,
  SelectedIcon,
  StyledBullet,
  StyledCustomTime,
  StyledCustomTimeItem
} from './styles'

class CustomTime extends PureComponent {
  render() {
    const { selected, onClick, selectedTime } = this.props
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
                  <SelectedIcon name="dot-circle" color="pink" />
                :
                  <StyledBullet />
                }
              </View>
              {(selected && selectedTime) ?
                <Text inline>{getTimeDisplay(selectedTime)}</Text>
              :
                <Text inline>Escolher horário específico</Text>
              }
            </Title>
          </Col>
        </Row>
        {(selected && !selectedTime) &&
          <Row flexWrap="wrap" justifyContent="space-between">
            {this.props.children}
          </Row>
        }
        </Col>
      </StyledCustomTime>
    )
  }
}

CustomTime.propTypes = {
  selected: PropTypes.bool,
  selectedTime: PropTypes.string
}

CustomTime.Item = (props) => <StyledCustomTimeItem> <Button {...props} /></StyledCustomTimeItem>

export default CustomTime
