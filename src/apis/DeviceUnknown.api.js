import axiosAsync from '../helpers/Axios'
import ALL_API from '../constants/All.api'
let getDeviceUnknown = async () => {
  let url = ALL_API.DEVICE_UNKNOWN
  let data = await axiosAsync(url, {}, 'GET')
  return data?.status == 200 ? data.data : 'Error'
}

export { getDeviceUnknown }
