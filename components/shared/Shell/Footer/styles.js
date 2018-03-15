import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import styled from 'styled-components'

export default styled.footer`
  align-items: center;
  background: ${colors.offWhite};
  border-top: 1px solid ${colors.lightGray};
  display: flex;
  justify-content: space-between;
  padding: 20px;
  flex-wrap: wrap;

  a {
    color: ${colors.mediumDarkGray};
    text-decoration: none;
  }

  img {
    width: 110px;
  }

  @media ${mobileMedia} {
    img {
      width: 100px;
    }
  }
`

export const EmCasaInfo = styled.div`
  display: flex;
  img {
    margin-right: 20px;
  }

  > a {
    align-self: center;
  }

  @media ${mobileMedia} {
    align-items: flex-end;
    flex-direction: column;
  }
`

export const EmCasaContact = styled.div`
  display: flex;
  a {
    align-self: center;
    margin-left: 30px;
    &.icon {
      color: ${colors.blue.medium};
      font-size: 20px;
      top: 0;
    }
  }

  @media ${mobileMedia} {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    a {
      order: 2;
      justify-self: center;

      &.icon {
        margin-left: 30px;
      }
    }
  }
`
