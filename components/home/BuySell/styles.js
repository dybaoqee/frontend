import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import styled from 'styled-components'

export default styled.div`
  box-sizing: border-box;
  border-top: 1px solid ${colors.lightGray};
  border-bottom: 1px solid ${colors.lightGray};
  display: grid;
  grid-template-columns: repeat(2, auto);
  > div {
    box-sizing: border-box;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 60px;
  }

  > div:first-of-type {
    border-right: 1px solid ${colors.lightGray};
  }

  @media ${mobileMedia} {
    grid-template-columns: 1fr;

    > div {
      padding: 30px;
    }

    > div:first-of-type {
      border-right: none;
      border-bottom: 1px solid ${colors.lightGray};
    }
  }
`

export const Title = styled.h3`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 30px;
  margin-top: 0;
  text-align: center;
`
