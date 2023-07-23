import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import Auth from "../components/auth/Auth";
import Login from "../components/auth/Login";

const AuthPage = function (props) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  });
  return (
    <Auth>
      <Outlet />
    </Auth>
  );
};

export default AuthPage;
