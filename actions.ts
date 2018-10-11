import { store } from './store'

export const SET_LANGUAGE = 'SET_LANGUAGE'
export const NAVIGATE = 'NAVIGATE'

export function navigate(view) {
  return store.dispatch({
    type: NAVIGATE,
    view
  })
}