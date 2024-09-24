import { useRef, useState, useContext } from "react";
import { login } from "../../apis/Login.api";
import validator from "validator";
import GlobalContext from "../../context/global.context";
import LocalStorage from "../../helpers/LocalStorage";
// import { useHistory, Redirect, useLocation, Navigate } from 'react-router'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

let Login = (props) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { setGlobal } = useContext(GlobalContext);
  const [alert, setAlert] = useState(false);
  const userNameElement = useRef(null);
  const passWordElement = useRef(null);
  let checkLogin = async (e) => {
    e.preventDefault();
    let userName = userNameElement.current.value;
    let passWord = passWordElement.current.value;
    let userNameValidated = validator.isEmpty(userName, {
      ignore_whitespace: true,
    });
    let passWordValidated = validator.isEmpty(passWord, {
      ignore_whitespace: true,
    });
    let data =
      userNameValidated || passWordValidated
        ? setAlert(true)
        : await login(userName, passWord);

    if (data?.code == 200) {
      console.log(data.code);
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
                            class="close"
                            data-dismiss="alert"
                            aria-label="Close"
                          >
                            <i class="icofont icofont-close-line-circled"></i>
                          </button>
                          <strong>Warning!</strong> Lỗi đăng nhập
                          <code> Hãy thử lại</code>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group form-primary">
                    <input
                      ref={userNameElement}
                      type="text"
                      name="email"
                      className="form-control"
                      required
                      placeholder="Tên tài khoản"
                    />
                    <span className="form-bar" />
                  </div>
                  <div className="form-group form-primary">
                    <input
                      autoComplete="current-password"
                      ref={passWordElement}
                      type="password"
                      name="password"
                      className="form-control"
                      required
                      placeholder="Mật khẩu"
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
