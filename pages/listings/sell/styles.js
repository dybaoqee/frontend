import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {desktopHeaderHeight} from 'constants/dimensions'
import View from '@emcasa/ui-dom/components/View'

export const Container = styled(View)`
  display: flex;
  flex-direction: column;
`

export const Block = styled(View)`
  display: flex;
  flex: 1;
  min-height: 60vh;
  max-width: 100vw;
  overflow: hidden;
  justify-content: center;
  padding-top: ${desktopHeaderHeight}px;
`

export const MainBlock = styled(Block)`
  padding-top: 0px;
  min-height: 80vh;
  @media (max-width: ${themeGet('breakpoints.0')}) {
    min-height: 100vh;
  }
`
