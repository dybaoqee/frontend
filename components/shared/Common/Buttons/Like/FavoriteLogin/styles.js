import styled from 'styled-components'
import {themeGet} from 'styled-system'
import View from '@emcasa/ui-dom/components/View'

export const HeartContainer = styled(View)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid ${themeGet('colors.dark')};
  width: 42px;
  height: 42px;
  border-radius: 50%;

  svg {
    width: 15px;

    path {
      fill: ${themeGet('colors.white')};
      stroke: ${themeGet('colors.dark')};
      fill-opacity: 0;
      stroke-width: 60;
    }
  }
`
