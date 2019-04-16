import styled from 'styled-components'
import theme from 'config/theme'
import {backgroundColor} from 'styled-system'
import {breakpoint} from '@emcasa/ui/lib/styles'
import {listingDetailsMaxWidth} from 'constants/dimensions'
import Text from '@emcasa/ui-dom/components/Text'

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: ${listingDetailsMaxWidth}px;
  margin: auto;
  padding: 0 ${theme.space[4]}px;
  box-sizing: border-box;
`

export const ListingsContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;

  @media ${breakpoint.up('desktop')} {
    flex-wrap: nowrap;
    overflow-x: scroll;
  }
`

export const Gradient = styled.div`
  pointer-events: none;

  @media ${breakpoint.up('desktop')} {
    position: absolute;
    top: 0;
    right: ${theme.space[4]}px;
    width: 60px;
    height: 100%;
    background-image: linear-gradient(
      to right,
      transparent,
      ${(props) => backgroundColor(props).backgroundColor}
    );
  }
`
