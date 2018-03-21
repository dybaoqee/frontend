import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import MaskedInput from 'react-text-mask'

const Title = styled.h1`
  font-weight: normal;
  font-size: 22px;
`

const Field = styled.div`
  position: relative;
  display: grid;

  .Select-control {
    border: 1px solid ${colors.lightGray};
    box-sizing: border-box;
    border-radius: 6px;
    height: 54px;
    vertical-align: middle;
    font-size: 16px;
  }

  .Select-placeholder {
    align-items: center;
    display: flex;
  }
  .Select-value {
    align-items: center;
    border-radius: 9px;
    display: flex;
  }
  .Select-input {
    padding-top: 7px;
  }

  label {
    font-weight: 600;
    font-size: 11px;
    text-transform: uppercase;
    float: left;
    margin: 0 0 10px 0;

    span {
      color: ${colors.red.medium};
    }
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

  :focus {
    border: 1px solid ${colors.blue.medium};
    outline: none;
  }

  &[readonly] {
    color: #bbb;
  }
  &[disabled] {
    background-color: ${colors.lightestGray};
  }

  @media ${mobileMedia} {
    margin-bottom: 10px;
  }
`

export const InputWithMask = Input.withComponent(MaskedInput)

const ButtonControls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  > :last-child {
    margin-left: auto;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  margin-bottom: 10px;

  a {
    text-decoration: none;
    color: ${colors.blue.medium};
  }
`

export {Title, Field, Input, StepContainer, ButtonControls, Header}
