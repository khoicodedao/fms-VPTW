import { DateNow } from '../../helpers/DateTimeNow'
let startDate = DateNow() + ' 00:00:00'
let endDate = DateNow() + ' 23:00:00'
// REDUCER
const changeDateReducer = (timeGlobal = { startDate, endDate }, action) => {
  switch (action.type) {
    case 'CHANGE_DATE':
      return action.payload
    default:
      return timeGlobal
  }
}

export default changeDateReducer
