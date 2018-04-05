import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost'
import fetch from 'isomorphic-unfetch'
import cookie from 'js-cookie'

let apolloClient = null
const API_HOST = process.env.REACT_APP_API_URL
// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create(initialState) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: `${API_HOST}/graphql_api`, // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`,
      fetch: customFetch
    }),
    cache: new InMemoryCache().restore(initialState || {})
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
