import styled from 'styled-components'
import Text from '@emcasa/ui-dom/components/Text'
import theme from '@emcasa/ui'

export const Container = styled.div`
  position: relative;
  max-width: 960px;
  margin: auto;
`

export const ListingsContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  overflow-x: scroll;
`

export const SubTitle = Text.withComponent('h3')

export const Gradient = styled.div`
  position: absolute;
  top: 74px;
  right: 0;
  width: 60px;
  height: calc(100% - 96px);
  background-image: linear-gradient(to right, transparent, white);

`
