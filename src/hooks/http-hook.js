import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { showError } from "../store/error-action";
import { httpStateActions } from "../store/httpState-slice";
import axios from "axios";
import { ApiRefreshToken } from "../util/apis";
import { authActions } from "../store/auth-slice";
import { logout } from "../store/auth-actions";
import { showNotifications } from "../store/notification-actions";

const useHttp = (initialData = null) => {
  const [data, setdata] = useState(initialData);
  const [error, setError] = useState(null);
  const [resHeaders, setResHeaders] = useState(null);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  // const cancelToken = axios.CancelToken;
  // const source = cancelToken.source();
  const sendRequest = useCallback(
    (
      url,
      method = "GET",
      body,
      headers,
      appSpinner = true,
      loadingState = true
    ) => {
      // console.log(appSpinner);
      dispatch(httpStateActions.send({ appSpinner, loadingState }));
      setIsLoading(true);

      headers = {
        ...headers,
        Authorization: "Bearer " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      };

      axios({
        url: url,
        method: method,
        data: body,
        headers: headers,
      })
        .then((response) => {
          console.log(response);
          // console.log(response.headers.get("userId"));
          // if (!response.statusText === "OK") {
          //   // console.log(response.status, response.statusText);
          //   const error = {
          //     status: response.status,
          //     statusText: response.statusText,
          //   };
          //   console.log(error);
          //   throw new Error({
          //     message: response.status,
          //     cause: response.statusText,
          //   });
          // } else {
          setResHeaders(response.headers);
          setStatus(response.status);
          // console.log("status" + response.status);
          setdata(response.data);
          dispatch(httpStateActions.response());
          setIsLoading(false);
          // }

          // return response.json();
        })

        .catch((error) => {
          console.log(error);
          const errMsg = error?.response?.data?.message || error?.message;
          setIsLoading(false);
          if (error.response.data.code == "TOKEN_EXPIRED") {
            dispatch(httpStateActions.clean());
            dispatch(
              showNotifications({
                title: "Token expired",
                description: "Refreshing...",
                type: "INFO",
              })
            );
            axios({
              url: ApiRefreshToken(),
              method: "GET",
              headers: {
                Authorization:
                  "Bearer " + localStorage.getItem("refresh_token"),
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                if (response.data) {
                  console.log(response);
                  localStorage.setItem(
                    "access_token",
                    response.data.access_token
                  );
                  dispatch(
                    authActions.login({
                      accessToken: response.data.access_token,
                      refreshToken: response.data.refresh_token,
                      expirationDate: response.data.expirationDate,
                      userName: response.data.username,
                    })
                  );
                  sendRequest(
                    url,
                    method,
                    body,
                    headers,
                    appSpinner,
                    loadingState
                  );
                }
              })
              .catch((e) => {
                const errMsg = e?.response?.data?.message || e?.message;

                if (e.response.data.code == "REFRESH_TOKEN_EXPIRED") {
                  dispatch(
                    showNotifications({
                      title: "Refresh token expired",
                      description: "You were logged out!",
                      type: "INFO",
                    })
                  );
                  dispatch(logout());
                } else {
                  dispatch(
                    showError({
                      title: error.code,
                      description: errMsg,
                    })
                  );
                }
              });
          } else {
            // return error;
            dispatch(
              showError({
                title: error.code,
                description: errMsg,
              })
            );
            if (error.response.data.code == "REFRESH_TOKEN_EXPIRED") {
              dispatch(logout());
            }
            setError(error);
          }
        });
    },
    []
  );

  const clearData = useCallback(() => {
    setdata(initialData);
  }, []);

  const cleanUp = useCallback(() => {
    setError(null);
    setResHeaders(null);
    setIsLoading(false);
    // setdata(null);
    // source.cancel();
    dispatch(httpStateActions.clean());
  }, []);

  return {
    data,
    clearData,
    status,
    resHeaders,
    sendRequest,
    error,
    cleanUp,
    isLoading,
  };
};

export default useHttp;
