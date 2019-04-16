import styled from 'styled-components'
import theme from 'config/theme'
import Text from '@emcasa/ui-dom/components/Text'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import {breakpoint} from '@emcasa/ui/lib/styles'
import {listingDetailsMaxWidth, listingDetailsBarHeight} from 'constants/dimensions.js'

const LINK_FONT_SIZE_MOBILE = '14px'
const LINK_FONT_SIZE = '16px'

export const Wrapper = styled.address`
  font-style: normal;
  background-color: ${theme.colors.dark};
`

export const Container = styled(Row)`
  flex-direction: column;
  margin: 0 auto;
  padding: ${theme.space[5]}px ${theme.space[4]}px ${listingDetailsBarHeight + theme.space[6]}px;
  max-width: ${listingDetailsMaxWidth}px;
`

export const AboutContainer = styled(Row)`
  flex: 1 1 100%;
  flex-direction: column;
`

export const LogoWrapper = styled.div`
  max-width: 110px;
`

export const AboutText = styled(Text)`
  max-width: 350px;
  margin: ${theme.space[4]}px 0 0;
`

export const LinksContainer = styled(Row)`
  flex-wrap: wrap;
`

export const LinksItem = styled(Row)`
  flex: 0 0 50%;
  padding-right: ${theme.space[2]}px;
  box-sizing: border-box;
`

export const TitleLinks = styled(Text)`
  margin: 0 0 ${theme.space[2]}px;
  color: ${theme.colors.white};
`

export const TextLink = styled(Text)`
  cursor: pointer;
  color: ${theme.colors.disabled};
  line-height: 1.2;
  font-size: ${LINK_FONT_SIZE};
  margin: ${theme.space[2]}px 0 0;

  &:hover {
    color: ${theme.colors.white};
  }

  svg {
    width: ${LINK_FONT_SIZE};
    height: ${LINK_FONT_SIZE};
    margin-right: 5px;
    color: ${theme.colors.white};
  }

  @media ${breakpoint.down('tablet')} {
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
