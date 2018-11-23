import styled from 'styled-components'
import { themeGet } from 'styled-system'

import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'

const CORNER_SIZE = 10

const CardContainer = styled(Row)`
  max-width: 340px;
`

const Separator = styled(View)`
  height: 1px;
  width: 100%;
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

const TopContainer = styled(Col)`
  padding: ${themeGet('space.4')}px;
  box-shadow: 0px -2px 2px 0px rgba(0, 0, 0, 0.2), 0px 0px 2px 2px rgba(0, 0, 0, 0.2);
`

const BottomContainer = styled(Col)`
  padding: ${themeGet('space.4')}px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px -2px 2px 0px;
`

export {
  CardContainer,
  TopContainer,
  BottomContainer,
  Separator,
  TopLeftCorner,
  BottomLeftCorner,
  TopRightCorner,
  BottomRightCorner
}

// box-shadow: rgba(0, 0, 0, 0.2) 0px -2px 2px 0px, rgba(0, 0, 0, 0.14) 0px -2px 2px 0px, rgba(0, 0, 0, 0.12) 0px -2px 2px 0px;
// box-shadow: rgba(0, 0, 0, 0.2) 0px -2px 2px 0px, rgba(0, 0, 0, 0.14) 0px -2px 2px 0px, rgba(0, 0, 0, 0.12) 0px -2px 2px 0px;