import { useState, useContext } from "react";
import { login } from "../../apis/Login.api";
import validator from "validator";
import GlobalContext from "../../context/global.context";
import LocalStorage from "../../helpers/LocalStorage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

let Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setGlobal } = useContext(GlobalContext);
  const [alert, setAlert] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const checkLogin = async (e) => {
    e.preventDefault();
    let userNameValidated = validator.isEmpty(userName, {
      ignore_whitespace: true,
    });
    let passWordValidated = validator.isEmpty(password, {
      ignore_whitespace: true,
    });

    if (userNameValidated || passWordValidated) {
      setAlert(true);
      return;
    }

    let data = await login(userName, password);

    if (data?.code == 200) {
      let userData = data?.data?.[0];
      setGlobal({ ...userData });
      LocalStorage.set("user", JSON.stringify(userData));
      dispatch({
        type: "CHANGE",
        payload: userData?.conditions?.unit_code,
      });
      navigate("/");
    } else {
      setAlert(true);
    }
  };

  return (
    <section className="login-block">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <form
              onSubmit={checkLogin}
              className="md-float-material form-material"
            >
              <div className="text-center"></div>
              <div className="auth-box card">
                <div className="card-block">
                  <div className="row m-b-20">
                    <div className="col-md-12">
                      <h3 className="text-center" style={{ color: "#01a9ac" }}>
                        Đăng nhập
                      </h3>
                      {alert && (
                        <div className="alert alert-warning">
                          <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                          >
                            <i className="icofont icofont-close-line-circled"></i>
                          </button>
                          <strong>Warning!</strong> Lỗi đăng nhập
                          <code> Hãy thử lại</code>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group form-primary">
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="Tên tài khoản"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <span className="form-bar" />
                  </div>
                  <div className="form-group form-primary">
                    <input
                      type="password"
                      className="form-control"
                      required
                      placeholder="Mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="form-bar" />
                  </div>
                  <div className="row m-t-30">
                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-md btn-block waves-effect waves-light text-center m-b-20"
                      >
                        Đăng nhập
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
