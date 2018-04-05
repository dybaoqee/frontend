import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'

export default styled.div`
  max-width: 100vw;
  padding: 100px 0px 30px 0px;
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
  margin-top: 100px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 30px;
  justify-content: center;
  padding: 0 120px;

  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${colors.blue.medium};
    font-weight: 300;
    font-size: 30px;
    margin-top: 0;
  }

  ${({numbers}) => {
    let numberRules = ''
    numbers.forEach(
      (number, index) =>
        (numberRules =
          numberRules +
          `> :nth-child(${index + 1}):before{
      content: "${number + 1}";
      border: 1px solid blue;
      font-size: 30px;
      font-weight: 300;
      color: ${colors.blue.medium};
      border: 1px solid ${colors.blue.medium};
      width: 50px;
      height: 50px;
      border-radius: 100%;
      left: calc(50% - 25px);
      display: block;
      margin: auto;
      margin-bottom: 24px;

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
