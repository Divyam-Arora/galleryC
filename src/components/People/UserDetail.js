import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { personActions } from "../../store/person-slice";
import { userDetailActions } from "../../store/user-slice";
import { ApiEditUserIcon } from "../../util/apis";
import DeleteIcon from "../UI/Buttons/DeleteIcon";
import EditIcon from "../UI/Buttons/EditIcon";
import MediaCard from "../UI/MediaCard";
import classes from "./UserDetail.module.css";

const UserDetail = function () {
  const { item: user } = useSelector((state) => state.person);
  const userDetails = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className={classes.container}>
      <div className={classes.profile}>
        <MediaCard
          shape="circle"
          background={false}
          url={user.iconThumbnail}
          alt={user.username}
          fontSize={"4rem"}
        />
        <IconContext.Provider value={{ size: "2.5rem" }}>
          <div className={classes.actions}>
            <EditIcon
              API={ApiEditUserIcon()}
              size="2.5rem"
              action={(data) => {
                if (data) {
                  dispatch(userDetailActions.add({ ...data }));
                  dispatch(personActions.newItem({ item: data }));
                }
              }}
            />
            {userDetails.user.iconThumbnail && (
              <DeleteIcon
                API={ApiEditUserIcon()}
                action={(data) => {
                  if (data) {
                    dispatch(userDetailActions.add({ ...data }));
                    dispatch(personActions.newItem({ item: data }));
                  }
                }}
              />
            )}
          </div>
        </IconContext.Provider>
      </div>
      <div className="flex-column justify-start margin-top-lg">
        <h3 className="heading-secondary">{`${user.firstName} ${user.lastName}`}</h3>
        {/* <p>{`member since ${new Date(user.since).getFullYear()}`}</p> */}
        <p>{user.email}</p>
        {/* <div className="margin-top-lg">
          <IconContext.Provider value={{ size: "2rem" }}>
            <ButtonPrimary
              borderRadius={"10"}
              style={"primary"}
              onClick={() => {
                dispatch(logout());
              }}
            >
              <MdLogout />
              <p>Sign out</p>
            </ButtonPrimary>
          </IconContext.Provider>
        </div> */}
      </div>
    </div>
  );
};

export default UserDetail;
