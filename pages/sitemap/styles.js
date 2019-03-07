import styled from 'styled-components'
import theme from 'config/theme'
import Text from '@emcasa/ui-dom/components/Text'
import {breakpoint} from '@emcasa/ui/lib/styles'

export const Title = Text.withComponent('h2')

export default styled.div`
  max-width: ${theme.breakpoints[theme.breakpointNames.indexOf('tablet')]};
  margin: 0 0 ${theme.space[6]}px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0 ${theme.space[5]}px;

    li {
      margin-bottom: ${theme.space[3]}px;

      li {
        margin-bottom: 0;
      }
    }

    a {
      display: block;
      text-decoration: none;
      color: ${theme.colors.dark};
      font-size: ${theme.fontSizes[1]}px;
      padding: ${theme.space[1]}px 0;
      font-weight: 600;

      &::before {
        content: '• '
      }

      &:hover {
        color: ${theme.colors.pink};
      }

      @media screen and ${breakpoint.down('tablet')} {
        font-size: ${theme.fontSizes[2]}px;
      }
    }

    li ul a {
      font-weight: normal;
    }
  }
`
