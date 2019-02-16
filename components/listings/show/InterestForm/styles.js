import styled from 'styled-components'
import theme from '@emcasa/ui'
import Text from '@emcasa/ui-dom/components/Text'
import View from '@emcasa/ui-dom/components/View'

export const Container = styled(View)`
  text-align: center;
  padding: ${theme.space[4]}px;
  box-shadow: 0 6px 16px 0 rgba(38, 38, 38, 0.15);
`

export const Form = styled.form`
  margin: auto;
  max-width: calc(100% - 80px);
  width: 400px;
  text-align: left;

  @media (max-width: ${theme.breakpoints[0]}) {
    max-width: calc(100% - 20px);
  }
`

export const Title = Text.withComponent('h1')
