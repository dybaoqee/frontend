import styled from 'styled-components'
import theme from '@emcasa/ui'
import Text from '@emcasa/ui-dom/components/Text'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'

const LINK_FONT_SIZE = '16px'

export const Container = styled(Row)`
  border-top: 1px solid ${theme.colors.pink};
  margin: 50px;
  padding-top: 20px;
  
  @media (max-width: ${theme.breakpoints[0]}) {
    margin: 20px;
  }
`

export const TextLink = styled(Text)`
  cursor: pointer;
  color: ${theme.colors.grey};
  line-height: 0.8em;
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

export const LinkGroup = styled.div`
  @media (max-width: ${theme.breakpoints[0]}) {
    display: flex;
    flex-wrap: wrap; 
    flex-direction: column;
    height: 15vh;
  }
`

export const AboutText = styled(Text)`
  max-width: 350px;
`

export const AboutLogo = styled.div`
  content: url(https://s3.amazonaws.com/emcasa-ui/logo/symbol.svg);
  max-width: 32px;
`
