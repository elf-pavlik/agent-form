declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :any
    process ?:Object
  }
}

import {
  createStore,
  compose,
  combineReducers
} from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'localforage/src/localforage'
import reducer from './reducer'

const persistConfig = {
  key: 'redux',
  blacklist: ['view'],
  storage
}

// const persistedReducer = persistCombineReducers(persistConfig, reducer)

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  // persistedReducer,
  combineReducers(reducer),
  composeEnhancers()
)

// export const persistor = persistStore(store)

export default store