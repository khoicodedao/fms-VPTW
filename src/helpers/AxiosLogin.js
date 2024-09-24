import axios from "axios";
//TODO : use axios without checking token
let axiosLogin = async (url, body, type) => {
  try {
    return type === "POST" ? await axios.post(url, body) : await axios.get(url);
  } catch (error) {
    return error.message;
    // console.error(error);
  }
};

export default axiosLogin;
