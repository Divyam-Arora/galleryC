import { Outlet } from "react-router-dom";
import classes from "./Auth.module.css";

const Auth = function (props) {
  return (
    <section className={`${classes.section}`}>
      <h1 className={`${classes["big-logo"]}`}>Cloud Media Gallery</h1>
      <Outlet />
    </section>
  );
};

export default Auth;
