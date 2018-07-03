import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createHttpLink} from 'apollo-link-http'
import {onError} from 'apollo-link-error'
import {withClientState} from 'apollo-link-state'
import {ApolloLink} from 'apollo-link'
import fetch from 'isomorphic-unfetch'
import _ from 'lodash'
import * as AbsintheSocket from '@absinthe/socket'
import {createAbsintheSocketLink} from '@absinthe/socket-apollo-link'
import {Socket as PhoenixSocket} from 'phoenix'
import {hasSubscription} from '@jumpn/utils-graphql'
import requestLink from 'lib/apollo/links/request'
import cookie from 'js-cookie'

let apolloClient = null
const API_HOST = process.env.REACT_APP_API_URL

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function createLink() {
  const server = _.isUndefined(process.browser)
  const httpLink = createHttpLink({
    uri: `${API_HOST}/graphql_api`,
    credentials: 'same-origin'
  })

  const socketLink = () =>
    createAbsintheSocketLink(
      AbsintheSocket.create(
        new PhoenixSocket(
          `${API_HOST.replace('http://', 'ws://').replace(
            'https://',
            'wss://'
          )}/socket`,
          {
            params: {Authorization: `Token ${cookie.get('jwt')}`}
          }
        )
      )
    )

  const splittedLink = () =>
    new ApolloLink.split(
      (operation) => hasSubscription(operation.query),
      socketLink(),
      httpLink
    )

  return server ? httpLink : splittedLink()
}

function create(initialState) {
  const cache = new InMemoryCache().restore(initialState || {})

  const client = new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([
      onError(({graphQLErrors, networkError}) => {
        if (graphQLErrors) {
          graphQLErrors.map(({message, locations, path}) => {
            console.log(locations)
            console.log('-------------------')
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          })
        }
        if (networkError) {
          console.log(`[Network error]: ${networkError}`)
        }
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

  return client
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }
  const loggedIn = cookie.get('loggedIn')

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  // If user just logged in re-create aollo client to update token
  if (loggedIn) {
    cookie.remove('loggedIn')
    apolloClient = create(initialState)
  }

  return apolloClient
}
