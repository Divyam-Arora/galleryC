import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import classes from "./Auth.module.css";

import useHttp from "../../hooks/http-hook";
import { ApiLogin } from "../../util/apis";
import ButtonPrimary from "../UI/ButtonPrimary";
import ButtonSpinner from "../UI/Spinner/ButtonSpinner";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { data, sendRequest, cleanUp, error } = useHttp();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    return cleanUp;
  }, [cleanUp]);

  const loginHandler = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const requestBody = {
      username,
      password,
    };
    cleanUp();
    setIsLoading(true);
    sendRequest(ApiLogin(), "POST", requestBody, {}, false);

    console.log(requestBody);
  };

  useEffect(() => {
    if (data) {
      dispatch(
        authActions.login({
          accessToken: data["access_token"],
          refreshToken: data["refresh_token"],
          userName: data.username,
          expirationDate: data.expirationDate,
        })
      );

      navigate("/", { replace: true });
    }

    if (data || error) {
      setIsLoading(false);
    }
  }, [data, error, dispatch, authActions, navigate]);

  return (
    <form onSubmit={loginHandler} className={`${classes.form} flex-column`}>
      <h1 className="heading-primary">Login</h1>
      <div className="flex-column">
        <label>Username</label>
        <input
          ref={usernameRef}
          type="text"
          className={`${classes.input} input`}
          placeholder="Enter username"
          name="username"
          required
        />
      </div>
      <div className="flex-column">
        <label>Password</label>
        <input
          ref={passwordRef}
          type="password"
          className={`${classes.input} input`}
          placeholder="Enter password"
          name="password"
          required
        />
      </div>
      <div className="flex-column">
        <ButtonPrimary type="submit" disabled={isLoading}>
          <p className="width-100 flex-row">
            {isLoading ? <ButtonSpinner /> : "Login"}
          </p>
        </ButtonPrimary>
        <p className={classes.info}>
          Don't have an account?{" "}
          <strong>
            <Link to={"signup"}>Sign up</Link>
          </strong>
        </p>
        {/* <ButtonPrimary
            onClick={() => {
              navigate("/signup", { replace: true });
            }}
          >
            Sign Up
          </ButtonPrimary> */}
      </div>
    </form>
  );
};
export default Login;
