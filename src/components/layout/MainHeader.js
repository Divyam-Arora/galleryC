import { useDispatch, useSelector } from "react-redux";

import { useRef, useState } from "react";
import logo from "../../Images/android-chrome-512x512.png";
import { userDetailActions } from "../../store/user-slice";
import { ApiEditUserIcon } from "../../util/apis";
import Upload from "../Media/Upload";
import DeleteModal from "../UI/Forms/DeleteModal";
import MediaCard from "../UI/MediaCard";
import classes from "./MainHeader.module.css";
import UserModal from "./UserModal";

const MainHeader = (props) => {
  const headerRef = useRef();
  const [userModal, setUserModalOpen] = useState({
    isOpen: false,
    headerBottomPos: 0,
    userBottomPos: 0,
  });
  const [isRemoving, setIsRemoving] = useState(false);
  const { userName, isLoggedIn } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const userModalOpenHandler = (e) => {
    const headerPos = headerRef.current.getBoundingClientRect();
    const userPos = e.currentTarget.getBoundingClientRect();
    setUserModalOpen({
      isOpen: true,
      headerBottomPos: headerPos.bottom,
      userBottomPos: userPos.bottom,
    });
    const listener = (e) => {
      if (!e.target.closest(`.${classes.user}`)) {
        setUserModalOpen({ ...userModal, isOpen: false });
        window.removeEventListener("click", listener);
      }
    };
    window.addEventListener("click", listener);
  };

  const userModalCloseHandler = (e) => {
    setUserModalOpen({ ...userModal, isOpen: false });
  };

  const onIconRemoved = (data) => {
    if (data) {
      dispatch(userDetailActions.add({ ...data }));

      // dispatch(personActions.newItem({ item: data }));
    }
    setIsRemoving(false);
  };

  return (
    <header
      ref={headerRef}
      id="header"
      className={
        props.pseudo
          ? classes.header + " " + classes["position-relative"]
          : classes.header
      }
    >
      <div className={`flex-row ${classes.logo}`}>
        <img src={logo} alt="my gallerie logo" />
        <h1 className="heading-primary">My Gallerie</h1>
      </div>
      {isLoggedIn && (
        <div className={classes.actions}>
          <Upload />
          <div className={classes.user} onClick={userModalOpenHandler}>
            <div>
              <MediaCard
                alt={userName}
                shape="circle"
                url={user?.iconThumbnail}
                background={false}
                fontSize={"3rem"}
              />
            </div>
            {userModal.isOpen && (
              <UserModal
                headerBottom={userModal.headerBottomPos}
                userBottom={userModal.userBottomPos}
                removeIconAction={() => {
                  setIsRemoving(true);
                }}
              />
            )}
          </div>
        </div>
      )}
      {isRemoving && (
        <DeleteModal
          API={ApiEditUserIcon()}
          action={onIconRemoved}
          tag={"Remove"}
          target={"Icon"}
          text="Permanently removes the icon."
        />
      )}
    </header>
  );
};

export default MainHeader;
