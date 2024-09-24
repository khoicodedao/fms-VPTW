import axiosAsync from '../helpers/Axios'
import ALL_API from '../constants/All.api'
let getListInternet = async () => {
  let url = ALL_API.INTERNET_LIST
  let data = await axiosAsync(url, {}, 'GET')
  return data?.status == 200 ? data.data : 'Error'
}

export { getListInternet }
