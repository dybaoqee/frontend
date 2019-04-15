import styled from 'styled-components'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'

export const CheckContainer = styled(View)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid ${theme.colors.white};
  width: 42px;
  height: 42px;
  border-radius: 50%;

  svg {
    width: 15px;

    path {
      fill: ${theme.colors.white};
      stroke: ${theme.colors.white};
      fill-opacity: 1;
      stroke-width: 1;
    }
  }
`

export const GreenBox = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 40%;
  background-color: ${theme.colors.green};
`
