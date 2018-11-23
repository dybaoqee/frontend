import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'

import {
  TicketContainer,
  Separator,
  TopLeftCorner,
  BottomLeftCorner,
  TopRightCorner,
  BottomRightCorner,
  SeparatorContainer,
  CornerContainer
} from './styles'

class Ticket extends PureComponent {
  render() {
    return (
      <TicketContainer>
        <Row flexDirection="column">
          <View elevation={4} style={{borderRadius: 4}}>
            {this.props.topRender()}
            <CornerContainer>
              <Row justifyContent="space-between">
                <TopLeftCorner />
                <TopRightCorner />
              </Row>
              <SeparatorContainer>
                <Separator />
              </SeparatorContainer>
              <Row justifyContent="space-between">
                <BottomLeftCorner />
                <BottomRightCorner />
              </Row>
            </CornerContainer>
            {this.props.bottomRender()}
          </View>
        </Row>
      </TicketContainer>
    )
  }
}

Ticket.propTypes = {
  topRender: PropTypes.func.isRequired,
  bottomRender: PropTypes.func.isRequired
}

export default Ticket
