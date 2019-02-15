import styled from 'styled-components'
import theme from '@emcasa/ui'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'

export const Container = styled.div`
  border: 1px solid ${theme.colors.lightGrey};
  border-radius: 4px;
  box-shadow: 0 6px 16px 0 rgba(38, 38, 38, 0.15);
  float: right;
  padding: ${theme.space[4]}px;
  width: 260px;
  background: white;

  @media screen and (max-width: ${theme.breakpoints[0]}) {
    position: fixed;
    left: 0;
    bottom: 0;
    width: calc(100% - ${theme.space[4] * 2}px);
    margin: 0;
    float: unset;
    border-radius: 0;
    z-index: 3;
  }
`

export const PricesContainer = styled(Row)`
  flex-direction: column;
  padding: ${theme.space[1]}px 0;

  @media screen and (max-width: ${theme.breakpoints[0]}) {
    display: none;
  }
`

export const PriceItem = styled(Col)`
  display: flex;
  justify-content: space-between;
`
