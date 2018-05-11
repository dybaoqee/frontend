import styled from 'styled-components'
import * as colors from 'constants/colors'

export default styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  box-sizing: border-box;
  grid-column-gap: 24px;
  margin-top: 15px;
  position: relative;

  > * {
    border-bottom: 1px solid ${colors.lightestGray};
  }

  :after {
    position: absolute;
    content: '';
    width: 100%;
    height: 2px;
    background: white;
    bottom: 0;
  }
`

export const Info = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;

  span {
    height: 19px;
    font-size: 14px;
    line-height: 19px;
    text-align: right;
  }

  > span:first-of-type {
    text-transform: uppercase;
    color: ${colors.mediumDarkGray};
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 0.4px;
  }
`
