import styled from 'styled-components'
import * as colors from 'constants/colors'

const Title = styled.h1`
  font-weight: normal;
  font-size: 22px;
`

const Field = styled.div`
  margin-bottom: 20px;
  position: relative;
  label {
    font-weight: 600;
    font-size: 11px;
    text-transform: uppercase;
    float: left;
    margin: 0 0 10px 0;
  }
`
const Input = styled.input`
  border: 1px solid ${colors.lightGray};
  border-radius: 6px;
  font-size: 16px;
  padding: 15px;
  width: calc(100% - 22px);
  &[readonly] {
    color: #bbb;
  }
`

export {Title, Field, Input}
