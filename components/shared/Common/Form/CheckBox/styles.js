import styled from 'styled-components'
import * as colors from 'constants/colors'

export default styled.div`
  position: relative;
  box-sizing: border-box;

  width: 20px;
  height: 20px;
  height: 20px;
  width: 20px;
  border: 1px solid ${colors.lightGray};
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    position: absolute;
    cursor: pointer;
    opacity: 0;
    width: 100%;
    height: 100%;
    margin: 0;
  }

  span {
    opacity: 0;
    cursor: pointer;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    color: ${colors.blue.medium};
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 18px !important;
      height: 18px;
    }
  }

  input:checked + span {
    opacity: 1;
  }
`
