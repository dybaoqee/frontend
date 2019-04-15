import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {breakpoint} from '@emcasa/ui/lib/styles'

export default styled.div`
  max-width: ${({theme}) =>
    theme.breakpoints[theme.breakpointNames.indexOf('tablet')]};
  margin: 0 0 ${themeGet('space.6')}px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0 ${themeGet('space.5')}px;

    li {
      margin-bottom: ${themeGet('space.3')}px;

      li {
        margin-bottom: 0;
      }
    }

    a {
      display: block;
      text-decoration: none;
      color: ${themeGet('colors.dark')};
      font-size: ${themeGet('fontSizes.1')}px;
      padding: ${themeGet('space.1')}px 0;
      font-weight: 500;

      &::before {
        content: '• ';
      }

      &:hover {
        color: ${themeGet('colors.pink')};
      }

      @media screen and ${breakpoint.down('tablet')} {
        font-size: ${themeGet('fontSizes.2')}px;
      }
    }

    li ul a {
      font-weight: normal;
    }
  }
`
