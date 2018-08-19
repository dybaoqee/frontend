import {Component, Fragment} from 'react'
import {Query} from 'react-apollo'
import {GET_USER_CONVERSATIONS} from 'graphql/messenger/queries'
import {redirectIfNotAuthenticated} from 'lib/auth'
import Link from 'next/link'
import Container, {ConversationContainer, Conversation} from './styles'
import Head from 'next/head'
import {GET_USER_INFO} from 'graphql/user/queries'
import UserAvatar from 'components/shared/User/Avatar'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faLocation from '@fortawesome/fontawesome-pro-light/faMapMarkerAlt'
import moment from 'moment'
import truncate from 'lodash/truncate'

class ListingMessages extends Component {
  static async getInitialProps(context) {
    if (redirectIfNotAuthenticated(context)) {
      return {}
    }

    return {}
  }

  showConversations = (conversations, userProfile) => {
    if (!conversations) return null

    if (conversations.length === 0) {
      return <div>Você não possui mensagens.</div>
    }

    const filteredConversations = conversations.filter(
      (conversation) => conversation.listing
    )

    return filteredConversations.map(
      ({id, participant1, participant2, listing, messages}) => (
        <Link
          key={id}
          href={
            '/listings/messages' + participant1.role === 'admin'
              ? `?userId=${participant2.id}`
              : ''
          }
          as={
            `/imoveis/${listing.id}/mensagens` +
            (participant1.role === 'admin' ? `/${participant2.id}` : '')
          }
        >
          <a className="GTAG">
            <Conversation>
              <UserAvatar
                user={
                  participant1.id === userProfile.id
                    ? participant2
                    : participant1
                }
              />
              <div className="participant-info">
                <p>
                  {participant1.id === userProfile.id
                    ? participant2.name
                    : participant1.name}
                </p>
                <div className="listing-info">
                  <FontAwesomeIcon icon={faLocation} />
                  <span>{`${listing.address.street}, ${
                    listing.address.neighborhood
                  }`}</span>
                </div>
              </div>
              <div>
                <span>
                  {messages
                    ? moment(messages[0].insertedAt)
                        .subtract(3, 'hours')
                        .format('h:mm:ss a, DD MMM YYYY')
                    : ''}
                </span>
              </div>
              <div>
                <p>
                  {messages ? truncate(messages[0].message, {length: 80}) : ''}
                </p>
              </div>
            </Conversation>
          </a>
        </Link>
      )
    )
  }

  render() {
    const {user} = this.props
    const seoTitle = 'EmCasa | Minhas Mensagens'

    return (
      <Query
        query={GET_USER_INFO}
        variables={{
          id: user.id
        }}
      >
        {({data: {userProfile}}) => (
          <Fragment>
            <Head>
              <title>{seoTitle}</title>
              <meta name="twitter:title" content={seoTitle} />
            </Head>
            {userProfile && (
              <Query query={GET_USER_CONVERSATIONS}>
                {({data}) => (
                  <Container>
                    <ConversationContainer>
                      {this.showConversations(
                        data.userChannels && data.userChannels,
                        userProfile
                      )}
                    </ConversationContainer>
                  </Container>
                )}
              </Query>
            )}
          </Fragment>
        )}
      </Query>
    )
  }
}

export default ListingMessages
