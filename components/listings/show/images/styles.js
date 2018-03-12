import styled from 'styled-components'
import {mobileMedia} from 'constants/media'

export default styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  grid-gap: 20px;

  > div:nth-child(odd) {
    justify-self: end;
  }

  > div:nth-child(even) {
    justify-self: start;
  }

  @media ${mobileMedia} {
    grid-template-columns: 1fr;
    > div:nth-child(odd) {
      justify-self: center;
    }

    > div:nth-child(even) {
      justify-self: center;
    }
  }
`
