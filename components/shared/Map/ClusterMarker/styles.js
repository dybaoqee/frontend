import styled from 'styled-components'
import {themeGet} from 'styled-system'

export default styled.div`
  box-sizing: border-box;
  width: 35px;
  height: 35px;
  margin-left: -10px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 100%;
  background-color: ${themeGet('colors.pink')};
  box-shadow: 1px 3px 6px rgba(0, 0, 0, 0.3);

  > span {
    box-sizing: border-box;
    padding: 2px 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${({highlight}) =>
    highlight
      ? `background-color: white; color: ${themeGet('colors.pink')}; 
          border: 2px solid ${themeGet('colors.pink')};`
      : ''};
  :hover {
    cursor: pointer;
    color: ${themeGet('colors.pink')};
    background-color: white;
  }
`
