import MediaCard from "../UI/MediaCard";

import classes from "./Event.module.css";

const Event = ({ id, img, title, count, type }) => {
  return (
    <div className={classes.event}>
      <MediaCard url={img} alt={title} type={type} shape="rectangle" />
      <div className={classes.info}>
        <h5 className="heading-tertiary">{title}</h5>
        <p>
          {count} item{count > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};

export default Event;
