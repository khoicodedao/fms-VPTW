import axiosAsync from '../helpers/Axios'
import ALL_API from '../constants/All.api'
let getListUnit = async () => {
  let url = ALL_API.UNIT_LIST
  // let url = 'https://10.32.129.244:5000/api/v1/units/all'
  let data = await axiosAsync(url, {}, 'GET')
  return data?.status == 200 ? data.data : 'Error'
}
let getListUnitChild = async (unitParentCode) => {
  let url = ALL_API.UNIT_ALL_CHILD + `?unit_code=${unitParentCode}`
  // let url = 'https://10.32.129.244:5000/api/v1/units/all'
  let data = await axiosAsync(url, {}, 'GET')
  return data?.status == 200 ? data.data : 'Error'
}

let addUnit = async (body) => {
  let url = ALL_API.UNIT_ADD
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}

let editUnit = async (body) => {
  let url = ALL_API.UNIT_EDIT
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}
let deleteUnit = async (body) => {
  let url = ALL_API.UNIT_DELETE
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}
export { getListUnit, addUnit, editUnit, deleteUnit, getListUnitChild }
