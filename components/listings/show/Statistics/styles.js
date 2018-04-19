import * as colors from 'constants/colors'
import styled from 'styled-components'

export default styled.div`
  color: ${colors.gray4a};
  margin-top: 36px;
  padding-left: 10px;
`

export const Topic = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  svg {
    width: 20px !important;
    height: 20px;
    margin-right: 20px;
    path {
      font-weight: 300px;
    }
  }
`
export const Title = styled.div`
  p {
    padding: 0;
    margin: 0;
  }

  p:first-of-type {
    font-size: 12px;
    font-weight: bold;
    line-height: 17px;
    text-transform: uppercase;
    margin-bottom: 3px;
  }

  p:last-of-type {
    font-size: 14px;
    line-height: 19px;
  }
`
