import styled from 'styled-components'
import theme from 'config/theme'
import {themeGet, bgColor} from 'styled-system'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'

export const TITLE_HEIGHT = 50

const animation = '350ms ease-in-out'

export default styled(Row)`
  z-index: 0;
  box-sizing: border-box;
  flex: 1 1 100%;
  ${bgColor};
  overflow: hidden;
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
  ${Text} {
    margin: 0 0 ${theme.space[5]}px;
  }
`

Content.defaultProps = {
  collapsedHeight: '0px'
}

export const TitleText = Text.withComponent('h3')

export const Title = styled(TitleText)`
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
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: -${TITLE_HEIGHT}px;
  height: ${TITLE_HEIGHT}px;
  background: linear-gradient(to bottom, transparent, 50%, ${props => bgColor(props).backgroundColor});
  transition: all ${animation};

  ${Button} {
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
