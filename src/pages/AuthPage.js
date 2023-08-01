import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import Auth from "../components/auth/Auth";

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
