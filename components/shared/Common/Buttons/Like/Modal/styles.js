import styled from 'styled-components'
import {breakpoint} from '@emcasa/ui/lib/styles'
import View from '@emcasa/ui-dom/components/View'

const WIDTH = 420
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
  display: flex;
  flex-direction: column;
  ${({justifyContent}) => justifyContent ? `justify-content: ${justifyContent};` : ``}
  position: relative;
  cursor: default;
  background-color: white;
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  margin: calc((100vh - ${HEIGHT}px) / 2) auto;
  z-index: 1;
  ${({padding}) => padding ? `padding: 0 20px;` : ``}


  @media ${breakpoint.only('phone')} {
    width: auto;
    height: 100%;
    margin: 0;
  }
`
