import { useNavigate } from "react-router-dom";
import PersonHead from "../People/PersonHead";
import ButtonPrimary from "../UI/ButtonPrimary";
import MediaCard from "../UI/MediaCard";
import ConversationHead from "./ConversationHead";
import classes from "./ConversationMedia.module.css";

const ConversationMedia = function ({ media, owner, date }) {
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <MediaCard alt={media.alt} type={media.media_type} url={media.url} />
      {owner && (
        <div className={classes.top}>
          {owner && (
            <span className={classes.owner}>
              <PersonHead username={owner.username} url={owner.iconThumbnail} />
            </span>
          )}
        </div>
      )}
      {date && (
        <div className={classes.bottom}>
          {date && (
            <span className={classes.date}>
              {new Date(date).toLocaleString("US", {
                hour: "2-digit",
                minute: "2-digit",
                hourCycle: "h23",
              })}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ConversationMedia;
