import styled from 'styled-components'
import {mobileMedia} from 'constants/media'

export default styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 40px;

  h3 {
    box-sizing: border-box;
    width: 100%;
    font-size: 32px;
    font-weight: 300;
    letter-spacing: -0.3px;
    line-height: 48px;
    text-align: center;
    margin: auto;
    padding: 0 40px;
    margin-bottom: 20px;
  }

  @media ${mobileMedia} {
    padding: 20px;
  }
`

export const StepContainer = styled.div`
  box-sizing: border-box;
  margin: 10px 0;
  width: 500px;
  margin-top: 20px;

  @media ${mobileMedia} {
    width: 100%;
  }
`

export const Buttons = styled.div`
  box-sizing: border-box;
  margin: 0 10px;
  width: 500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  > button {
    max-width: 220px;
    box-sizing: border-box;
  }

  @media ${mobileMedia} {
    width: 100%;
  }
`
