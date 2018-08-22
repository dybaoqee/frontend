import styled from 'styled-components'
import {headerMobileMedia} from 'constants/media'

export default styled.div`
  box-sizing: border-box;
  height: 480px;
  width: 100vw;
  background: black;
  cursor: pointer;
`

export const Poster = styled.div`
  background: url('/static/img/matterport_poster.jpg');
  box-sizing: border-box;
  height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  @media ${headerMobileMedia} {
    background-size: cover;
  }
`
