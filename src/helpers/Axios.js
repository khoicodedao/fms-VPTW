import axios from "axios";
import LocalStorage from "./LocalStorage";
// import { isJwtExpired } from 'jwt-check-expiration'

let axiosAsync = async (url, body, type) => {
  let token = LocalStorage.get("user")?.token ?? "empty";
  let reqInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  try {
    // if (token === "empty") {
    //   LocalStorage.remove("user");
    //   return (window.location.href = "/login");
    // } else {
    //   let dataRespond =
    //     type == "POST"
    //       ? await reqInstance.post(url, body)
    //       : await reqInstance.get(url);
    //   if (
    //     dataRespond.data.message == "Token is failed" ||
    //     dataRespond.data.message == "Authentication failed"
    //   )
    //     return (window.location.href = "/login");
    //   // console.log('dataRespond',dataRespond)
    //   else {
    //     return dataRespond;
    //   }
    // }
    return await reqInstance.get(url);
  } catch (error) {
    console.log(2323234, error);
    if (error?.message?.includes("401")) {
      LocalStorage.remove("user");
      //return (window.location.href = '/login')
    } else {
      console.log(9999999999, error);
      console.error(error.message);
    }
  }
};

export default axiosAsync;
