import styled from 'styled-components'
import * as colors from 'constants/colors'

export default styled.div`
  display: flex;
  align-items: center;
  > :nth-child(2) {
    user-select: none;
    width: 70px;
    text-align: center;
  }
`

export const CounterButton = styled.span`
  align-items: center;
  border: solid 1px ${colors.blue};
  border-radius: 20px;
  color: ${colors.blue};
  font-size: 20px;
  font-weight: 400;
  margin: 2px;
  width: 25px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-content: center;
  cursor: pointer;
  user-select: none;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  opacity: ${(props) => (props.disabled ? 0.2 : 1)};

  &:hover {
    background-color: ${colors.blue};
    color: white;
  }
  &[disabled] {
    opacity: 0.4;
  }
  &.minus {
    height: 22px;
    margin-top: 2px;
    padding-bottom: 2px;
  }
`
