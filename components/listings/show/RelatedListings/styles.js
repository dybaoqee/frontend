import * as colors from 'constants/colors'
import styled from "styled-components"

export default styled.div`
  width: 100%;
  height: auto;
  background: ${colors.offWhite};
  &::before {
    content: " ";
    display: table;
  }
  > h3 {
    font-size: 12px;
    line-height: 17px;
    font-weight: bold;
    text-transform: uppercase;
    margin: 50px auto 0;
    max-width: 1180px;
  }
  > div {
    padding-top: 25px !important;
  }
`
