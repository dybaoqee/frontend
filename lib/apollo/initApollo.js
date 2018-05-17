import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {HttpLink} from 'apollo-link-http'
import {onError} from 'apollo-link-error'
import {withClientState} from 'apollo-link-state'
import {ApolloLink, split} from 'apollo-link'
import fetch from 'isomorphic-unfetch'
import {WebSocketLink} from 'apollo-link-ws'
import {getMainDefinition} from 'apollo-utilities'

import requestLink from 'lib/apollo/links/request'
import absintheSocketLink from 'lib/apollo/links/absinthe-socket-link'

let apolloClient = null
const API_HOST = process.env.REACT_APP_API_URL
// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function createLink() {
  const httpLink = new HttpLink({
    uri: `${API_HOST}/graphql_api`,
    credentials: 'same-origin'
  })

  if (!process.browser) {
    return httpLink
  } else {
    const wsLink = new WebSocketLink({
      uri: 'ws://localhost:4000/socket/websocket',
      options: {
        reconnect: true
      }
    })

    const link = split(
      // split based on operation type
      ({query}) => {
        const {kind, operation} = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      httpLink
    )

    return link
  }
}

function create(initialState) {
  const cache = new InMemoryCache().restore(initialState || {})

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent

  return new ApolloClient({
    link: ApolloLink.from([
      onError(({graphQLErrors, networkError}) => {
        if (graphQLErrors)
          graphQLErrors.map(({message, locations, path}) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          )
        if (networkError) console.log(`[Network error]: ${networkError}`)
      }),
      requestLink,
      withClientState({
        defaults: {
          isConnected: true
        },
        resolvers: {
          Mutation: {
            updateNetworkStatus: (_, {isConnected}, {cache}) => {
              cache.writeData({data: {isConnected}})
              return null
            }
          }
        },
        cache
      }),
      createLink()
    ]),
    cache
  })
}

export default function initApollo(initialState, token) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, token)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, token)
  }
  return apolloClient
}
