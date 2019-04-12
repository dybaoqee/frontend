import styled from 'styled-components'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'

export const GreenBox = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45%;
  background-color: ${theme.colors.green};
`
export const CheckContainer = styled(View)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

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
