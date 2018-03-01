import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'

const Title = styled.h1`
  font-weight: normal;
  font-size: 22px;
`

const Field = styled.div`
  position: relative;
  label {
    font-weight: 600;
    font-size: 11px;
    text-transform: uppercase;
    float: left;
    margin: 0 0 10px 0;
  }
`

const StepContainer = styled.div`
  box-sizing: border-box;
  width: 700px;
  margin: 0 auto 100px;
  padding-top: 80px;
  width: 600px;
  padding: 60px 10px;

  @media ${mobileMedia} {
    padding-top: 10px;
    width: 100vw;
  }
`
const Input = styled.input`
  border: 1px solid ${colors.lightGray};
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 16px;
  padding: 15px;
  width: 100%;
  &[readonly] {
    color: #bbb;
  }

  @media ${mobileMedia} {
    margin-bottom: 10px;
  }
`

export {Title, Field, Input, StepContainer}
