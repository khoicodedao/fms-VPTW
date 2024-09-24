import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import LocalStorage from "../helpers/LocalStorage";
import HeaderUnitDropdown from "../components/HeaderUnitDropdown";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getListConfig } from "../apis/Config.api";

const NavbarHorizontal = () => {
  const [fmsName, setFmsName] = useState("FMS");
  useEffect(() => {
    let loadData = async () => {
      let data = await getListConfig();
      let nameSoftware = data?.data?.name_software;
      setFmsName(nameSoftware);
      document.title = nameSoftware;
    };
    loadData();
  }, []);
  const dispatch = useDispatch();
  let onChange = (value) => {
    dispatch({
      type: "CHANGE",
      payload: value ?? LocalStorage.get("user")?.conditions?.unit_code,
    });
  };
  let userName = LocalStorage.get("user")?.username ?? "User";
  let logOut = () => {
    LocalStorage.remove("user");
    LocalStorage.remove("expandRowKeys");
    window.location.reload();
  };
  return (
    <nav
      id="navbar-horizotal"
      className="navbar navbar-inverse navbar-global navbar-fixed-top"
    >
      <div className="container-fluid">
        <div
          className="navbar-header"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            className="navbar-brand"
            href="#"
            style={{
              width: "85%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="mr-4">{fmsName}</div>
            <div style={{ width: "300px" }}>
              <HeaderUnitDropdown onChange={onChange}></HeaderUnitDropdown>
            </div>

            <SearchBar></SearchBar>
          </div>

          <div
            className="navbar-brand"
            href="#"
            style={{
              width: "234px",
              display: "flex",

              alignItems: "center",
            }}
          >
            <NavLink
              to={"/user"}
              style={{
                display: "flex",
                cursor: "pointer",
                alignItems: "center",
              }}
            >
              <i
                className="ion-person"
                style={{
                  marginLeft: "20px",
                  fontSize: "25px",
                  marginRight: "10px",
                }}
              ></i>
              {/* //? userName from LocalStorage */}
              {userName}
            </NavLink>
            <a
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={logOut}
            >
              <i
                className="ion-log-out"
                style={{
                  marginLeft: "20px",
                  fontSize: "25px",
                  marginRight: "10px",
                }}
              ></i>
              Đăng xuất
            </a>
          </div>
        </div>

        {/*/.nav-collapse */}
      </div>
    </nav>
  );
};

export default NavbarHorizontal;
