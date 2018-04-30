import styled from 'styled-components'
import {mobileMedia} from 'constants/media'

export default styled.div`
  form {
    margin: 0 auto 100px;
    padding-top: 40px;
    width: 400px;
  }

  @media ${mobileMedia} {
    form {
      width: calc(100vw - 40px);
    }
  }
`
