import { useEffect, useRef } from "react";
import { IconContext } from "react-icons";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/http-hook";
import { logout } from "../../store/auth-actions";
import { userDetailActions } from "../../store/user-slice";
import { ApiEditUserIcon, ApiGetUserDetails } from "../../util/apis";
import ButtonPrimary from "../UI/ButtonPrimary";
import EditIcon from "../UI/Buttons/EditIcon";
import MediaCard from "../UI/MediaCard";
import classes from "./UserModal.module.css";
import UserModalSpinner from "./UserModalSpinner";

const UserModal = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.httpState);
  const modalRef = useRef();
  // console.log(error);
  const { data, resHeaders, sendRequest, cleanUp } = useHttp();

  useEffect(() => {
    // console.log(user);
    if (!user) {
      sendRequest(ApiGetUserDetails(), "GET", {}, {}, false);
    }

    return cleanUp;
  }, [user, cleanUp]);

  useEffect(() => {
    if (data) {
      dispatch(
        userDetailActions.add({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          username: data.username,
        })
      );
    }
  }, [data, dispatch]);

  const onIconSuccess = (data) => {
    if (data) {
      dispatch(userDetailActions.add({ ...data }));
      // dispatch(personActions.newItem({ item: data }));
    }
  };

  return (
    <div
      className={classes.userModal}
      ref={modalRef}
      style={{
        top: props.userBottom - 8,
        paddingTop: props.headerBottom - props.userBottom + 16,
      }}
    >
      <div className="text">
        {user ? (
          <div className={classes.info}>
            <div className="position-relative width-100">
              <MediaCard
                alt={user.username}
                shape="circle"
                url={user.iconThumbnail}
                fontSize={"8rem"}
              />
              <div className={classes.edit}>
                <IconContext.Provider value={{ size: "24px" }}>
                  <EditIcon API={ApiEditUserIcon()} action={onIconSuccess} />
                  {user.iconThumbnail && (
                    <span className="icon" onClick={props.removeIconAction}>
                      <MdDelete />
                    </span>
                  )}
                </IconContext.Provider>
              </div>
            </div>
            <p className="heading-tertiary">@ {user?.username}</p>
            <div className={classes.nameemail}>
              <p>{user.firstName + " " + user.lastName}</p>
              <p>{user?.email}</p>
            </div>
          </div>
        ) : (
          <>{isLoading && <UserModalSpinner />}</>
        )}
        <div className={classes.actions}>
          <ButtonPrimary
            size="max"
            onClick={() => {
              dispatch(logout());
            }}
          >
            <p className="flex-row width-100">
              <strong>Sign Out</strong>
            </p>
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
