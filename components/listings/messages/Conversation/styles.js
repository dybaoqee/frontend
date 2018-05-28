import styled from 'styled-components'
import {headerMobileMedia} from 'constants/media'
import UserAvatar from 'components/shared/User/Avatar'

export const StyledAvatar = styled(UserAvatar)``

export const MessagesContainer = styled.div`
  box-sizing: border-box;
  margin-top: 20px;
  overflow: scroll;
`

export const ConversationContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 20px;

  @media ${headerMobileMedia} {
    display: flex;
    > :last-child {
      display: none;
    }
  }
`

export default styled.div`
  box-sizing: border-box;
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 3fr;
  margin-left: 120px;
  @media ${headerMobileMedia} {
    margin-left: 0;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`
