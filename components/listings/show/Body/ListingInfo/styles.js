import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {breakpoint} from '@emcasa/ui/lib/styles'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'

export const Container = styled(Col)`
  @media screen and ${breakpoint.up('desktop')} {
    flex: 1 1 100%;
    margin-right: ${themeGet('space.6')}px;
  }
`

export const Title = styled(Text)`
  margin: 0;
`

export const ExtraTitleSEO = styled.span`
  position: fixed;
  top: -100vh;
  pointer-events: none;
  user-select: none;
  left: -100vw;
`

export const ValuesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: ${themeGet('space.5')}px;
`

export const ValuesItem = styled(Row)`
  margin: 0 ${themeGet('space.5')}px ${themeGet('space.2')}px 0;

  ${Text} {
    margin: 0;
  }
`

export const ButtonsContainer = styled(Row)`
  margin-top: ${themeGet('space.4')}px;

  ${Button} {
    margin-right: ${themeGet('space.2')}px;

    &:last-child {
      margin-right: 0;
    }

    svg {
      margin-right: ${themeGet('space.2')}px;
      display: inline-block;
      width: 1em;
      height: 1em;
      overflow: visible;
      vertical-align: -0.125em;
      font-size: inherit;
    }
  }
`

export const OpenMatterportButton = styled(Button)`
  z-index: 1;
  position: absolute;
  top: ${themeGet('space.5')}px;
  left: 50%;
  flex: 1;
  transform: translateX(-50%);
  color: ${themeGet('colors.white')};
  background-color: ${themeGet('colors.blue')};
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
  margin: 0 0 ${themeGet('space.3')}px;
  font-size: ${themeGet('fontSizes.1')}px;

  @media screen and ${breakpoint.up('desktop')} {
    font-size: ${themeGet('fontSizes.2')}px;
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
  padding: 0 ${themeGet('space.4')}px ${themeGet('space.2')}px;

  &::before {
    content: '';
    width: 100%;
    height: 1px;
    background-color: ${themeGet('colors.lightGrey')};
  }
`
