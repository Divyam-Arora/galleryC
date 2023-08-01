import { IconContext } from "react-icons";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import classes from "./VideoCard.module.css";

const VideoCard = (props) => {
  return (
    <div>
      <IconContext.Provider value={{ size: "40px" }}>
        <span className={classes.videoIcon}>
          <MdOutlinePlayCircleFilled />
        </span>
      </IconContext.Provider>
      <div
        style={{
          backgroundImage: `url("${props.url}")`,
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
};

export default VideoCard;
