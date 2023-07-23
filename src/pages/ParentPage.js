import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import MainHeader from "../components/layout/MainHeader";
import MainNavigation from "../components/layout/MainNavigation";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NotificationList from "../components/UI/NotificationList";
import useHttp from "../hooks/http-hook";
import { ApiGetUserDetails } from "../util/apis";
import { userDetailActions } from "../store/user-slice";
import MobileNavigation from "../components/layout/MobileNavigation";
import UploadInfo from "../components/Media/UploadInfo";

const ParentPage = function (props) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { isLoading, appSpinner } = useSelector((state) => state.httpState);
  const { data, sendRequest } = useHttp();
  const dispatch = useDispatch();
  const uploads = useSelector((state) => state.upload);
  // console.log(appSpinner);

  useEffect(() => {
    // console.log(navigate);
    if (!isLoggedIn) {
      navigate("/auth", { replace: true });
    } else {
      sendRequest(ApiGetUserDetails(), "GET", {}, {}, false, false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (data) {
      dispatch(userDetailActions.add({ ...data }));
    }
  }, [data]);

  return (
    <>
      {isLoggedIn && (
        <>
          <div className="main">
            <MainHeader />
            <MainNavigation />

            <div
              className={`content ${isLoading && appSpinner ? "loading" : ""}`}
            >
              {(uploads.active.length > 0 || uploads.passive.length) > 0 && (
                <UploadInfo />
              )}
              {/* {isLoading && appSpinner && <LoadingSpinner />} */}
              <Outlet />
            </div>
            <MobileNavigation />
          </div>
        </>
      )}
    </>
  );
};

export default ParentPage;
