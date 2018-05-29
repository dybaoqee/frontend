import styled from 'styled-components'
import * as colors from 'constants/colors'
import {headerMobileMedia} from 'constants/media'

export default styled.div`
  box-sizing: border-box;
  display: flex;
  margin-bottom: 10px;
`

export const MessageContainer = styled.div`
  box-sizing: border-box;
  padding: 14px 20px;
  font-size: 14px;
  color: ${colors.gray4a};
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    margin: 0;
    padding-bottom: 10px;
  }

  ${({sender}) => {
    if (sender) {
      return `
      background: ${colors.grayf0};
      border: 1px solid ${colors.lightestGray};
      margin-right: 15px;
      order: -1;
      :after, :before {
      	left: 100%;
      	top: 30px;
      	border: solid transparent;
      	content: " ";
      	height: 0;
      	width: 0;
      	position: absolute;
      	pointer-events: none;
      }

      :after {
      	border-color: rgba(136, 183, 213, 0);
      	border-left-color: ${colors.grayf0};
      	border-width: 10px;
      	margin-top: -10px;
      }
      :before {
      	border-color: rgba(194, 225, 245, 0);
      	border-left-color: ${colors.lightestGray};
      	border-width: 11px;
      	margin-top: -11px;
      }
      `
    }

    return `
      background: ${colors.blue.light};
      border: 1px solid ${colors.blue.light2};
      margin-left: 15px;
      :after, :before {
      	right: 100%;
      	top: 30px;
      	border: solid transparent;
      	content: " ";
      	height: 0;
      	width: 0;
      	position: absolute;
      	pointer-events: none;
      }

      :after {
      	border-color: rgba(136, 183, 213, 0);
      	border-right-color: ${colors.blue.light};
      	border-width: 10px;
      	margin-top: -10px;
      }
      :before {
      	border-color: rgba(194, 225, 245, 0);
      	border-right-color: ${colors.blue.light2};
      	border-width: 11px;
      	margin-top: -11px;
      }

    `
  }};

  @media ${headerMobileMedia} {
    :after,
    :before {
      top: 15px;
    }
  }
`
