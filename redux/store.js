import { createStore } from 'redux'
import devToolsEnhancer from 'remote-redux-devtools';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducer from './reducers'

const persistConfig = {
  key: 'step',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducer)

/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR 
*/
const makeStore = (initialState, options) => {
  const store = createStore(
    persistedReducer,
    devToolsEnhancer()
  )
  if (!options.isServer) {
    persistStore(store)
  }
  return store
}

export default makeStore
