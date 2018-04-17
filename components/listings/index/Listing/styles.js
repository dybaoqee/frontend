import styled from 'styled-components'
import {mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export default styled.div`
  background: ${({highlight}) => (highlight ? '#f5f5f5' : 'white')};
  border-bottom: 1px solid ${colors.lightGray};
  cursor: pointer;
  overflow: hidden;
  padding-bottom: 20px;
  padding-top: 20px;
  position: relative;
  width: 100%;

  :hover {
    background: #f5f5f5;
    cursor: pointer;
  }

  span.matterport {
    background: rgba(240, 50, 50, 1);
    color: white;
    font-size: 9px;
    font-stretch: condensed;
    font-weight: bold;
    padding: 4px 30px;
    position: absolute;
    right: -35px;
    top: 24px;
    text-transform: uppercase;
    transform: rotate(45deg);
  }
`
export const LikeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;

  @media ${mobileMedia} {
    justify-content: flex-start;
  }
`
