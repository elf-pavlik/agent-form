import { Actor, lookup } from 'actor-helpers/lib/actor/Actor'

import * as actions from './actions'

declare global {
  interface ActorMessageType {
    ui: StateMessage
  }
}

interface StateMessage {
  type: 'STATE'
  state: object
}

export default class UiActor extends Actor<StateMessage> {

  private stateActorHandle = lookup('state')
  private state: object
  private actions: object = actions
  private connectedComponentsCallbacks = []

  constructor () {
    super()
    // create actions with actions factory passing state actor handle
    // this.actions = actionsFactory(stateActorHandle)
  }

  handleHistory () {
    let newPath
    if (this.state.view === 'transactions') {
      if (location.pathname !== "/") newPath = '/'
    } else if (this.state.view !== location.pathname.substring(1)) {
      newPath = `/${this.state.view}`
    }
    if (newPath && newPath !== location.pathname) {
      window.history.pushState({}, '', newPath)
    }
  }

  async onMessage (stateMessage: StateMessage) {
    this.state = stateMessage.state
    this.handleHistory()
    for (const callback of this.connectedComponentsCallbacks) {
      callback(this.state)
    }
  }

  subscribe (componentCallback) {
    this.connectedComponentsCallbacks.push(componentCallback)
  }
}
