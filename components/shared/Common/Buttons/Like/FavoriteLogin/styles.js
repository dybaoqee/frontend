import styled from 'styled-components'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'

export const HeartContainer = styled(View)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid ${theme.colors.dark};
  width: 42px;
  height: 42px;
  border-radius: 50%;

  svg {
    width: 15px;

    path {
      fill: ${theme.colors.white};
      stroke: ${theme.colors.dark};
      fill-opacity: 0;
      stroke-width: 60;
    }
  }
`
