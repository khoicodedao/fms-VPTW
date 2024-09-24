import { combineReducers } from 'redux'
import changeDateReducer from '../DateTimeGlobalReducer/DateTimeGlobalReducer'
import unitCodeReducer from '../UnitCodeGlobalReducer/UnitCodeGlobalReducer'
const allReducers = combineReducers({
  changeDateReducer,
  unitCodeReducer,
  // add more reducers here
})
export default allReducers
