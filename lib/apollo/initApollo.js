import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createHttpLink} from 'apollo-link-http'
import {onError} from 'apollo-link-error'
import {withClientState} from 'apollo-link-state'
import {ApolloLink} from 'apollo-link'
import fetch from 'isomorphic-unfetch'
import requestLink from 'lib/apollo/links/request'
import cookie from 'js-cookie'
import {removeCookie} from 'lib/session'
import Router from 'next/router'

let apolloClient = null
const API_HOST = process.env.REACT_APP_API_URL
const APOLLO_ENGINE = process.env.APOLLO_ENGINE

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function createLink() {
  const links = [
    createHttpLink({
      uri: APOLLO_ENGINE || `${API_HOST}/graphql_api`,
      credentials: 'same-origin'
    })
  ]
  if (process.browser && process.env.NODE_ENV === 'development') {
    links.unshift(require('apollo-link-logger').default)
  }

  return ApolloLink.from(links)
}

function create(initialState, jwt) {
  const userRole = cookie.get('userRole')
  const cache = new InMemoryCache().restore(initialState || {})

  const client = new ApolloClient({
    ssrMode: true,
    connectToDevTools: process.browser,
    link: ApolloLink.from([
      onError(({graphQLErrors, networkError, operation, forward, response}) => {
        if (graphQLErrors) {
          graphQLErrors.map(({message, locations, path}) => {
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          })

          //Intercepting 401 error and redirecting to login page
          const codes = graphQLErrors.map((error) => error.code)
          if (codes.indexOf(401) > -1) {
            if (process.browser) {
              removeCookie('jwt')
              removeCookie('currentUserId')
              removeCookie('userRole')
              localStorage.removeItem('user')
              Router.push('/auth/login')
            } else {
              global.res.cookie('resetAuth', 1)
              global.res.redirect('/auth/login')
            }
          }
        }
        if (networkError) {
          console.log(`[Network error]: ${networkError}`)
        }
      }),
      requestLink(jwt),
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
    cache,
    defaultOptions: {
      query: {
        fetchPolicy: (userRole && userRole === 'admin') ? 'network-only' : 'cache-first'
      }
    }
  })

  return client
}

export default function initApollo(initialState, jwt) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, jwt)
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
