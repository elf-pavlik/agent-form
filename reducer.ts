import config from './config.js'
import i18n from './labels.js'


import {
  SET_LANGUAGE,
  NAVIGATE,
  ADD_AGENT,
  SELECT_AGENT,
  SELECT_DATE,
  UNSELECT_DATE,
  ADD_TRANSACTION,
  CANCEL_TRANSACTION
} from './actions.js'
import { TransactionTemplate } from './interfaces.js'

const initial = {
  language: config.language,
  labels: i18n[config.language],
  view: 'transactions',
  newTransaction: { type: 'Transaction' } as TransactionTemplate
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

function agents (state = [], action) {
  switch(action.type) {
    case ADD_AGENT:
      return [
        Object.assign({}, action.agent),
        ...state
      ]
    default:
      return state
  }
}

function transactions (state = [], action) {
  switch(action.type) {
    case ADD_TRANSACTION:
      return [
        Object.assign({}, action.transaction),
        ...state
      ]
    default:
      return state
  }
}

function newTransaction (state = initial.newTransaction, action) {
  switch(action.type) {
    case SELECT_AGENT:
      return {
        ... state,
        agent: action.agent.id
      }
    case SELECT_DATE:
      return {
        ... state,
        date: action.date
      }
    case UNSELECT_DATE:
      let withoutDate = { ...state }
      delete withoutDate.date
      return withoutDate
    case CANCEL_TRANSACTION:
    case ADD_TRANSACTION:
      return { ...initial.newTransaction }
    default:
     return state
  }
}

export default {
  labels,
  language,
  view,
  agents,
  newTransaction,
  transactions
}
