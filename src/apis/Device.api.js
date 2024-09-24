import axiosAsync from '../helpers/Axios'
import ALL_API from '../constants/All.api'
let getListDevice = async () => {
  let url = ALL_API.DEVICE_LIST_PAGING
  // let url = 'https://10.32.129.243:5000/api/v1/devices/all'
  let data = await axiosAsync(url + `?unit_code=all`, {}, 'GET')
  return data?.status == 200 ? data.data : 'Error'
}

let addDevice = async (body) => {
  let url = ALL_API.UNIT_ADD
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}

let editDevice = async (body) => {
  let url = ALL_API.UNIT_EDIT
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}
let deleteDevice = async (body) => {
  let url = ALL_API.UNIT_DELETE
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}
export { getListDevice }
