import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import styled from 'styled-components'

export default styled.div`
  box-sizing: border-box;
  padding: 70px 120px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

  a,
  span {
    text-decoration: none;
    color: ${colors.mediumDarkGray};
    font-size: 14px;
  }

  > div {
    box-sizing: border-box;
    width: 100%;

    > * {
      display: block;
      margin-bottom: 14px;
    }
  }

  h4 {
    font-weight: 600;
    font-size: 16px;
    color: ${colors.gray4a};
    margin: 16px 0;
  }

  div.neighborhoods {
    display: grid;
    box-sizing: border-box;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));

    > h4 {
      grid-column: -1 / 1;
    }
  }

  @media ${mobileMedia} {
    padding: 30px 40px;
    grid-template-columns: 1fr;
  }
`
