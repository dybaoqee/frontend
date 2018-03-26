import styled from 'styled-components'

import * as colors from 'constants/colors'

export default styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

export const Footer = styled.footer`
  width: 100%;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  font-size: 0.7em;
  background-color: ${colors.offWhite};
  a {
    display: block;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    color: inherit;
    text-decoration: none;
  }
`
