import styled from 'styled-components'
import {headerMobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export default styled.div`
  position: relative;
  cursor: pointer;
  margin-left: 14px;
  width: 50px;
  display: flex;
  justify-content: center;

  ul {
    box-sizing: border-box;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 290px;
    border: 1px solid ${colors.lightestGray};
    border-radius: 0 0 6px 6px;
    background-color: white;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.1);
    left: -240px;
    top: calc(100% + 18px);
    display: ${({opened}) => (opened ? 'block' : 'none')};

    li {
      height: 52px;
      display: flex;
      align-items: center;
      position: relative;

      a {
        padding-left: 6%;
        margin: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
      }

      :hover {
        background: ${colors.offWhite};
      }

      :not(:last-of-type) {
        :after {
          content: '';
          width: 85%;
          margin-left: 6%;
          display: block;
          position: absolute;
          height: 3px;
          bottom: 0;
          box-shadow: inset 0 -1px 0 0 #f0f0f0;
        }
      }
    }
  }
  :hover {
    :after {
      content: '';
      width: 100%;
      height: 3px;
      background: ${colors.blue.dark};
      position: absolute;
      top: calc(100% + 15px);
    }
  }

  @media ${headerMobileMedia} {
    justify-content: flex-start;
    width: 100%;
    margin-top: 14px;
    display: block;

    ul {
      position: relative;
      left: 0;
      width: 100%;
      border: none;
      box-shadow: none;
      margin-top: 10px;

      li {
        height: 46px;

        a {
          border: none;
          margin: 0 !important;
        }

        :not(:last-of-type) {
          :after {
            display: none;
          }
        }
      }
    }

    :hover {
      :after {
        display: none;
      }
    }
  }
`

export const Icon = styled.div`
  width: 35px;
  height: 35px;
  background-color: #f0f0f0;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  position: relative;

  svg {
    width: 26px !important;
    height: 26px;

    path {
      fill: ${colors.mediumGray};
    }
  }
`
