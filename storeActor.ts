import { lookup } from 'actor-helpers'
import { store } from './store'

const ui = lookup('ui')

// follow: https://github.com/PolymerLabs/actor-boilerplate/blob/master/src/actors/ui.ts

onMessage(msg => {
  store.dispatch(msg)
})

store.subscribe(state => {
  ui.send({
    type: 'STATE',
    state
  })
})
