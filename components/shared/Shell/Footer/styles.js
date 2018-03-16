import * as colors from 'constants/colors'
import {headerMobileMedia, footerMobileMedia} from 'constants/media'
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
    font-size: 16px;
    text-decoration: none;

    &.icon {
      font-size: 20px;
    }
  }

  img {
    width: 110px;
  }

  @media ${headerMobileMedia} {
    img {
      width: 100px;
    }

    a {
      font-size: 12px;
    }
  }

  @media ${footerMobileMedia} {
    flex-direction: column;
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
`

export const EmCasaContact = styled.div`
  display: flex;
  a {
    align-self: center;
    margin-left: 30px;
    &.icon {
      color: ${colors.blue.medium};
      top: 0;
    }
  }

  @media ${headerMobileMedia} {
    flex-direction: column;

    .icons {
      display: flex;
      justify-content: flex-end;
    }

    a {
      order: 2;
      margin-left: 16px;
    }

    a[href='/jobs'] {
      display: none;
    }
  }

  @media ${footerMobileMedia} {
    .icons {
      justify-content: space-evenly;
    }

    a {
      margin-left: 0px;
    }
  }
`
