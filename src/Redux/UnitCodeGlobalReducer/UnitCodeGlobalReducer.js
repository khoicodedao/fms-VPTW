import LocalStorage from '../../helpers/LocalStorage'
//Get unit code default from localStorage
//let unitCode = localStorage.getItem('user')?.unitCode
// REDUCER
let unitCodeStorage = LocalStorage.get('user')?.conditions?.unit_code || '' //UnitCode key storage fake
const unitCodeReducer = (unitCode = unitCodeStorage, action) => {
  switch (action.type) {
    case 'CHANGE':
      return action.payload
    default:
      return unitCode
  }
}

export default unitCodeReducer
