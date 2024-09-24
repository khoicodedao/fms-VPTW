import axiosAsync from '../helpers/Axios'
import ALL_API from '../constants/All.api'
let getListFMC = async () => {
  let url = ALL_API.FMC_LIST
  let data = await axiosAsync(url, {}, 'GET')
  return data?.status == 200 ? data.data : 'Error'
}

let addFmc = async (body) => {
  let url = ALL_API.FMC_ADD
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}

let editFmc = async (body) => {
  let url = ALL_API.FMC_EDIT
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}
let deleteFmc = async (body) => {
  let url = ALL_API.FMC_DELETE
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}
let genKeyFmc = async (body) => {
  let url = ALL_API.FMC_GEN_KEY
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}
export { getListFMC, addFmc, editFmc, deleteFmc, genKeyFmc }
