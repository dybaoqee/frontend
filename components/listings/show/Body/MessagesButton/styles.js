import * as colors from 'constants/colors'
import styled from 'styled-components'

export default styled.div`
  box-sizing: border-box;
  border: 1px solid ${colors.lightestGray};
  border-radius: 6px;
  box-shadow: 0 6px 16px 0 rgba(38, 38, 38, 0.15);
  padding: 24px;
  width: 100%;
  height: 60px;
  background: white;
  color: ${colors.blue.medium};
  margin-bottom: 15px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  svg {
    width: 17px !important;
    height: 17px;
    margin-right: 10px;
  }
`
