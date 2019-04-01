import styled from 'styled-components'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'
import {breakpoint} from '@emcasa/ui/lib/styles'

const WIDTH = 480
const HEIGHT = 640

export const Background = styled(View)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
`

export const Container = styled(View)`
  cursor: default;
  background-color: white;
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  margin: calc((100vh - ${HEIGHT}px) / 2) auto;
  z-index: 1;

  @media ${breakpoint.only('mobile')} {
    width: 100%;
    height: 100%;
  }
`

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
