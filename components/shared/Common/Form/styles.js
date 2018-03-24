import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'

export default styled.form`
  margin: 0 auto;
  padding: 10px;
  width: ${({full}) => (full ? '100%' : '400px')};
  box-sizing: border-box;

  .Select-control {
    border: 1px solid ${colors.lightGray};
    border-radius: 6px;
    height: 54px;
    vertical-align: middle;
    font-size: 16px;
  }

  .Select-placeholder {
    align-items: center;
    display: flex;
  }
  .Select-value {
    align-items: center;
    border-radius: 9px;
    display: flex;
  }
  .Select-input {
    padding-top: 7px;
  }

  @media ${mobileMedia} {
    width: calc(100vw - 40px);
  }

  input[type='text'],
  input[type='email'],
  input[type='password'],
  textarea {
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

  ${({errors}) =>
    errors &&
    Object.keys(errors).map(
      (key) => `[name*="${key}"], .${key}{
          border-radius: 6px;
          border: 1px solid ${colors.red.medium} !important;
          margin-bottom: 10px !important;
        }

        .Select.${key} > .Select-control{
          border: none;
        }

        label[for*="${key}"]:after{
          box-sizing: border-box;
          display: flex;
          content: '${errors[key]}';
          position: absolute;
          background: ${colors.red.medium};
          color: white;
          padding: 6px 4px 4px 8px;
          width: 100%;
          bottom: -12px;
          border-radius: 0 0 6px 6px;
          z-index: -1;
          height: 25px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 10px;


          @media ${mobileMedia} {
            bottom: -2px;
          }
    }`
    )};
`
