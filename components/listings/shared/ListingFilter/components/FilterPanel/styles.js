import styled, { css } from 'styled-components'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import { isMobile } from 'lib/mobile'

const OFFSET_TOP = 32

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
  padding: ${theme.space[4]}px;
`

const ActionButtons = styled(Row)`
  justify-content: space-between;
  margin-top: ${theme.space[2]}px;
`

export {
  Container,
  Wrapper,
  ActionButtons
}
