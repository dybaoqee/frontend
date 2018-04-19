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
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;

  @media ${mobileMedia} {
    justify-content: flex-start;
  }
`

export const ImageContainer = styled.div`
  box-sizing: border-box;
  background-position: center;
  background-size: cover;
  border-radius: 8px;
  float: left;
  height: 200px;
  margin-left: 10px;
  position: relative;
  width: 290px;
  margin-top: 4px;

  @media ${mobileMedia} {
    width: calc(100% - 20px);
    margin-top: 0;
  }
`

export const ListingInfo = styled.div`
  bottom: 10px;
  color: white;
  left: 10px;
  position: absolute;

  span {
    clear: both;
    display: block;
    font-size: 18px;
  }

  span.address {
    font-size: 13px;
    margin-bottom: 1px;
    margin-top: 3px;
  }

  span.neighborhood {
    font-size: 10px;
  }
`
