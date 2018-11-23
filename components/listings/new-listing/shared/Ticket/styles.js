import styled from 'styled-components'
import { themeGet } from 'styled-system'

import Row from '@emcasa/ui-dom/components/Row'
import View from '@emcasa/ui-dom/components/View'

const TICKET_WIDTH = 300
const SEPARATOR_WIDTH = 220
const CORNER_SIZE = 10

const TicketContainer = styled(Row)`
  min-width: ${TICKET_WIDTH}px;
  max-width: ${TICKET_WIDTH}px;
`

const Separator = styled(View)`
  height: 1px;
  width: ${SEPARATOR_WIDTH}px;
  background-color: ${themeGet('colors.lightGrey')};
`

const TopLeftCorner = styled.div`
  margin-top: -2px;
  margin-left: 4px;
  width: ${CORNER_SIZE}px;
  height: ${CORNER_SIZE}px;
  border-top: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 0 100% 0 0;
  box-shadow: rgba(0, 0, 0, 0.2) -1px 1px 2px 0px inset;
  background-color: #fff;
`

const BottomLeftCorner = styled.div`
  margin-left: 4px;
  width: ${CORNER_SIZE}px;
  height: ${CORNER_SIZE}px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0 0 100% 0;
  box-shadow: rgba(0, 0, 0, 0.2) -1px -1px 1px 0px inset;
  background-color: #fff;
`

const TopRightCorner = styled.div`
  margin-top: -2px;
  margin-right: 4px;
  width: ${CORNER_SIZE}px;
  height: ${CORNER_SIZE}px;
  border-top: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 100% 0 0 0;
  box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 2px 0px inset;
  background-color: #fff;
`

const BottomRightCorner = styled.div`
  margin-right: 4px;
  width: ${CORNER_SIZE}px;
  height: ${CORNER_SIZE}px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0 0 0 100%;
  box-shadow: rgba(0,0,0,0.2) 1px -1px 2px 0px inset;
  background-color: #fff;
`

const SeparatorContainer = styled(Row)`
  position: absolute;
  margin-left: ${(TICKET_WIDTH - SEPARATOR_WIDTH) / 2 + CORNER_SIZE / 2}px;
`

const CornerContainer = styled(View)`
  background-color: #fff;
  width: calc(100% + 10px);
  margin-left: -5px;
`

export {
  TicketContainer,
  Separator,
  TopLeftCorner,
  BottomLeftCorner,
  TopRightCorner,
  BottomRightCorner,
  SeparatorContainer,
  CornerContainer
}
