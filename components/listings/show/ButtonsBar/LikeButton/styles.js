import styled from 'styled-components'
import * as colors from 'constants/colors'
import theme from '@emcasa/ui'
import {breakpoint} from '@emcasa/ui/lib/styles'
import Button from '@emcasa/ui-dom/components/Button'

export default styled(Button)`
  margin-right: ${theme.space[2]}px;

  @media screen and ${breakpoint.up('desktop')} {
    margin-right: ${theme.space[4]}px;
  }

  svg {
    width: 15px;
    margin-right: ${theme.space[2]}px;

    path {
      fill: ${({favorite}) => (favorite ? theme.colors.pink : theme.colors.white)};
      stroke: ${({favorite}) => (favorite ? theme.colors.pink : theme.colors.dark)};
      fill-opacity: ${({favorite}) => (favorite ? 1 : 0)};
      stroke-width: 40;
    }
  }
`
