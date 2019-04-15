import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {breakpoint} from '@emcasa/ui/lib/styles'
import Button from '@emcasa/ui-dom/components/Button'

export const TextButton = styled(Button)`
  margin-right: ${themeGet('space.2')}px;

  @media screen and ${breakpoint.up('desktop')} {
    margin-right: ${themeGet('space.4')}px;
  }

  svg {
    width: 15px;

    path {
      fill: ${({favorite, ...props}) => {
        return favorite
          ? themeGet('colors.pink')(props)
          : themeGet('colors.white')(props)
      }};
      stroke: ${({favorite, ...props}) => {
        return favorite
          ? themeGet('colors.pink')(props)
          : themeGet('colors.dark')(props)
      }};
      fill-opacity: ${({favorite}) => (favorite ? 1 : 0)};
      stroke-width: 40;
    }
  }
`

export const Circle = styled(Button)`
  position: absolute;
  cursor: pointer;
  right: 20px;
  top: ${({top}) => (top ? `${top}px` : '115px')};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 6px 16px 0 rgba(38, 38, 38, 0.15);

  svg {
    width: 15px;
    text-shadow: 2px 2px 3px #f00;
    text-shadow: 2px 2px 3px #f00;

    path {
      text-shadow: 2px 2px 3px #f00;
      fill: ${({favorite, ...props}) => {
        return favorite
          ? themeGet('colors.pink')(props)
          : themeGet('colors.white')(props)
      }};
      stroke: ${({favorite, ...props}) => {
        return favorite
          ? themeGet('colors.pink')(props)
          : themeGet('colors.dark')(props)
      }};
      fill-opacity: ${({favorite}) => (favorite ? 1 : 0)};
      stroke-width: 60;
    }
  }
`
