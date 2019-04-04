import styled from 'styled-components'
import theme from 'config/theme'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import {breakpoint} from '@emcasa/ui/lib/styles'

export const Container = styled.div`
  position: relative;
  border: 1px solid ${theme.colors.lightGrey};
  border-radius: 4px;
  box-shadow: 0 6px 16px 0 rgba(38, 38, 38, 0.15);
  float: right;
  padding: ${theme.space[4]}px;
  width: 260px;
  background: white;

  @media screen and ${breakpoint.down('tablet')} {
    position: fixed;
    border: none;
    border-top: 1px solid ${theme.colors.lightGrey};
    left: 0;
    bottom: 0;
    width: calc(100% - ${theme.space[4] * 2}px);
    height: 130px;
    margin: 0;
    float: unset;
    border-radius: 0;
    z-index: 3;
  }
`

export const PricesContainer = styled(Row)`
  flex-direction: column;
  padding: ${theme.space[1]}px 0;

  @media screen and ${breakpoint.down('tablet')} {
    display: none;
  }
`

export const MainPriceContainer = styled(Text)`
  margin: 0 0 ${theme.space[2]}px 0;
  font-size: ${({isRange, theme}) => theme.fontSizes[isRange ? 3 : 4]}px;
  font-weight: bold;
  color: ${theme.colors.pink};

  @media screen and ${breakpoint.down('tablet')} {
    font-size: ${theme.fontSizes[4]}px;
  }
`

export const PriceItem = styled(Col)`
  display: flex;
  justify-content: space-between;
`
