import styled from 'styled-components'
import * as colors from 'constants/colors'

export default styled.div`
  ul {
    list-style: none;
    li {
    }

    a {
      text-decoration: none;
      color: ${colors.blue.dark};
    }

    > li {
      font-weight: 600;
    }

    li ul a {
      font-weight: normal;
      color: ${colors.blue.medium};
    }
  }

  li:before {
    content: '· ';
  }

  h1 {
    padding: 0 40px;
  }
`
