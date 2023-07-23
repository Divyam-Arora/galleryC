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
      <div className="flex-row">
        <IconContext.Provider value={{ size: "24px", className: classname }}>
          {icon}
        </IconContext.Provider>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default Notification;
