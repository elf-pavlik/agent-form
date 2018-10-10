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
import storage from 'localforage/src/localforage'

import { connect } from 'pwa-helpers/connect-mixin.js'

import config from './config.js'
import i18n from './labels.js'


const SET_LANGUAGE = 'SET_LANGUAGE'

const initialLabels = i18n[config.language]

function labels (state = initialLabels, action) {
  switch (action.type) {
    case SET_LANGUAGE:
      return i18n[action.language]
    default:
      return state
  }
}

function language (state = config.language, action) {
  switch (action.type) {
    case SET_LANGUAGE:
      return action.language
    default:
      return state
  }
} 

const persistConfig = {
  key: 'redux',
  storage
}

const reducer = persistCombineReducers(persistConfig, {
  labels,
  language
})

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers()
)

persistStore(store)



export default connect(store)
