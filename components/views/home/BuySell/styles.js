import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import styled from 'styled-components'

export default styled.div`
  border-top: 1px solid ${colors.lightGray};
  display: flex;
  height: 300px;
  padding: 0;
  > div {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    > a {
      border: 1px solid ${colors.blue};
      border-radius: 6px;
      color: ${colors.blue};
      padding: 15px 30px;
      text-decoration: none;
    }
  }

  @media ${mobileMedia} {
    max-width: 100%;
  }
`

export const Title = styled.h3`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 30px;
  margin-top: 0;
  text-align: center;

  @media ${mobileMedia} {
    max-width: calc(100% - 140px);
  }
`
