import styled from 'styled-components'
import theme from '@emcasa/ui'
import Text from '@emcasa/ui-dom/components/Text'
import Row from '@emcasa/ui-dom/components/Row'

const LINK_FONT_SIZE = '16px'

export const Container = styled(Row)`
  border-top: 1px solid ${theme.colors.pink};
  margin: 50px;
`

export const TextLink = styled(Text)`
  cursor: pointer;
  color: ${theme.colors.grey};
  font-size: ${LINK_FONT_SIZE};
  &:hover {
    color: ${theme.colors.pink};
  }
  svg {
    width: ${LINK_FONT_SIZE};
    height: ${LINK_FONT_SIZE};
    margin-right: 5px;
  }
`

export const AboutText = styled(Text)`
  max-width: 340px;
`
