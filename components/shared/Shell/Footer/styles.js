import styled from 'styled-components'
import theme from 'config/theme'
import Text from '@emcasa/ui-dom/components/Text'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import {breakpoint} from '@emcasa/ui/lib/styles'

const LINK_FONT_SIZE_MOBILE = '14px'
const LINK_FONT_SIZE = '16px'

export const Wrapper = styled.address`
  font-style: normal;
`

export const Container = styled(Row)`
  border-top: 1px solid ${theme.colors.pink};
  margin: 50px;
  padding: ${theme.space[4]}px 2.5vw 0 5vw;

  @media (max-width: 1024px) {
    margin: ${theme.space[4]}px ${theme.space[4]}px 170px;
    flex-direction: column;
    padding: ${theme.space[4]}px 5vmin 0;
  }
`

export const AboutContainer = styled(Row)`
  flex: 1 1 100%;
  flex-direction: column;
`

export const AboutLogo = styled.div`
  content: url(https://s3.amazonaws.com/emcasa-ui/logo/logo.svg);
  max-width: 110px;
  margin-top: 1.5em;
`

export const AboutText = styled(Text)`
  max-width: 350px;
`

export const LinksContainer = styled('div')`
  flex: 1 1 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0 ${theme.space[5] * 2}px;

  @media ${breakpoint.down('tablet')} {
    grid-template-columns: 1fr;
  }
`

export const TitleLinks = styled(Text)`
  white-space: nowrap;
`

export const TextLink = styled(Text)`
  cursor: pointer;
  color: ${theme.colors.grey};
  line-height: 1.2;
  font-size: ${LINK_FONT_SIZE};
  white-space: nowrap;

  &:hover {
    color: ${theme.colors.pink};
  }

  svg {
    width: ${LINK_FONT_SIZE};
    height: ${LINK_FONT_SIZE};
    margin-right: 5px;
  }

  @media ${breakpoint.down('tablet')} {
    margin-right: 20px;
    min-height: ${LINK_FONT_SIZE_MOBILE};
    font-size: ${LINK_FONT_SIZE_MOBILE};

    svg {
      width: ${LINK_FONT_SIZE_MOBILE};
      height: ${LINK_FONT_SIZE_MOBILE};
    }
  }
`

export const LinkGroup = styled.div`
  @media ${breakpoint.down('tablet')} {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: flex-start;
  }

  a {
    text-decoration: none;
  }
`
