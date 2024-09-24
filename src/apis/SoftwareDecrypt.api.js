import ALL_API from "../constants/All.api";
import axiosLogin from "./../helpers/AxiosLogin";
let softwareDecrypt = async (body) => {
  let url = ALL_API.SOFTWARE_DECRYPT;
  let data = await axiosLogin(url, body, "POST");
  return data?.status === 200 ? data.data : "Error";
};

let checkSetup = async () => {
  let url = ALL_API.SOFTWARE_CHECK_SETUP;
  let data = await axiosLogin(url, {}, "GET");
  return data?.status === 200 ? data.data.data.result : data;
};

export { softwareDecrypt, checkSetup };
