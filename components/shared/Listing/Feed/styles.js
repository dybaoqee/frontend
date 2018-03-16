import {listingFeed, mobileMedia} from 'constants/media'
import styled, {css} from 'styled-components'

export default styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(auto-fit, 282px);
  grid-gap: 20px;
  justify-content: center;
  position: relative;
  padding: 60px 20px;

  @media ${listingFeed} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${mobileMedia} {
    grid-template-columns: 1fr;
  }

  ${({related}) =>
    related &&
    css`
      margin-top: 60px;
      > :first-child ::before {
        content: 'VEJA TAMBÉM:';
        position: absolute;
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
        top: -45px;
      }
    `};
`
