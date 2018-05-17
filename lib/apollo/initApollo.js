import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createHttpLink} from 'apollo-link-http'
import {onError} from 'apollo-link-error'
import {withClientState} from 'apollo-link-state'
import {ApolloLink} from 'apollo-link'
import cookie from 'js-cookie'
import fetch from 'isomorphic-unfetch'
import _ from 'lodash'
import * as AbsintheSocket from '@absinthe/socket'
import {createAbsintheSocketLink} from '@absinthe/socket-apollo-link'
import {Socket as PhoenixSocket} from 'phoenix'
import {hasSubscription} from '@jumpn/utils-graphql'
import requestLink from 'lib/apollo/links/request'

let apolloClient = null
const API_HOST = process.env.REACT_APP_API_URL

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function customFetch(uri, options) {
  const optionsWithToken = {
    ...options,
    headers: {
      ...options.headers,
      authorization: `Token ${cookie.get('jwt')}`
    }
  }
  return fetch(uri, optionsWithToken)
}

function createLink() {
  const server = _.isUndefined(process.browser)
  const link = createHttpLink({
    uri: `${API_HOST}/graphql_api`,
    credentials: 'same-origin',
    fetch: customFetch
  })
  const splittedLink = () =>
    new ApolloLink.split(
      (operation) => hasSubscription(operation.query),
      createAbsintheSocketLink(
        AbsintheSocket.create(
          new PhoenixSocket(`${API_HOST.replace('http://', 'ws://')}/socket`)
        )
      ),
      link
    )

  return server ? link : splittedLink()
}

function create(initialState) {
  const cache = new InMemoryCache().restore(initialState || {})

  const client = new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([
      onError(({graphQLErrors, networkError}) => {
        if (graphQLErrors) {
          graphQLErrors.map(({message, locations, path}) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          )
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

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }
  return apolloClient
}
