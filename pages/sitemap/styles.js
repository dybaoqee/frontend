import styled from 'styled-components'
import theme from '@emcasa/ui'
import Text from '@emcasa/ui-dom/components/Text'

export const Title = Text.withComponent('h2')

export default styled.div`
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
      text-decoration: none;
      color: ${theme.colors.dark};
      font-size: ${theme.fontSizes[1]}px;
      font-weight: 600;

      &::before {
        content: '• '
      }

      &:hover {
        color: ${theme.colors.pink};
      }

      @media screen and (max-width: ${theme.breakpoints[0]}) {
        display: block;
        font-size: ${theme.fontSizes[2]}px;
        padding: ${theme.space[1]}px 0;
      }
    }

    li ul a {
      font-weight: normal;
    }
  }
`
