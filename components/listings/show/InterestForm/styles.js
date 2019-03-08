import styled from 'styled-components'
import theme from 'config/theme'
import Text from '@emcasa/ui-dom/components/Text'
import View from '@emcasa/ui-dom/components/View'
import {breakpoint} from '@emcasa/ui/lib/styles'

export const Container = styled(View)`
  text-align: center;
  padding: ${theme.space[4]}px;
  box-shadow: 0 6px 16px 0 rgba(38, 38, 38, 0.15);
  background-color: ${theme.colors.white};
  max-width: 400px;

  @media ${breakpoint.down('tablet')} {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
`

export const Form = styled.form`
  margin: auto;
  max-width: calc(100% - 80px);
  width: 400px;
  text-align: left;

  @media ${breakpoint.down('tablet')} {
    max-width: calc(100% - 20px);
  }
`

export const Title = Text.withComponent('h1')
