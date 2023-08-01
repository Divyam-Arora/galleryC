import { useRef, useState } from "react";
import { IconContext } from "react-icons";
import { MdAdd, MdDelete, MdEdit, MdInfo, MdShare } from "react-icons/md";
import ButtonPrimary from "../ButtonPrimary";
import KebabButton from "./KebabButton";
import classes from "./Menu.module.css";
import MenuList from "./MenuList";

const icons = {
  add: <MdAdd />,
  new: <MdAdd />,
  create: <MdAdd />,
  delete: <MdDelete />,
  remove: <MdDelete />,
  edit: <MdEdit />,
  share: <MdShare />,
  info: <MdInfo />,
};

const Menu = function ({ menuItems = {} }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  // const [innerItems, setInnerItems] = useState({});
  // const [outerItems, setOuterItems] = useState({});
  let innerItems = {};
  let outerItems = {};
  const menuRef = useRef();
  // console.log(Object.keys(menuItems));

  // useEffect(() => {
  // console.log("useEffect running....");
  const width = window.innerWidth;
  let newOuterItems = {};
  let newInnerItems = { ...menuItems };
  const menuItemsKeys = Object.keys(menuItems);
  if (width > 1000 && menuItemsKeys.length > 0) {
    newOuterItems[menuItemsKeys[0]] = menuItems[menuItemsKeys[0]];
    delete newInnerItems[menuItemsKeys[0]];
  }
  if (width > 1200 && menuItemsKeys.length > 1) {
    newOuterItems[menuItemsKeys[1]] = menuItems[menuItemsKeys[1]];
    delete newInnerItems[menuItemsKeys[1]];
  }
  // setInnerItems(newInnerItems);
  // setOuterItems(newOuterItems);
  innerItems = newInnerItems;
  outerItems = newOuterItems;
  // if (width > 1000 && menuItemsKeys.length > 0) {
  //   setOuterItems((state) => {
  //     state[menuItemsKeys[0]] = menuItems[menuItemsKeys[0]];
  //     delete menuItems[menuItemsKeys[0]];
  //     return { ...state };
  //   });
  // }
  // if (width > 1200 && menuItemsKeys.length > 1) {
  //   setOuterItems((state) => {
  //     state[menuItemsKeys[1]] = menuItems[menuItemsKeys[1]];
  //     delete menuItems[menuItemsKeys[1]];
  //     return { ...state };
  //   });
  // }
  // }, [menuItems]);
  // useEffect(() => {

  // }, [menuItems]);

  const menuClickHandler = () => {
    setIsMenuOpen(true);
    const listener = (e) => {
      e.preventDefault();
      if (!e.target.closest("#menu-container")) {
        setIsMenuOpen(false);
        document.removeEventListener("click", listener);
      }
    };
    document.addEventListener("click", listener);
  };

  return (
    <>
      <IconContext.Provider value={{ size: "2rem" }}>
        <div className="flex-row height-100">
          {Object.keys(outerItems).map((item) => (
            <ButtonPrimary key={item} onClick={outerItems[item]} type="button">
              {icons[item.split(" ")[0].toLowerCase()]}
              {item}
            </ButtonPrimary>
          ))}
          {/* <ButtonPrimary>{Object.keys(menuItems)[0]}</ButtonPrimary>
        <ButtonPrimary>{Object.keys(menuItems)[1]}</ButtonPrimary> */}
          {Object.keys(innerItems).length > 0 && (
            <div className={classes.menu} id="menu-container">
              <KebabButton action={menuClickHandler} />
              {isMenuOpen && (
                <MenuList
                  action={() => {
                    setIsMenuOpen(false);
                  }}
                  menuItems={innerItems}
                />
              )}
            </div>
          )}
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Menu;
