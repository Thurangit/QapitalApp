import { useEffect, memo, Fragment, useContext } from "react";
import { useLocation, Outlet } from "react-router-dom";

//react-shepherd
import { ShepherdTourContext } from "react-shepherd";

//react-bootstrap
import { Link } from "react-router-dom";

// header
import Header from "../../components/partials/dashboard/HeaderStyle/header";

//subheader
import SubHeader from "../../components/partials/dashboard/HeaderStyle/sub-header";

//sidebar
import Sidebar from "../../components/partials/dashboard/SidebarStyle/sidebar";

//footer
import Footer from "../../components/partials/dashboard/FooterStyle/footer";

//default
// import {DefaultRouter} from '../../router/default-router'

//seetingoffCanvas
import SettingOffCanvas from "../../components/setting/SettingOffCanvas";

import Loader from "../../components/Loader";

// Import selectors & action from setting store
import * as SettingSelector from "../../store/setting/selectors";

// Redux Selector / Action
import { useSelector } from "react-redux";
import AuthUser from "../../components/authuser/AuthUser";
import SignIn from "../../views/dashboard/auth/sign-in";


const Tour = () => {
  const tour = useContext(ShepherdTourContext);
  const { pathname } = useLocation();
  useEffect(() => {
    if (
      pathname === "/dashboard" &&
      sessionStorage.getItem("tour") !== "true"
    ) {
      tour?.start();
    }
  });
  return <Fragment></Fragment>;
};

const Default = memo((props) => {
  const appName = useSelector(SettingSelector.app_name);
  useEffect(() => { });


  const { getToken } = AuthUser();
  if (!getToken()) {
    return <SignIn />
  }

  return (
    <Fragment>

      <Sidebar app_name="Qapital" />
      <Tour />
      <main className="main-content">
        <div className="position-relative">
          <Header />
          {/* <SubHeader /> */}
        </div>
        <div className="py-0 conatiner content-inner mt-3">
          {/* <DefaultRouter /> */}
          <Outlet />
        </div>

        <Footer />
      </main>
      <SettingOffCanvas />

    </Fragment>
  );
});

Default.displayName = "Default";
export default Default;
