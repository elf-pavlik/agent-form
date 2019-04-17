import cuid from 'cuid'
import config from './config'
import i18n from './labels'

import {
  SET_LANGUAGE,
  NAVIGATE,
  ADD_AGENT,
  SELECT_AGENT,
  SELECT_DATE,
  UNSELECT_DATE,
  ADD_FLOW,
  ADD_EXCHANGE_RATE,
  ADD_TRANSACTION,
  CANCEL_TRANSACTION,
  RESTORE
} from './actionTypes'

import { TransactionTemplate } from './interfaces.js'

function createTransaction () :TransactionTemplate {
  return {
    id: cuid(),
    type: 'Transaction',
    flows: [],
    exchangeRates: []
  }
}

const initial = {
  user: config.user,
  language: config.language,
  labels: i18n[config.language],
  view: 'transactions',
  newTransaction: createTransaction(),
  units: ['unit', 'kg', 'L'],
  categories: ['currency', 'mobility', 'utilities', 'food'],
  classifications: ['MXN', 'gas (LPG)', 'gasoline (95 RON)']
}

function user (state = initial.user, action) {
  switch (action.type) {
    case RESTORE:
      return action.data.user
    default:
      return state
  }
}

function labels (state = initial.labels, action) {
  switch (action.type) {
    case SET_LANGUAGE:
      return i18n[action.payload]
    default:
      return state
  }
}

function units (state = initial.units, action) {
  switch(action.type) {
    default:
      return state
  }
}

function categories (state = initial.categories, action) {
  switch(action.type) {
    default:
      return state
  }
}

function classifications (state = initial.classifications, action) {
  switch(action.type) {
    default:
      return state
  }
}

function language (state = initial.language, action) {
  switch (action.type) {
    case SET_LANGUAGE:
      return action.payload
    default:
      return state
  }
} 

function view (state = initial.view, action) {
  switch (action.type) {
    case NAVIGATE:
      return action.payload
    default:
      return state
  }
}

function agents (state = [], action) {
  switch(action.type) {
    case ADD_AGENT:
      return [
        Object.assign({}, action.payload),
        ...state
      ]
    case RESTORE:
      return action.payload.agents
    default:
      return state
  }
}

function transactions (state = [], action) {
  switch(action.type) {
    case ADD_TRANSACTION:
      return [
        Object.assign({}, action.payload),
        ...state
      ]
    case RESTORE:
      return action.payload.transactions
    default:
      return state
  }
}

function newTransaction (state = initial.newTransaction, action) {
  switch(action.type) {
    case SELECT_AGENT:
      return {
        ... state,
        agent: action.payload.id
      }
    case SELECT_DATE:
      return {
        ... state,
        date: action.payload
      }
    case UNSELECT_DATE:
      let withoutDate = { ...state } as TransactionTemplate
      delete withoutDate.date
      return withoutDate
    case ADD_FLOW:
      return {
        ...state,
        flows: [...state.flows, action.payload]
      }
    case ADD_EXCHANGE_RATE:
      return {
        ...state,
        exchangeRates: [...state.exchangeRates, action.payload]
      }
    case CANCEL_TRANSACTION:
    case ADD_TRANSACTION:
      return createTransaction()
    case RESTORE:
      return action.payload.newTransaction
    default:
     return state
  }
}

export default {
  user,
  labels,
  units,
  categories,
  classifications,
  language,
  view,
  agents,
  newTransaction,
  transactions
}
