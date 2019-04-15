import styled from 'styled-components'
import theme from '@emcasa/ui'
import Row from '@emcasa/ui-dom/components/Row'
import View from '@emcasa/ui-dom/components/View'

const DASH_WIDTH = 40

export const Container = styled(Row)`
  width: 100%;
  justify-content: center;
  flex-direction: row;
`

export const Item = styled(Row)`
  position: relative;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  width: 80px;
  margin: ${theme.space[2]}px 0 ${theme.space[2]}px 0;
`

export const Dash = styled(View)`
  position: absolute;
  margin-top: 20px;
  margin-left: 59px;
  width: ${DASH_WIDTH}px;
  height: 0px;
  border: 1px solid ${theme.colors.lightGrey};
`
