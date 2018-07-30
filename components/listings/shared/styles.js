import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia, headerMobileMedia} from 'constants/media'
import MaskedInput from 'react-text-mask'

export const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;

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

  @media ${mobileMedia} {
    padding-bottom: 10px;
  }
`

export const StepContainer = styled.div`
  margin: 0 40px;
  box-sizing: border-box;
  padding: 0 10px;
  flex: 1;

  @media ${mobileMedia} {
    padding-top: 10px;
    width: 100vw;
  }
`

export const Step = styled.div`
  box-sizing: border-box;
  min-width: 330px;
  max-width: 600px;
  margin: 40px auto 0;

  @media ${mobileMedia} {
    margin: 0;
    min-width: 100%;
  }
`
export const Input = styled.input``

export const InputWithMask = Input.withComponent(MaskedInput)

export const ButtonControls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 10px;

  > :last-child {
    margin-left: auto;
  }
`

export const Header = styled.div`
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
export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;

  @media ${headerMobileMedia} {
    padding-top: 20px;
    flex-direction: row;
  }
`

export const EditButtons = styled.div`
  box-sizing: border-box;

  > :first-child {
    margin-right: 10px;
  }
`
