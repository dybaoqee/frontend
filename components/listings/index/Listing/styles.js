import styled from 'styled-components'
import {mobileMedia} from 'constants/media'

export const LikeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;

  @media ${mobileMedia} {
    justify-content: flex-start;
  }
`
