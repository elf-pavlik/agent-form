// import { store } from './store'

import { lookup } from 'actor-helpers/src/actor/Actor'
const store = lookup('store')

import { Agent, Transaction, Flow, ExchangeRate } from './interfaces'

export const SET_LANGUAGE = 'SET_LANGUAGE'
export const NAVIGATE = 'NAVIGATE'
export const ADD_AGENT = 'ADD_AGENT'
export const SELECT_AGENT = 'SELECT_AGENT'
export const SELECT_DATE = 'SELECT_DATE'
export const UNSELECT_DATE = 'UNSELECT_DATE'
export const ADD_TRANSACTION = 'ADD_TRANSACTION'
export const CANCEL_TRANSACTION = 'CANCEL_TRANSACTION'
export const ADD_FLOW = 'ADD_FLOW'
export const ADD_EXCHANGE_RATE = 'ADD_EXCHANGE_RATE'
export const RESTORE = 'RESTORE'

export function navigate (view :string) {
  return store.send({
    type: NAVIGATE,
    payload: view
  })
}

export function addAgent (agent :Agent) {
  return store.send({
    type: ADD_AGENT,
    payload: agent
  })
}

export function selectAgent (agent :Agent) {
  return store.send({
    type: SELECT_AGENT,
    payload: agent
  })
}

export function selectDate (date :string) {
  return store.send({
    type: SELECT_DATE,
    payload: date
  })
}

export function unselectDate () {
  return store.send({
    type: UNSELECT_DATE
  })
}

export function addTransaction (transaction :Transaction) {
  return store.send({
    type: ADD_TRANSACTION,
    payload: transaction
  })
}

export function addFlow (flow :Flow) {
  return store.send({
    type: ADD_FLOW,
    payload: flow
  })
}

export function addExchangeRate (exchangeRate :ExchangeRate) {
  return store.send({
    type: ADD_EXCHANGE_RATE,
    payload: exchangeRate
  })
}

export function cancelTransaction () {
  return store.send({
    type: CANCEL_TRANSACTION
  })
}

export function restore (data) {
  return store.send({
    type: RESTORE,
    payload: data
  })
}
