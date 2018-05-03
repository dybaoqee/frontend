import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'

export default styled.div`
  float: left;
  margin-left: 20px;
  width: calc(100% - 340px);

  div.description {
    font-size: 14px;
    margin: 20px 10px 0;
    a {
      color: ${colors.blue.medium};
      display: inline-block;
      font-weight: 600;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .link-container {
    align-items: center;
    display: flex;
    float: right;
    .btn {
      margin: 14px 14px 14px 0px;
    }
  }

  @media ${mobileMedia} {
    margin-left: 0;
    width: 100%;

    a.btn {
      margin: 10px 10px 30px;
    }
  }
`
