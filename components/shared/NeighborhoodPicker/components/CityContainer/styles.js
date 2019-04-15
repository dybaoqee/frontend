import styled from 'styled-components'
import {themeGet} from 'styled-system'
import Row from '@emcasa/ui-dom/components/Row'
import Button from '@emcasa/ui-dom/components/Button'
import {breakpoint} from '@emcasa/ui/lib/styles'

const CitiesWrapper = styled(Row)`
  position: absolute;
  flex-direction: column;
  width: ${({width}) => width}px;
  top: ${({top, fromHome, fullscreen}) => {
    if (fullscreen) {
      return '80px'
    } else if (!fromHome) {
      return '70px'
    }
    return `calc(${top}px + 60px)`
  }};
  left: ${({left, theme}) => (left ? `${left}px` : `${theme.space[4]}px`)};
  right: ${themeGet('space.4')}px;
  background-color: ${themeGet('colors.white')};
  border: 1px solid ${themeGet('colors.lightGrey')};
  border-radius: 0 0 4px 4px;
  box-sizing: border-box;
  z-index: 1;

  @media ${breakpoint.down('tablet')} {
    margin-bottom: ${themeGet('space.4')}px;
  }
`

const NeighborhoodButton = styled(Button)`
  width: max-content;
  :hover {
    border: 1px solid ${themeGet('colors.pink')};
  }
`

const Separator = styled.hr`
  border: 0.5px solid ${themeGet('colors.lightGrey')};
`

export {CitiesWrapper, NeighborhoodButton, Separator}
