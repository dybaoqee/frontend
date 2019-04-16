import styled from 'styled-components'
import theme from 'config/theme'
import {themeGet, backgroundColor} from 'styled-system'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import breakpoint from '@emcasa/ui/lib/styles/breakpoint';

export const TITLE_HEIGHT = 50

const animation = '350ms ease-in-out'

export default styled(Row)`
  z-index: 0;
  box-sizing: border-box;
  flex: 1 1 100%;
  ${backgroundColor};
  overflow: hidden;
  @media screen and ${breakpoint.up('desktop')} {
    flex: 1 1 100%;
  }
`

export const Content = styled(Row)`
  min-height: ${(props) => props.collapsedHeight};
  transition: all ${animation};
  ${({expanded, collapsedHeight}) => expanded ? `
    max-height: 350em;
  ` : `
    overflow: hidden;
    position: relative;
    max-height: ${collapsedHeight};
  `}
  &:before {
    content: ' ';
    display: table;
    height: ${themeGet('space.4')}px;
  }
  &:after {
    content: ' ';
    display: table;
    height: ${TITLE_HEIGHT}px;
  }
`

Content.defaultProps = {
  collapsedHeight: '0px'
}

export const P = styled(Text)`
  margin: 0 0 ${theme.space[5]}px;
`

export const Title = styled(Text).attrs({as: 'h3'})`
  z-index: 2;
  display: flex;
  align-items: center;
  height: ${TITLE_HEIGHT}px;
  margin: 0;
  pointer-events: none;
  span {
    pointer-events: all;
  }
`

export const BottomRow = styled(Row)`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: -${TITLE_HEIGHT}px;
  height: ${TITLE_HEIGHT}px;
  transition: all ${animation};
  background: transparent;

  &:before {
    pointer-events: none;
    z-index: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: ${(props) => props.expanded ? '100%' : '200%'};
    width: 100%;
    content: ' ';
    display: block;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      ${(props) => backgroundColor(props).backgroundColor} 65%
    );
    transition: height ${animation};
  }

  ${Button} {
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${theme.fontSizes[1]}px;

    svg {
      display: inline-block;
      width: 0.9em;
      height: 20px;
      margin-right: ${theme.space[2]}px;
      overflow: visible;
      vertical-align: -.125em;
      font-size: inherit;
    }
  }
`
