import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Button from '@emcasa/ui-dom/components/Button'
import Col from '@emcasa/ui-dom/components/Col'
import Row from '@emcasa/ui-dom/components/Row'
import View from '@emcasa/ui-dom/components/View'

import {
  getTimeDisplay
} from 'components/listings/new-listing/lib/times'

import {
  Title,
  SelectedIcon,
  StyledBullet,
  CustomTimeText,
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
                <CustomTimeText inline>{getTimeDisplay(selectedTime)}</CustomTimeText>
              :
                <CustomTimeText inline>Escolher horário específico</CustomTimeText>
              }
            </Title>
          </Col>
        </Row>
        {(selected && !selectedTime) &&
          <Row flexWrap="wrap">
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

CustomTime.Item = (props) => <StyledCustomTimeItem><Button {...props} /></StyledCustomTimeItem>

export default CustomTime
