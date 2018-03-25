import styled from 'styled-components'

import * as colors from 'constants/colors'

export default styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  a[href] {
    color: inherit;
    text-decoration: none;
  }
`

export const Footer = styled.footer`
  width: 100%;
  padding: 25px 0;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  font-size: 0.7em;
  background-color: ${colors.offWhite};
`
