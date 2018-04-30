import * as colors from 'constants/colors'
import styled from 'styled-components'

export default styled.div`
  color: ${colors.gray4a};
  margin-top: 36px;
  padding-left: 10px;
`
export const Icon = styled.div`
  width: 42px;
  height: 42px;
  background: ${({is_active}) =>
    is_active ? colors.green.light : colors.orange.light};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-right: 8px;
`
export const Topic = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  svg {
    width: 20px !important;
    height: 20px;
    margin-right: 20px;
    margin-left: 20px;
    path {
      font-weight: 300px;
    }
  }
`
export const Title = styled.div`
  flex: 1;
  p {
    padding: 0;
    margin: 0;
  }

  p {
    font-size: 12px;
    font-weight: bold;
    line-height: 17px;
    text-transform: uppercase;
    margin-bottom: 3px;
  }

  span {
    font-size: 14px;
    line-height: 19px;
  }
`
