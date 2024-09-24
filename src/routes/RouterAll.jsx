import Home from "../pages/Home/Home";
import Software from "../pages/Software/Software";
import Event from "../pages/Event/Event";
import Unit from "../pages/Unit/Unit";
import Alert from "../pages/Alert/Alert";
import Internet from "../pages/Internet/Internet";
import NotFound from "../pages/NotFound/NotFound";
import User from "../pages/User/User";
import Identify from "../pages/Identify/Identify";
import Support from "../pages/Support/Support";
import Config from "../pages/Config/Config";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import LocalStorage from "../helpers/LocalStorage";
import { isJwtExpired } from "jwt-check-expiration";
import Device from "./../pages/Device/Device";
import Statistic from "./../pages/Statistics/Statistics";
import DetailViolent from "../pages/DetailViolent/DetailViolent";
import DetailMiAV from "../pages/DetailMiAV/DetailMiAV";
import DetailMalware from "../pages/DetailMalware/DetailMalware";
import DetailCandC from "../pages/DetailCandC/DetailCandC";
import LoginAndActivate from "../pages/Login/LoginAndActivate";
export function RouterAll() {
  const pageRoutes = [
    { url: "/", component: <Home />, id: 1 },
    { url: "/software", component: <Software />, id: 2 },
    { url: "/event", component: <Event />, id: 3 },
    { url: "/Unit", component: <Unit />, id: 4 },
    { url: "/internet", component: <Internet />, id: 5 },
    { url: "/alert", component: <Alert />, id: 6 },
    { url: "/user", component: <User />, id: 7 },
    { url: "/device", component: <Device />, id: 8 },
    { url: "/identify", component: <Identify />, id: 9 },
    { url: "/support", component: <Support />, id: 10 },
    { url: "/config", component: <Config />, id: 11 },
    { url: "/statistics", component: <Statistic />, id: 12 },
    { url: "/detail-violent", component: <DetailViolent />, id: 13 },
    { url: "/detail-miav", component: <DetailMiAV />, id: 14 },
    { url: "/detail-malware", component: <DetailMalware />, id: 15 },
    { url: "/detail-candc", component: <DetailCandC />, id: 16 },
  ];
  const ProtectedRouteWithLayout = ({ children }) => {
    const auth = LocalStorage.get("user")?.role;
    // if (!auth) {
    //   window.location.href = "/login";
    // } else {
    return <Layout>{children}</Layout>;
    // }
  };
  return (
    <Routes>
      {pageRoutes.map((item) => (
        <Route
          keys={item.id}
          exact
          path={item.url}
          element={
            <ProtectedRouteWithLayout>
              {item.component}
            </ProtectedRouteWithLayout>
          }
        />
      ))}
      <Route
        path="/login"
        keys={"login"}
        element={
          LocalStorage.get("user")?.role ? (
            <Navigate to="/" /> //! find url to redirect web when reload
          ) : (
            <LoginAndActivate />
          )
        }
      />
      {/* 
      // ? Not Found page
      */}
      <Route keys={"default"} path="*" element={<NotFound />} />
    </Routes>
  );
}
