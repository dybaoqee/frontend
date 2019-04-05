import styled from 'styled-components'
import theme from 'config/theme'
import {breakpoint} from '@emcasa/ui/lib/styles'
import {desktopHeaderHeight} from 'constants/dimensions'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'

export const Container = styled(Col)`
  flex: 1 1 100%;

  @media screen and ${breakpoint.up('desktop')} {
    margin-right: ${theme.space[6]}px;
  }
`

export const TextTitle = Text.withComponent('h2')

export const Title = styled(TextTitle)`
  margin: 0;
`

export const ButtonsContainer = styled(Row)`
  margin: ${theme.space[5]}px 0;

  ${Button} {
    margin-right: ${theme.space[2]}px;

    &:last-child {
      margin-right: 0;
    }

    svg {
      margin-right: ${theme.space[2]}px;
    }
  }
`

export const OpenMatterportButton = styled(Button)`
  z-index: 1;
  position: absolute;
  top: ${theme.space[5]}px;
  left: 50%;
  transform: translateX(-50%);
  color: ${theme.colors.white};
  background-color: ${theme.colors.blue};
  border: none;

  @media screen and ${breakpoint.up('desktop')} {
    position: relative;
    top: 0;
    left: 0;
    transform: translateX(0);
  }
`

export const PriceItem = styled(Text)`
  display: flex;
  justify-content: space-between;
  margin: 0;
  font-size: ${theme.fontSizes[1]}px;

  @media screen and ${breakpoint.up('desktop')} {
    font-size: ${theme.fontSizes[2]}px;
  }

  span {
    font-size: inherit; 
  }
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
    background-color: ${theme.colors.lightGrey};
  }
`

export const ValuesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media screen and ${breakpoint.up('desktop')} {
    justify-content: space-between;
  }
`

export const ValuesItem = styled(Row)`
  margin: 0 ${theme.space[5]}px ${theme.space[2]}px 0;

  ${Text} {
    margin: 0;
  }
`
