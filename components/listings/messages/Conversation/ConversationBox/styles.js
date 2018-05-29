import styled from 'styled-components'
import {headerMobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export default styled.div`
  box-sizing: border-box;
  position: relative;
  border-radius: 3px;
  border: 1px solid ${colors.mediumGray};
  flex: 1;
  height: auto;
  min-width: 300px;

  textarea {
    box-sizing: border-box;
    min-height: 150px;
    width: 99%;
    height: 115px;
    border: none;
    resize: vertical;
    outline: none;
    font-size: 14px;
    letter-spacing: -0.1px;
    line-height: 24px;
    padding: 10px;
  }

  > div {
    border-top: 1px solid ${colors.mediumGray};
    background: ${colors.grayf0};
    height: 80px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
  }

  :after,
  :before {
    left: 100%;
    top: 35px;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  :after {
    border-color: rgba(136, 183, 213, 0);
    border-left-color: white;
    border-width: 10px;
    margin-top: -10px;
  }
  :before {
    border-color: rgba(194, 225, 245, 0);
    border-left-color: ${colors.mediumGray};
    border-width: 11px;
    margin-top: -11px;
  }

  @media ${headerMobileMedia} {
    margin: 0px 0 0px 0;
    display: flex;
    width: 100%;
    height: 65px;
    margin-bottom: 10px;
    :after,
    :before {
      display: none;
    }

    > textarea {
      min-height: 100%;
      height: 100%;
      font-size: 16px;
      resize: none;
    }

    > div {
      height: auto;
      padding: 3px;
      display: grid;
      grid-template-columns: 1fr;
      border: none;
    }
  }
`
