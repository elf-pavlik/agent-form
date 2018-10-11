import { store } from './store'
import { Agent, Transaction } from './interfaces'

export const SET_LANGUAGE = 'SET_LANGUAGE'
export const NAVIGATE = 'NAVIGATE'
export const ADD_AGENT = 'ADD_AGENT'
export const SELECT_AGENT = 'SELECT_AGENT'
export const SELECT_DATE = 'SELECT_DATE'
export const UNSELECT_DATE = 'UNSELECT_DATE'
export const ADD_TRANSACTION = 'ADD_TRANSACTION'
export const CANCEL_TRANSACTION = 'CANCEL_TRANSACTION'

export function navigate (view :string) {
  return store.dispatch({
    type: NAVIGATE,
    view
  })
}

export function addAgent (agent :Agent) {
  return store.dispatch({
    type: ADD_AGENT,
    agent
  })
}

export function selectAgent (agent :Agent) {
  return store.dispatch({
    type: SELECT_AGENT,
    agent
  })
}

export function selectDate (date :string) {
  return store.dispatch({
    type: SELECT_DATE,
    date
  })
}

export function unselectDate () {
  return store.dispatch({
    type: UNSELECT_DATE
  })
}

export function addTransaction (transaction :Transaction) {
  return store.dispatch({
    type: ADD_TRANSACTION,
    transaction
  })
}

export function cancelTransaction () {
  return store.dispatch({
    type: CANCEL_TRANSACTION
  })
}