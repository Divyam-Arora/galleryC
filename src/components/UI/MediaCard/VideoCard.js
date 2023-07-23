import classes from "./VideoCard.module.css";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { IconContext } from "react-icons";
import { useEffect, useRef, useState } from "react";

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
