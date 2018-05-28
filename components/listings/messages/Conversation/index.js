import {Component, Fragment} from 'react'
import _ from 'lodash'
import {Query} from 'react-apollo'
import {GET_USER_INFO} from 'graphql/user/queries'

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
      <Query
        query={GET_USER_INFO}
        variables={{
          id: currentUser.id
        }}
      >
        {({data: {userProfile}}) => {
          return (
            <Container>
              {userProfile && (
                <Fragment>
                  <ConversationContainer>
                    <ConversationBox
                      listing={listing}
                      receiver={receiver}
                      currentUser={currentUser}
                    />
                    <StyledAvatar user={userProfile} />
                  </ConversationContainer>

                  <MessagesContainer>
                    {messages &&
                      _.orderBy(messages, ['insertedAt'], ['desc']).map(
                        (message) => (
                          <Message
                            key={message.id}
                            message={message}
                            currentUser={userProfile}
                          />
                        )
                      )}
                  </MessagesContainer>
                </Fragment>
              )}
            </Container>
          )
        }}
      </Query>
    )
  }
}
