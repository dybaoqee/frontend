import styled from 'styled-components'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import Button from '@emcasa/ui-dom/components/Button'

const OFFSET_TOP = 26
const WRAPPER_PADDING = theme.space[4] * 2
const MAX_FILTER_PANEL_DESKTOP_WIDTH = 300

const Container = styled(View)`
  position: absolute;
  display: ${({show}) => show ? 'block' : 'none'};
  top: ${({top}) => top ? `calc(${top}px - ${OFFSET_TOP}px)` : '0'};
  left: ${({left}) => left ? `${left}px` : '0'};
  border-radius: 4px;
  box-shadow: 0px 0px 8px -1px rgba(0,0,0,0.2);

  @media screen and (max-width: ${theme.breakpoints[0]}) {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
  }
`

const Wrapper = styled(View)`
  position: relative;
  z-index: 2;
  padding: ${theme.space[2]}px;
  background-color: ${theme.colors.white};
  border-radius: 4px;

  @media screen and (max-width: ${theme.breakpoints[0]}) {
    position: relative;
    height: 100%;
    padding: ${theme.space[4]}px;
  }
`

const FilterOptions = styled(Row)`
  justify-content: flex-start;
`

const ActionsWrapper = styled(Row)`
  justify-content: space-between;
  margin-top: ${theme.space[2]}px;
  width: 100%;
  @media screen and (max-width: ${theme.breakpoints[0]}) {
    position: absolute;
    margin: 0;
    bottom: calc(20px + ${WRAPPER_PADDING}px);
    width: calc(100% - ${WRAPPER_PADDING}px);
  }

  Button {
    font-size: ${theme.fontSizes[1]}px;
  }
`

const MobileContent = styled(Row)`
  display: none;
  padding: 0;
  margin: 0;
  @media screen and (max-width: ${theme.breakpoints[0]}) {
    display: block;
  }
`

const DesktopContent = styled(Row)`
  @media screen and (max-width: ${theme.breakpoints[0]}) {
    display: none;
    padding: 0;
    margin: 0;
  }
`

export {
  Container,
  Wrapper,
  ActionsWrapper,
  FilterOptions,
  MobileContent,
  DesktopContent,
  MAX_FILTER_PANEL_DESKTOP_WIDTH
}
