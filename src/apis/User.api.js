import axiosAsync from '../helpers/Axios'
import ALL_API from '../constants/All.api'
let getListUser = async () => {
  let url = ALL_API.USER_LIST
  let data = await axiosAsync(url, {}, 'GET')
  return data?.status == 200 ? data.data : 'Error'
}

let addUser = async (body) => {
  let url = ALL_API.USER_ADD
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}

let editUser = async (body) => {
  let url = ALL_API.USER_EDIT
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}
let deleteUser = async (body) => {
  let url = ALL_API.USER_DELETE
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}
export { getListUser, addUser, editUser, deleteUser }
