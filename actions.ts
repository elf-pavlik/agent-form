import { store } from './store'

export const SET_LANGUAGE = 'SET_LANGUAGE'
export const NAVIGATE = 'NAVIGATE'
export const ADD_AGENT = 'ADD_AGENT'

export function navigate(view) {
  return store.dispatch({
    type: NAVIGATE,
    view
  })
}

export function addAgent(agent) {
  return store.dispatch({
    type: ADD_AGENT,
    agent
  })
}