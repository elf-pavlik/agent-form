import { lookup } from 'actor-helpers/lib/actor/Actor'

import { Agent, Transaction, Flow, ExchangeRate } from './interfaces'

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

const store = lookup('state')

// stateActorHandle

// export default function actionsFactory(stateActorHandle)

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
