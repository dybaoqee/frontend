import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'

export default styled.div`
  max-width: 100vw;
  padding: 64px 0px 74px 0px;
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
  grid-gap: 30px;
  justify-content: center;
  padding: 0 120px;

  span {
    height: 28px;
    width: 100%;
    color: ${colors.mediumGray};
    font-family: 'Open Sans';
    font-size: 14px;
    line-height: 28px;
    text-align: center;
    display: block;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    box-sizing: border-box;
    font-weight: normal;
    height: 28px;
    width: 100%;
    font-family: 'Open Sans';
    font-size: 20px;
    line-height: 28px;
    text-align: center;
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
      font-weight: 500;
      color: ${colors.blue.medium};
      border: 2px solid ${colors.blue.medium};
      width: 50px;
      height: 50px;
      border-radius: 100%;
      left: calc(50% - 25px);
      display: block;
      margin: auto;
      margin-bottom: 22px;

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
