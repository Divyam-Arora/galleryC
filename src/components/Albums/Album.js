import { Link } from "react-router-dom";
import MediaCard from "../UI/MediaCard";
import classes from "./Album.module.css";
import { MdCheckCircle } from "react-icons/md";
import { IconContext } from "react-icons";

const Album = ({
  id,
  thumbnail,
  thumbnails = [],
  title,
  count,
  type = "card",
  date,
  selected = false,
}) => {
  return (
    <div className={`${classes.album} ${classes[type]}`}>
      <div className={classes.mediaContainer}>
        <IconContext.Provider
          value={{ size: "4rem", color: "var(--primaryColor)" }}
        >
          <div
            className={`${classes.selected} ${selected ? classes.active : ""}`}
          >
            <MdCheckCircle />
          </div>
        </IconContext.Provider>
        <MediaCard
          url={thumbnail}
          urlList={thumbnails}
          alt={title}
          shape={type == "list" ? "rectangle" : "square"}
        />
      </div>
      <div className={classes.info}>
        <h3 title={title} className="heading-tertiary ellipsis">
          {title}
        </h3>
        {date && (
          <p className={classes.date}>
            {new Date(date).toLocaleDateString("IND", {
              day: "numeric",
              month: "short",
              year: "2-digit",
            })}
          </p>
        )}
        <p className="text span-row">
          {count} item{count == 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
};

export default Album;
