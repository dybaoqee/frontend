import styled from 'styled-components'
import * as colors from 'constants/colors'
export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13px;
  height: 13px;
  padding: 7px 8px 9px;
  margin-left: -10px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 50%;
  background-color: ${colors.blue.medium};
  box-shadow: 1px 3px 6px rgba(0, 0, 0, 0.3);

  :hover {
    cursor: pointer;
    background-color: ${colors.blue.dark};
  }
`
