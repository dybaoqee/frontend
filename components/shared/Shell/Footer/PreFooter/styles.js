import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import styled from 'styled-components'

export default styled.div`
  box-sizing: border-box;
  padding: 70px 120px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-column-gap: 24px;
  border-top: 1px solid ${colors.lightGray};

  svg {
    width: 15px !important;
    height: 15px;
    margin-right: 5px;
    path {
      fill: ${colors.blue.medium};
    }
  }

  > div {
    box-sizing: border-box;
    width: 100%;

    > * {
      width: 100% !important;
      display: block;
    }

    a,
    span {
      text-decoration: none;
      font-size: 14px;
      color: ${colors.mediumDarkGray};
      margin-bottom: 14px;
    }
  }

  h4 {
    font-weight: 600;
    font-size: 16px;
    color: ${colors.blue.medium};
    margin: 16px 0;
  }

  @media ${mobileMedia} {
    padding: 30px 40px;
    grid-template-columns: 1fr;
  }
`
