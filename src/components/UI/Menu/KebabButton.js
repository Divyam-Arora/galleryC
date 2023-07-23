import { useRef } from "react";
import { GoKebabVertical } from "react-icons/go";
import classes from "./KebabButton.module.css";

const KebabButton = function ({ action }) {
  const menuRef = useRef();

  const menuClickHandler = () => {
    action();
  };
  return (
    <div ref={menuRef} className={classes.btn} onClick={menuClickHandler}>
      <GoKebabVertical />
    </div>
  );
};

export default KebabButton;
