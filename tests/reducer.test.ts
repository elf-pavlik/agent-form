import reducers from '../reducer'
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
} from '../actionTypes'

it('should handle NAVIGATE', () => {
    const action = {
        type: NAVIGATE,
        payload: 'agents'
    }
    expect(reducers.view(null, action)).toEqual('agents')
})