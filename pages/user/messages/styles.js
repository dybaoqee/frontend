import styled from 'styled-components'
import {headerMobileMedia} from 'constants/media'
import * as constants from 'constants/dimensions'
import * as colors from 'constants/colors'

export default styled.div`
  box-sizing: border-box;
  display: flex;
  margin: 0 auto;
  max-width: 1100px;
  padding: 60px 20px;

  @media ${headerMobileMedia} {
    display: flex;
    padding: 10px;
    min-width: 100%;
    flex-direction: column;
  }
`

export const ConversationContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 14px;
  max-height: calc(80vh - ${constants.desktopHeaderHeight}px);
  overflow: scroll;
`

export const Conversation = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 104px;
  border-radius: 6px;
  border: 1px solid ${colors.lightestGray};
  display: grid;
  grid-template-columns: auto 1fr 1fr minmax(300px, 1fr);
  grid-column-gap: 18px;
  align-items: center;
  cursor: pointer;
  padding: 18px;

  :hover {
    background: ${colors.grayf0};
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.05);
  }

  p {
    font-size: 14px;
    letter-spacing: -0.1px;
    line-height: 24px;
    margin: 0;
  }

  .listing-info,
  span {
    color: ${colors.mediumDarkGray};
    font-size: 12px;
    letter-spacing: -0.1px;
    line-height: 17px;
  }

  .listing-info {
    span {
      margin-left: 4px;
    }
  }

  @media ${headerMobileMedia} {
    grid-template-columns: 1fr;
    > :first-child {
      display: none;
    }
  }
`
