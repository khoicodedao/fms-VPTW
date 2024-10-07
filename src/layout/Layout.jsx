import NavbarVertical from "./NavbarVertical";
import NavbarHorizoltal from "./NavbarHorizoltal";
import DateTimePicker from "../components/DateTimePicker";
import Bread from "../components/Breadcrumb";
import { useState } from "react";
var Layout = function (props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div>
      <NavbarHorizoltal></NavbarHorizoltal>
      <NavbarVertical changeUI={setIsCollapsed}></NavbarVertical>
      <div className="main-content">
        <div
          id="bread"
          style={{
            position: "fixed",
            top: "78px",
            width: `calc(100% -  ${isCollapsed ? 126 : 270}px)`,
            display: "flex",
            alignItems: "center",
            // justifyContent: "space-between",
            transition: "all 0.1s ease-in-out",
            paddingTop: "15px",
          }}
        >
          <Bread></Bread>
          <DateTimePicker></DateTimePicker>
        </div>
        <div className="page-body ">
          <div
            style={{
              overflowY: "scroll",
              height: "90vh",
              marginTop: "10px",
              paddingBottom: "40px",
            }}
          >
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
