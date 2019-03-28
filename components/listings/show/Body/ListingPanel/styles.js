import styled from 'styled-components'
import theme from 'config/theme'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import {breakpoint} from '@emcasa/ui/lib/styles'

export const Container = styled(Col)`
  flex: 1 1 100%;
`

export const PriceItem = styled(Text)`
  display: flex;
  justify-content: space-between;
  margin: 0;
`

export const PriceItemSpacer = styled('span')`
  flex: 1 1 100%;
  flex-direction: column;
  justify-content: flex-end;
  display: flex;
  padding: 0 ${theme.space[4]}px ${theme.space[2]}px;

  &::before {
    content: '';
    width: 100%;
    height: 1px;
    background-color: ${theme.colors.grey};
  }
`

export const TextTitle = Text.withComponent('h2')

export const Title = styled(TextTitle)`
  margin: 0 0 ${theme.space[5]}px;
`
