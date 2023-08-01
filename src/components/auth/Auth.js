import { Outlet } from "react-router-dom";
import logo from "../../Images/android-chrome-512x512.png";
import classes from "./Auth.module.css";

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
