import styled from 'styled-components'
import {themeGet} from 'styled-system'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import {breakpoint} from '@emcasa/ui/lib/styles'

export default styled(Row)`
  @media screen and ${breakpoint.up('desktop')} {
    flex: 1 1 100%;
  }

  ${Button} {
    display: flex;
    align-self: flex-end;
    align-items: center;
    justify-content: center;
    font-size: ${themeGet('fontSizes.1')}px;

    svg {
      display: inline-block;
      width: 0.9em;
      height: 20px;
      margin-right: ${themeGet('space.2')}px;
      overflow: visible;
      vertical-align: -0.125em;
      font-size: inherit;
    }
  }
`

export const Content = styled(Row)`
  ${({expanded}) =>
    expanded
      ? null
      : `
    height: 215px;
    overflow: hidden;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 100px;
      width: 100%;
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), white);
    }
  `} ${Text} {
    margin: 0 0 ${themeGet('space.5')}px;
  }
`

export const Title = styled(Text)`
  margin: 0 0 ${themeGet('space.5')}px;
`
