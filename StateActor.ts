import { Actor, lookup } from 'actor-helpers/src/actor/Actor'
import { Store } from 'redux';

declare global {
  interface ActorMessageType {
    ui: State
    store: Action
  }
}

interface Action {
  type: string,
  payload?: any
}

interface State {
  type: 'STATE'
  state: object
}

export default class StateActor extends Actor<Action> {

  private ui = lookup('ui')
  private store: Store

  constructor (store: Store) {
    super()
    this.store = store
    this.store.subscribe(() => {
      this.ui.send({
        type: 'STATE',
        state: store.getState()
      })
    })
  }

  async onMessage (msg: Action) {
    this.store.dispatch(msg)
  }
}
