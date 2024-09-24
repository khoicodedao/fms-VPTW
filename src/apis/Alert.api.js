import axiosAsync from '../helpers/Axios'
import ALL_API from '../constants/All.api'
let getListAlert = async () => {
  let url = ALL_API.AlERT_LIST
  let data = await axiosAsync(url, {}, 'GET')
  return data?.status == 200 ? data.data : 'Error'
}

let getListAlertByMAC = async (mac) => {
  let url = ALL_API.ALERT_LIST_BY_MAC + `?mac=${mac}&requireTotalCount=true`
  let data = await axiosAsync(url, {}, 'GET')
  return data?.status == 200 ? data.data : 'Error'
}
export { getListAlert, getListAlertByMAC }
