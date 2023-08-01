import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

import { IconContext } from "react-icons";
import {
  MdOutlineCollections,
  MdOutlineFolderShared,
  MdOutlinePeopleAlt,
  MdOutlinePhotoAlbum,
  MdOutlineSearch,
} from "react-icons/md";

const links = [
  {
    link: "/",
    icon: <MdOutlineCollections />,
    text: "All Media",
  },
  {
    link: "/explore",
    icon: <MdOutlineSearch />,
    text: "Explore",
  },
  {
    link: "/conversations",
    icon: <MdOutlineFolderShared />,
    text: "Sharing",
  },
  {
    link: "/albums",
    icon: <MdOutlinePhotoAlbum />,
    text: "Albums",
  },
  {
    link: "/people",
    icon: <MdOutlinePeopleAlt />,
    text: "People",
  },
];

const MainNavigation = () => {
  const checkActive = ({ isActive }) => {
    return isActive ? classes.active : "";
  };
  return (
    <nav className={classes.nav}>
      <IconContext.Provider value={{ size: "20px" }}>
        <ul className="text">
          {links.map((linkObj) => (
            <li key={linkObj.text} className={classes.button}>
              <NavLink
                className={checkActive}
                to={linkObj.link}
                preventScrollReset={true}
              >
                <div>
                  <span className={classes.icon}>{linkObj.icon}</span>
                  <p>{linkObj.text}</p>
                  <span></span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </IconContext.Provider>
    </nav>
  );
};

export default MainNavigation;
