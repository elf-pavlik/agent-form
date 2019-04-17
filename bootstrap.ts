import StateActor from './StateActor'
import UiActor from './UiActor'
import store from './store'

import { hookup } from 'actor-helpers/lib/actor/Actor';

const stateActor = new StateActor(store)
hookup('state', stateActor)

export const uiActor = new UiActor()
hookup('ui', uiActor)
