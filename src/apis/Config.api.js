import axiosAsync from '../helpers/Axios'
import ALL_API from '../constants/All.api'
let getListConfig = async () => {
  let url = ALL_API.CONFIG_LIST
  let data = await axiosAsync(url, {}, 'GET')
  return data?.status == 200 ? data.data : 'Error'
}
let editConfig = async (body) => {
  let url = ALL_API.CONFIG_EDIT
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}
export { getListConfig, editConfig }
