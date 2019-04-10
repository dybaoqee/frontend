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

export const Input = styled.input

export const InputWithMask = styled(MaskedInput)

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
