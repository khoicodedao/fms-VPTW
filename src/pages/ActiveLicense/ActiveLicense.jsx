import React, { useRef, useState } from "react";
import { softwareDecrypt } from "../../apis/SoftwareDecrypt.api";
let NotifyAlert = (props) => {
  let { status } = props;
  let message =
    status == "danger"
      ? "Bạn cần kích hoạt để sử dụng hệ thống"
      : "Thành công, Hãy tải lại trang ";
  return (
    <div className={`alert alert-${status} mt-4  `}>
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-hidden="true"
      >
        &times;
      </button>
      <strong>Thông báo!</strong> {message}
    </div>
  );
};

function ActiveLicense(message) {
  const [status, setStatus] = useState("danger");
  const keyElement = useRef(null);
  const tokenElement = useRef(null);
  let activate = () => {
    let id_software = keyElement.current.value;
    let token = tokenElement.current.value;
    softwareDecrypt({ id_software, token }).then((data) => {
      if (data.code == 200) {
        setStatus("success");
      } else {
        alert("Kích hoạt thất bại! Hãy thử lại");
      }
    });
  };

  if (message.message.length > 0) {
    return <h1>{message?.message}</h1>;
  }
  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <NotifyAlert status={status}></NotifyAlert>
      <div className="auth-box card-block bg-light p-3 mt-4">
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center">
              <i className="feather icon-lock text-primary f-60 p-t-15 p-b-20 d-block"></i>
            </h3>
          </div>
        </div>
        <form action="" method="POST" role="form">
          <b className="text-info mb-4">Điền thông tin phần mềm</b>

          <div className="form-group">
            <label for="">Mã phần mềm</label>
            <input
              type="text"
              class="form-control"
              placeholder="Điền mã phần mềm tại đây"
              ref={keyElement}
            />
          </div>
          <div className="form-group">
            <label for="">Mã xác thực:</label>
            <input
              type="text"
              class="form-control"
              placeholder="Điền Mã xác thực tại đây"
              ref={tokenElement}
            />
          </div>
          <a href="#" onClick={activate} className="btn btn-primary">
            <i className="icofont icofont-lock"></i>
            Kích hoạt
          </a>
        </form>
      </div>
    </div>
  );
}

export default ActiveLicense;
