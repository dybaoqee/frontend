import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import styled from 'styled-components'

export default styled.div`
  box-sizing: border-box;
  justify-content: space-between;
  align-items: flex-start;
  display: flex;
  margin: 30px auto 40px;
  max-width: 960px;

  div.description {
    box-sizing: border-box;
    width: calc(100% - 420px);
    margin: 0 20px 40px;
    max-width: 100%;

    .description__text {
      margin: 0;
      :last-of-type {
        padding-bottom: 36px;
        border-bottom: 1px solid ${colors.mediumGray};
      }
    }

    h6 {
      font-size: 12px;
      text-transform: uppercase;
    }

    p,
    h1 {
      color: ${colors.gray4a};
      font-size: 20px;
      font-weight: 300;
      &.street {
        font-weight: 400;
        margin-bottom: 42px;
        font-size: 22px;
        line-height: 30px;
      }
    }
  }

  @media ${mobileMedia} {
    flex-direction: column;
    width: 100vw;

    div.description {
      width: calc(100vw - 40px);
    }
  }
`

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${mobileMedia} {
    margin: 0 auto;
  }
`

export const ListingInfo = styled.div`
  padding-bottom: 36px;
  border-bottom: 1px solid ${colors.mediumGray};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  p {
    margin: 0;
  }
`
