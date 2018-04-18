import styled from 'styled-components'
import * as colors from 'constants/colors'
export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  padding: 8px;
  margin-left: -10px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 50%;
  background-color: ${colors.blue.dark};
  box-shadow: 1px 3px 6px rgba(0, 0, 0, 0.3);
`
