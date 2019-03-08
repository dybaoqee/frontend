import styled from 'styled-components'
import Text from '@emcasa/ui-dom/components/Text'
import {breakpoint} from '@emcasa/ui/lib/styles'
import theme from 'config/theme'

export const Container = styled.div`
  position: relative;
  width: 960px;
  max-width: calc(100vw - ${theme.space[4] * 2}px);
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
  pointer-events: none;
  position: absolute;
  top: 74px;
  right: 0;
  width: 60px;
  height: calc(100% - 96px);
  background-image: linear-gradient(to right, transparent, white);

  @media ${breakpoint.down('tablet')} {
    right: ${theme.space[4]}px;
  }
`
