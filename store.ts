declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :any
    process ?:Object
  }
}

import {
  createStore,
  compose
} from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import { connect } from 'pwa-helpers/connect-mixin.js'
import storage from 'localforage/src/localforage'
import reducer from './reducer.js'

const persistConfig = {
  key: 'redux',
  blacklist: ['view'],
  storage
}

const persistedReducer = persistCombineReducers(persistConfig, reducer)

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  persistedReducer,
  composeEnhancers()
)

export const persistor = persistStore(store)

export default connect(store)
