import axiosAsync from '../helpers/Axios'
import ALL_API from '../constants/All.api'
let getListFMS = async () => {
  let url = ALL_API.FMS_LIST
  let data = await axiosAsync(url, {}, 'GET')
  return data?.status == 200 ? data.data : 'Error'
}

let addFms = async (body) => {
  let url = ALL_API.FMS_ADD
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}

let editFms = async (body) => {
  let url = ALL_API.FMS_EDIT
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}
let deleteFms = async (body) => {
  let url = ALL_API.FMS_DELETE
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}
let genKeyFms = async (body) => {
  let url = ALL_API.FMS_GEN_KEY
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}
export { getListFMS, addFms, editFms, deleteFms, genKeyFms }
