import { Outlet } from "react-router-dom";
import classes from "./Auth.module.css";
import logo from "../Images/android-chrome-512x512.png";

const Auth = function (props) {
  return (
    <section className={`${classes.section}`}>
      <div className={classes.head}>
        <img src={logo} />
        <h1 className={`${classes["big-logo"]}`}>My Gallerie</h1>
      </div>
      <Outlet />
    </section>
  );
};

export default Auth;
