import React, { useEffect, useState } from "react";
import ActiveLicense from "../ActiveLicense/ActiveLicense";
import Login from "./Login";
import { checkSetup } from "../../apis/SoftwareDecrypt.api";

let LoginAndActivate = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let data = await checkSetup();
      if (data === true) {
        setIsActive(true);
      } else if (typeof data === "string") {
        setIsActive(false);
        setMessage(data);
      } else {
        setIsActive(false);
        setMessage("Kích hoạt license không thành công");
      }
    } catch (error) {
      setIsError(true);
      setMessage("Lỗi dịch vụ API");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.id]);

  if (isLoading) {
    return <h1>Đang kiểm tra kết nối...</h1>;
  }

  if (isError) {
    return <h1>{message}</h1>;
  }

  return isActive ? <Login /> : <ActiveLicense message={message} />;
};

export default LoginAndActivate;
