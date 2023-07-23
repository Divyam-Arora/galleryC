import MediaCard from "../UI/MediaCard";
// import { useNavigate } from "react-router-dom";

import classes from "./MediaList.module.css";

const MediaList = ({
  media = [],
  action,
  selectedList = [],
  showDate = true,
}) => {
  // const navigate = useNavigate();
  const mediaClickHandler = (media, selected) => {
    action(media, selected);
  };

  // console.log(selectedList);
  // console.log(media);

  let lastDate = null;
  const getDateLabel = (date) => {
    const dateString = date.toDateString();
    // console.log(lastDate, date.getTime());
    // lastDate =
    if (dateString == lastDate) {
      return "";
    } else {
      lastDate = dateString;
      return (
        <p key={date.getTime()} className={`span-row ${classes.date}`}>
          <strong>{date.toDateString()}</strong>
        </p>
      );
    }
  };
  const mediaEl = Array.from(media).map((val) => {
    // console.log("media ---- " + val.id);
    return (
      <>
        {showDate && getDateLabel(new Date(val.date))}
        <div
          key={val.id}
          data-selected={selectedList.find((id) => id == val.id)}
          onClick={(e) => {
            mediaClickHandler(val, e.currentTarget.dataset.selected);
          }}
        >
          <MediaCard
            id={val.id}
            url={val.url}
            alt={val.alt}
            type={val.media_type}
            shape="rectangle"
            selected={selectedList.find((id) => id == val.id)}
          />
        </div>
      </>
    );
  });
  return <div className={`grid width-100`}>{mediaEl}</div>;
};

export default MediaList;
