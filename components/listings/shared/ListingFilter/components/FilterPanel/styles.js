import styled, { css } from 'styled-components'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import { isMobile } from 'lib/mobile'

const OFFSET_TOP = 32
const WRAPPER_PADDING = theme.space[4] * 2

const getDesktopPosition = () => {
  if (isMobile()) {
    return css`
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      margin: 0;
      padding: 0;
    `
  } else {
    return css`
      top: ${({top}) => top ? `calc(${top}px - ${OFFSET_TOP}px)` : '0'};
      left: ${({left}) => left ? `${left}px` : '0'};
      padding: ${theme.space[2]}px;
    `
  }
}

const Container = styled(View)`
  display: ${({show}) => show ? 'block' : 'none'};  
  position: absolute;
  background-color: ${theme.colors.white};
  ${getDesktopPosition()}
`

const Wrapper = styled(View)`
  @media screen and (max-width: ${theme.breakpoints[0]}) {
    position: relative;
    height: 100%;
    padding: ${theme.space[4]}px;
  }
`

const ActionsWrapper = styled(Row)`
  justify-content: space-between;
  margin-top: ${theme.space[2]}px;
  @media screen and (max-width: ${theme.breakpoints[0]}) {
    position: absolute;
    bottom: calc(20px + ${WRAPPER_PADDING}px);
    width: calc(100% - ${WRAPPER_PADDING}px);
  }
`

export {
  Container,
  Wrapper,
  ActionsWrapper
}
