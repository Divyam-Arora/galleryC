import { useSelector } from "react-redux";
import MediaCard from "../UI/MediaCard";
import classes from "./PersonHead.module.css";
import { BsDot } from "react-icons/bs";
import { MdCheckCircle } from "react-icons/md";
import { IconContext } from "react-icons";

const PersonHead = function ({
  url,
  username,
  fullname,
  type = "head",
  admin = null,
  selected = false,
}) {
  const { userName } = useSelector((state) => state.auth);
  return (
    <div
      className={`flex-row justify-start ${classes.container} ${
        classes[type]
      } ${selected ? classes.selected : ""}`}
    >
      <div>
        <MediaCard shape="circle" alt={username} url={url} background={false} />
      </div>
      <article className="flex-column gap-sm">
        <p className="flex-row">
          <strong>{username}</strong>
          {username == userName ? (
            <>
              <BsDot />
              (You)
            </>
          ) : (
            ""
          )}
        </p>
        {fullname && <p>{fullname}</p>}
      </article>
      {admin && admin == username && <p className={classes.admin}>Admin</p>}
      <span className={`${classes.check} flex-row`}>
        <IconContext.Provider
          value={{ size: "3.2rem", color: "var(--secondaryColor)" }}
        >
          <MdCheckCircle />
        </IconContext.Provider>
      </span>
    </div>
  );
};

export default PersonHead;
