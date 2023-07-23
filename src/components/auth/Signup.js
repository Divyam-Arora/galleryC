import React, { Component, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import ButtonPrimary from "../UI/ButtonPrimary";
import axios from "axios";
import useHttp from "../../hooks/http-hook";
import { showNotifications } from "../../store/notification-actions";
import classes from "./Auth.module.css";
import ButtonSpinner from "../UI/Spinner/ButtonSpinner";
import { ApiSignup } from "../../util/apis";

const Signup = function () {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();

  const { data, sendRequest, cleanUp, error } = useHttp();
  const [isLoading, setIsLoading] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    return cleanUp;
  }, [cleanUp]);

  const SignUpHandler = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const firstName = firstnameRef.current.value;
    const lastName = lastnameRef.current.value;
    const email = emailRef.current.value;

    const requestBody = {
      firstName,
      lastName,
      email,
      username,
      password,
    };
    cleanUp();
    setIsLoading(true);
    sendRequest(ApiSignup(), "POST", requestBody, {}, false);
  };

  useEffect(() => {
    if (data) {
      dispatch(
        showNotifications({
          title: "Success",
          description: "Registration Succesful",
          type: "SUCCESS",
        })
      );
      navigate("/auth", { replace: true });
    }

    if (data || error) {
      setIsLoading(false);
    }
  }, [data, dispatch, showNotifications, navigate]);

  return (
    <form className={`${classes.form} flex-column`} onSubmit={SignUpHandler}>
      <h3 className="heading-primary">Sign Up</h3>
      <div className="flex-column">
        <label>First name</label>
        <input
          ref={firstnameRef}
          type="text"
          className="input"
          placeholder="Enter first name"
          name="first name"
          required
        />
      </div>
      <div className="flex-column">
        <label>Last name</label>
        <input
          ref={lastnameRef}
          type="text"
          className="input"
          placeholder="Enter last name"
          name="last name"
          required
        />
      </div>
      <div className="flex-column">
        <label>Username</label>
        <input
          ref={usernameRef}
          type="text"
          className="input"
          placeholder="Enter username"
          name="username"
          required
        />
      </div>
      <div className="flex-column">
        <label>Email address</label>
        <input
          ref={emailRef}
          type="email"
          className="input"
          placeholder="Enter email"
          name="email"
          required
        />
      </div>
      <div className="flex-column">
        <label>Password</label>
        <input
          ref={passwordRef}
          type="password"
          className="input"
          placeholder="Enter password"
          name="password"
          required
        />
      </div>
      <div className="flex-column">
        <ButtonPrimary type="submit" disabled={isLoading}>
          <p className="width-100 flex-row">
            {isLoading ? <ButtonSpinner /> : "Sign up"}
          </p>
        </ButtonPrimary>
        <p className={classes.info}>
          Already have an account?
          <strong>
            <Link to={"/auth"}> Login</Link>
          </strong>
        </p>
      </div>
    </form>
  );
};

export default Signup;
