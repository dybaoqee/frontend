import styled from 'styled-components'
import {headerMobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export const ReceiverInfo = styled.div`
  margin-top: 24px;
  box-sizing: border-box;
  border: 1px solid ${colors.lightestGray};
  border-radius: 6px;
  overflow: hidden;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;

  > p {
    text-align: center;
    box-sizing: border-box;
    font-size: 16px;
    margin: 10px 0;
  }

  > div.user-detail {
    color: ${colors.mediumDarkGray};
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 13px !important;
      height: 13px;
      margin-right: 3px;
    }
  }
`

export const ListingInfo = styled.div`
  box-sizing: border-box;
  border: 1px solid ${colors.lightestGray};
  border-radius: 6px;
  overflow: hidden;
`

export const ListingImage = styled.div`
  background-image: url("${({image}) => image}");
  background-position: center;
  background-size: cover;
  height: 180px;
  width: 100%;
`

export const ListingDetails = styled.div`
  color: ${colors.mediumDarkGray};
  font-size: 12px;
  margin: 16px 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 13px !important;
    height: 13px;
    margin-right: 3px;
  }
`

export default styled.div`
  box-sizing: border-box;

  @media ${headerMobileMedia} {
    ${ReceiverInfo} {
      margin: 4px 0;
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto auto auto;
      height: auto;
      justify-items: start;
      grid-column-gap: 8px;
      padding: 8px;

      > :first-child {
        grid-row: 2;
      }

      p {
        grid-column: 2;
        margin: 0;
      }

      div.user-detail {
        grid-column: 2;
      }
    }

    ${ListingImage} {
      display: none;
    }

    ${ListingDetails} {
      margin: 5px;
    }
  }
`
