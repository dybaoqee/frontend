import React, {Component} from 'react'
import EmCasaButton from 'components/shared/Common/Buttons'
import Container from './styles'
import {Mutation} from 'react-apollo'
import {SEND_MESSAGE} from 'graphql/messenger/mutations'
import {GET_LISTING_MESSAGES} from 'graphql/messenger/queries'

export default class ConversationBox extends Component {
  constructor(props) {
    super(props)
    this.textAreaRef = React.createRef()
    this.state = {
      messageToBeSent: ''
    }
    this.id = 0
  }

  onChangeMessage = (e) => this.setState({messageToBeSent: e.target.value})

  render() {
    const {listing: {id}, receiver} = this.props
    const {messageToBeSent} = this.state

    return (
      <Mutation mutation={SEND_MESSAGE}>
        {(sendMessage) => (
          <Container>
            <textarea onChange={this.onChangeMessage} ref={this.textAreaRef} />
            <div>
              <EmCasaButton
                light
                disabled={messageToBeSent.length === 0}
                onClick={() => {
                  sendMessage({
                    variables: {
                      listingId: id,
                      receiverId: receiver,
                      message: messageToBeSent
                    },
                    update: (proxy, {data: {sendMessage}}) => {
                      // Read the data from our cache for this query.
                      let data = proxy.readQuery({
                        query: GET_LISTING_MESSAGES,
                        variables: {
                          listingId: id,
                          senderId: receiver
                        }
                      })
                      data.listingUserMessages.messages.push(sendMessage)

                      proxy.writeQuery({
                        query: GET_LISTING_MESSAGES,
                        data,
                        variables: {
                          listingId: id,
                          senderId: receiver
                        }
                      })
                    }
                  })
                  this.textAreaRef.current.value = ''
                }}
              >
                Enviar mensagem
              </EmCasaButton>
            </div>
          </Container>
        )}
      </Mutation>
    )
  }
}
