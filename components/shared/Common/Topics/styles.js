import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia, headerMobileMedia} from 'constants/media'

export default styled.div`
  max-width: 100vw;
  padding: 64px 0px 74px 0px;
  position: relative;
`

export const Title = styled.h2`
  position: relative;
  font-weight: 300;
  font-size: 44px;
  max-width: 100%;
  text-align: center;
  margin: 0;
`

export const TopicsContainer = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  justify-content: center;

  > * {
    position: relative;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    box-sizing: border-box;
    font-weight: normal;
    width: 100%;
    font-family: 'Open Sans';
    font-size: 18px;
    line-height: 28px;
    text-align: center;
    padding: 0 20%;
    font-weight: normal;
  }

  :before {
    content: '';
    width: 100%;
    position: absolute;
    top: 89px;
    height: 3px;
    background: ${colors.blue.light};
    z-index: -1;

    @media ${headerMobileMedia} {
      display: none;
    }
  }

  > *:not(:last-child):after {
    content: '';
    position: absolute;
    top: 25px;
    left: 50%;
    width: 100%;
    height: 3px;
    background: ${colors.blue.medium};
    display: block;
    z-index: -1;

    @media ${headerMobileMedia} {
      display: none;
    }
  }

  ${({numbers}) => {
    let numberRules = ''
    numbers.forEach(
      (number, index) =>
        (numberRules =
          numberRules +
          `> :nth-child(${index + 1}):before{
      content: "${number + 1}";
      font-size: 30px;
      font-family: "Open Sans";
      font-weight: 500;
      background: ${colors.blue.medium};
      color: white;
      width: 56px;
      height: 56px;
      border-radius: 100%;
      margin: auto;
      margin-bottom: 22px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;


  }\n`)
    )
    return numberRules
  }};

  @media ${mobileMedia} {
    grid-template-columns: 1fr;
    align-content: center;
    padding: 0 20px;
  }
`
