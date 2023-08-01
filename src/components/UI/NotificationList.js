import { useRef } from "react";
import Notification from "./Notification";

import classes from "./NotificationList.module.css";

const NotificationList = (props) => {
  const listRef = useRef();
  // useEffect(() => {
  //   listRef.current.style.height =
  //     props?.notifications.length * (32 + 100) + "px";
  // });
  return (
    <div className={classes.notificationList} ref={listRef}>
      {props.notifications.map((noti) => {
        return <Notification key={noti.id} {...noti} />;
      })}
    </div>
  );
};

export default NotificationList;
