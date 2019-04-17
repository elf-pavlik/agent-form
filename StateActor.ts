import { Actor, lookup } from 'actor-helpers/lib/actor/Actor'
import { Store } from 'redux';

declare global {
  interface ActorMessageType {
    state: Action
  }
}

interface Action {
  type: string,
  payload?: any
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
