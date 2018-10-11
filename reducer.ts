import config from './config.js'
import i18n from './labels.js'


import {
  SET_LANGUAGE,
  NAVIGATE
} from './actions.js'

const initial = {
  language: config.language,
  labels: i18n[config.language],
  view: 'transactions'

}

function labels (state = initial.labels, action) {
  switch (action.type) {
    case SET_LANGUAGE:
      return i18n[action.language]
    default:
      return state
  }
}

function language (state = initial.language, action) {
  switch (action.type) {
    case SET_LANGUAGE:
      return action.language
    default:
      return state
  }
} 

function view (state = initial.view, action) {
  switch (action.type) {
    case NAVIGATE:
      return action.view
    default:
      return state
  }
}

export default {
  labels,
  language,
  view
}
