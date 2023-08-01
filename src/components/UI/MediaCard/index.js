import { useState } from "react";
import { IconContext } from "react-icons";
import { BsPlayCircleFill } from "react-icons/bs";
import classes from "./MediaCard.module.css";

const MediaCard = ({
  type = "",
  alt = "",
  selected = false,
  shape = "rectangle",
  url = null,
  urlList,
  thumbnail,
  background = true,
  fontSize = null,
}) => {
  const [altText, setAltText] = useState();
  const isVideo = type.toLowerCase().includes("video") ? true : false;
  const videoIcon = (
    <IconContext.Provider value={{ size: "5rem" }}>
      <span className={classes.videoIcon}>
        <BsPlayCircleFill />
      </span>
    </IconContext.Provider>
  );

  const letterThumb = (
    <span
      key={alt}
      className={classes.thumb}
      style={{ fontSize: fontSize || "5vw" }}
    >
      {alt.charAt(0)}
    </span>
  );

  const thumbComp = (url) =>
    url && (
      <>
        <img
          key={url}
          src={url}
          loading="lazy"
          alt={alt}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            setAltText(alt);
          }}
        />
        {altText && <p className={`${classes.alt} subtle-text`}>{altText}</p>}
        {isVideo && videoIcon}
      </>
    );

  return (
    <>
      <div
        className={`${classes.media} ${classes[shape]} ${
          selected ? classes.selected : ""
        } ${urlList?.length > 1 ? classes.album : ""}`}
      >
        <div
          title={alt}
          className={background || !url ? "" : classes.transparent}
        >
          {/* {isVideo && videoIcon} */}
          {!url && !urlList && letterThumb}
          {urlList && urlList.length == 0 && letterThumb}
          {!urlList || urlList.length < 2
            ? thumbComp(url || urlList?.[0])
            : [...urlList].reverse().map((url) => thumbComp(url))}
        </div>
      </div>
    </>
  );
};

export default MediaCard;
