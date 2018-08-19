import {Component, Fragment} from 'react'
import orderBy from 'lodash/orderBy'

import Container, {
  ConversationContainer,
  MessagesContainer,
  StyledAvatar
} from './styles'
import ConversationBox from 'components/listings/messages/Conversation/ConversationBox'
import Message from 'components/listings/messages/Conversation/Message'

export default class Conversation extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.subscribeToNewMessages()
  }

  render() {
    const {currentUser, messages, listing, receiver} = this.props

    return (
      <Container>
        <Fragment>
          <ConversationContainer>
            <ConversationBox
              listing={listing}
              receiver={receiver}
              currentUser={currentUser}
            />
            <StyledAvatar user={currentUser} />
          </ConversationContainer>

          <MessagesContainer>
            {messages &&
              orderBy(messages, ['insertedAt'], ['desc']).map((message) => (
                <Message
                  key={message.insertedAt}
                  message={message}
                  currentUser={currentUser}
                />
              ))}
          </MessagesContainer>
        </Fragment>
      </Container>
    )
  }
}
