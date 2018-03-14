import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'

export default styled.form`
  margin: 0 auto 100px;
  padding-top: 40px;
  width: 400px;

  @media ${mobileMedia} {
    width: calc(100vw - 40px);
  }

  input {
    border: 1px solid ${colors.lightGray};
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 16px;
    padding: 15px;
    width: 100%;
    margin-bottom: 10px;

    :focus {
      border: 1px solid ${colors.blue.medium};
      outline: none;
    }

    &[readonly] {
      color: #bbb;
    }
    &[disabled] {
      background-color: ${colors.lightestGray};
    }
  }

  a {
    color: ${colors.blue.medium};
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
    :visited {
      color: ${colors.blue.medium};
    }
  }
`
