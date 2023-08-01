import { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import {
  MdAddCircle,
  MdAddCircleOutline,
  MdChatBubble,
  MdChatBubbleOutline,
  MdOutlinePhotoAlbum,
  MdOutlinePhotoLibrary,
  MdPeople,
  MdPerson,
  MdPhotoAlbum,
  MdPhotoLibrary,
  MdSearch,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Upload from "../Media/Upload";
import classes from "./MobileNavigation.module.css";

const MobileNavigation = function () {
  const [isMore, setIsMore] = useState(false);
  const { userName } = useSelector((state) => state.auth);
  const moreRef = useRef();
  const navigate = useNavigate();
  const checkActive = ({ isActive }) => {
    return isActive ? classes.active : classes.inactive;
  };

  useEffect(() => {
    const listner = (e) => {
      if (!e.target.closest(`.${classes.more}`)) {
        setIsMore(false);
        document.removeEventListener("click", listner);
      }
    };
    if (isMore) {
      document.addEventListener("click", listner);
    }
  }, [isMore]);

  return (
    <div className={classes.container}>
      <IconContext.Provider value={{ size: "2.5rem" }}>
        <ul className={classes.list}>
          <li>
            <NavLink className={checkActive} to={"/"}>
              <div className={classes.item}>
                <span className={`${classes.activeIcon} flex-row`}>
                  <MdPhotoLibrary />
                </span>
                <span className="flex-row">
                  <MdOutlinePhotoLibrary />
                </span>
              </div>
              {/* <p>Home</p> */}
            </NavLink>
          </li>
          <li>
            <NavLink className={checkActive} to={"/explore"}>
              <div className={classes.item}>
                <span className={`${classes.activeIcon} flex-row`}>
                  <MdSearch />
                </span>
                <span className="flex-row">
                  <MdSearch />
                </span>
              </div>
              {/* <p>Explore</p> */}
            </NavLink>
          </li>
          <li>
            <div
              className={`${classes.item} ${isMore ? classes.active : ""} ${
                classes.more
              }`}
              onClick={(e) => {
                // e.preventDefault();
                // if (!e.target.closest(`.${classes.extras}`)) {
                setIsMore((s) => !s);
                // }
              }}
            >
              <div className={classes.extras}>
                <span onClick={() => navigate("/people")}>
                  <MdPeople />
                </span>
                <span style={{ padding: 0 }}>
                  <Upload />
                  {/* <MdUpload /> */}
                </span>
                <span onClick={() => navigate(`/people/${userName}`)}>
                  <MdPerson />
                </span>
              </div>
              <div className={`width-100 height-100 ${classes.extra}`}>
                <span className={`${classes.activeIcon} flex-row`}>
                  <MdAddCircle />
                </span>
                <span className="flex-row">
                  <MdAddCircleOutline />
                </span>
              </div>
            </div>
            {/* <p>More</p> */}
          </li>
          <li>
            <NavLink className={checkActive} to={"/conversations"}>
              <div className={classes.item}>
                <span className={`${classes.activeIcon} flex-row`}>
                  <MdChatBubble />
                </span>
                <span className="flex-row">
                  <MdChatBubbleOutline />
                </span>
              </div>
              {/* <p>Share</p> */}
            </NavLink>
          </li>
          <li>
            <NavLink className={checkActive} to={"/albums"}>
              <div className={classes.item}>
                <span className={`${classes.activeIcon} flex-row`}>
                  <MdPhotoAlbum />
                </span>
                <span className="flex-row">
                  <MdOutlinePhotoAlbum />
                </span>
              </div>
              {/* <p>Albums</p> */}
            </NavLink>
          </li>
        </ul>
      </IconContext.Provider>
    </div>
  );
};

export default MobileNavigation;
