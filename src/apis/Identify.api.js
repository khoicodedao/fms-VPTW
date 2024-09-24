import axiosAsync from '../helpers/Axios'
import ALL_API from '../constants/All.api'
let getListIdentify = async () => {
  let url = ALL_API.IDENTIFY_LIST
  // let url = 'https://10.32.129.243:5000/api/v1/devices/all'
  let data = await axiosAsync(url, {}, 'GET')
  return data?.status == 200 ? data.data : 'Error'
}

let addIdentify = async (body) => {
  let url = ALL_API.IDENTIFY_ADD
  let data = await axiosAsync(url, [body], 'POST')
  return data?.status == 200 ? data.data : 'Error'
}

let editIdentify = async (body) => {
  let url = ALL_API.IDENTIFY_EDIT
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}
let deleteIdentify = async (body) => {
  let url = ALL_API.IDENTIFY_DELETE
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}
export { getListIdentify, addIdentify, editIdentify, deleteIdentify }
