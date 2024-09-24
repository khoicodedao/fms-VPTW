import axiosAsync from '../helpers/Axios'
import ALL_API from '../constants/All.api'
let getCard = async (body) => {
  let url = ALL_API.HOME_CARD
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}

let getStatisticalMalware = async (body) => {
  let url = ALL_API.HOME_MALWARE
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}

let getCandC = async (body) => {
  let url = ALL_API.HOME_CandC
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}
let getViolent = async (body) => {
  let url = ALL_API.HOME_VIOLENT
  let data = await axiosAsync(url, body, 'POST')
  return data?.status == 200 ? data.data : 'Error'
}

export { getCard, getStatisticalMalware, getCandC, getViolent }
