import styled from 'styled-components'

import {headerMobileMedia, mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export default styled.div`
  padding: 50px 0 100px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${colors.lightestGray};
  font-family: 'Open Sans';

  * {
    box-sizing: border-box;
  }
  h2 {
    text-transform: uppercase;
    height: 17px;
    width: 100%;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.4px;
    line-height: 17px;
    text-align: center;
    padding: 10px;
    margin-bottom: 60px;
  }

  h3 {
    width: 100%;
    font-size: 32px;
    font-weight: 300;
    letter-spacing: -0.3px;
    line-height: 48px;
    text-align: center;
    margin: auto;
    padding: 0 40px;
    margin-bottom: 20px;
  }

  button {
    box-sizing: border-box;
    width: 384px;
    margin: auto;
    @media ${mobileMedia} {
      max-width: 80%;
    }
  }

  svg {
    width: 30px !important;
    height: 30px;

    transform: rotate(0.001deg);
  }

  p.warning {
    width: 588px;
    color: ${colors.green.medium};
    font-size: 16px;
    line-height: 28px;
    text-align: center;
    margin: 0 auto 81px;
    padding: 0 40px;

    @media ${headerMobileMedia} {
      width: 100%;
    }
  }
`

export const Header = styled.div`
  height: 102px;
  position: relative;
  * {
    box-sizing: border-box;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  h1 {
    position: absolute;
    top: -2px;
    z-index: 1;
    color: white;
    font-weight: 300;
    font-size: 36px;
    letter-spacing: -0.4px;
    line-height: 60px;
    text-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.4);
    width: 100%;
    text-align: center;
    padding: 20px;
    margin: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const BenefitsContainer = styled.div`
  display: grid;
  grid-template-columns: 240px 240px 240px;
  justify-content: center;
  grid-gap: 30px;
  margin: 0 120px 50px;

  @media ${headerMobileMedia} {
    margin: 0 40px 90px;
    grid-gap: 80px;
    grid-template-columns: 240px 240px;
  }
  @media ${mobileMedia} {
    margin: 0 40px 90px;
    grid-template-columns: 240px;
  }
`
export const Benefit = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;

  [data-icon='globe'] {
    path {
      color: ${colors.blue.medium};
    }
  }
  [data-icon='gift'] {
    path {
      color: ${colors.red.medium};
    }
  }
  [data-icon='bolt'] {
    path {
      color: ${colors.orange.medium};
    }
  }
  [data-icon='usd-circle'] {
    path {
      color: ${colors.green.medium};
    }
  }
  [data-icon='paste'] {
    path {
      color: ${colors.mediumGray};
    }
  }
  [data-icon='gavel'] {
    path {
      color: ${colors.text};
    }
  }
  div {
    width: 78px;
    height: 78px;
    border-radius: 100%;
    background: ${colors.blue.light};
    margin: auto;
  }

  p {
    width: 240px;
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    color: ${colors.gray4a};
  }
`

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
export const Card = styled.div`
  height: 480px;
  width: 432px;
  border-radius: 12px;
  box-shadow: inset 0 2px 2px 0 #ffffff, 0 8px 20px 0 rgba(38, 38, 38, 0.15);
  overflow: hidden;
  margin: 0 24px 24px 24px;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50% 50%;

  div:first-of-type {
    background-color: ${colors.blue.light};
  }

  h5 {
    width: 100%;
    font-size: 26px;
    font-weight: 300;
    line-height: 36px;
    text-align: center;
    margin: 30px 0;
    padding: 0 40px;
  }

  p {
    width: 100%;
    color: ${colors.mediumDarkGray};
    font-size: 16px;
    line-height: 28px;
    text-align: center;
    padding: 0 40px;
  }
`
