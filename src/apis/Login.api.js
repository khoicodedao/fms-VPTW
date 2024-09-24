import axiosLogin from '../helpers/AxiosLogin'
import ALL_API from '../constants/All.api'
let login = async (username, password) => {
  let url = ALL_API.LOGIN
  let data = await axiosLogin(
    url,
    {
      username: username,
      password: password,
    },
    'POST',
  )
  return data?.status == 200 ? data.data : 'Error'
}

export { login }
