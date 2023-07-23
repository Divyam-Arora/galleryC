import { IconContext } from "react-icons";
import { MdClose } from "react-icons/md";
import classes from "./EmptyButton.module.css";

const EmptyButton = function ({ action, show, color = "inherit" }) {
  return (
    <IconContext.Provider value={{ size: "2rem", color: color }}>
      <span
        className={`${classes.empty} ${show ? "" : classes.hide}`}
        onClick={action}
      >
        <MdClose />
      </span>
    </IconContext.Provider>
  );
};

export default EmptyButton;
