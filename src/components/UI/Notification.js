import { IconContext } from "react-icons";
import { MdCheckCircle, MdInfo, MdOutlineError } from "react-icons/md";
import classes from "./Notification.module.css";

const Notification = (props) => {
  let icon;
  let classname;
  console.log(props);

  switch (props.type) {
    case "INFO":
      icon = <MdInfo />;
      classname = classes.info;
      break;
    case "ALERT":
      icon = <MdOutlineError />;
      classname = classes.alert;
      break;
    case "SUCCESS":
      icon = <MdCheckCircle />;
      classname = classes.success;
      break;
    default:
      icon = <MdInfo />;
      classname = classes.info;
  }

  return (
    <div className={classes.notification}>
      <div className="flex-row width-100">
        <IconContext.Provider
          value={{ size: "2.4rem", className: `${classname} ${classes.icon}` }}
        >
          {icon}
        </IconContext.Provider>
        <p className="ellipsis height-100 width-100 flex-row justify-start">
          {props.description}
        </p>
      </div>
    </div>
  );
};

export default Notification;
