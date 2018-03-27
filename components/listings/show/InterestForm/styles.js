import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'

export default styled.form`
  margin: auto;
  max-width: calc(100% - 80px);
  width: 500px;
  padding-bottom: 30px;

  @media ${mobileMedia} {
    max-width: calc(100% - 20px);
  }

  p.error {
    color: ${colors.red.medium};
  }

  input[type='text'],
  .type,
  textarea {
    box-sizing: border-box;
    border: 1px solid #ccc;
    resize: vertical;
    border-radius: 4px;
    clear: both;
    display: block;
    font-size: 14px;
    margin: 0 auto 10px;
    padding: 10px;
    min-width: 100%;
  }

  .Select {
    padding: 0px;
    border: none;
  }

  .Select-control {
    padding: 3px;
    vertical-align: middle;
  }

  .Select-value,
  .Select-placeholder {
    align-items: center;
    display: flex;
    justify-content: left;
  }

  .Select-option {
    align-items: left;
    display: flex;
  }

  > span {
    color: ${colors.lightGray};
    font-weight: 400;
    font-size: 16px;
    display: block;
    margin-bottom: 10px;

    :before,
    :after {
      display: inline-block;
      content: '—	';
      margin: 0 2px;
      color: ${colors.lightGray};
    }
  }
`

export const Container = styled.div`
  padding: 20px;
`
