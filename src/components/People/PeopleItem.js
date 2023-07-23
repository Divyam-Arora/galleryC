import MediaCard from "../UI/MediaCard";

import classes from "./PeopleItem.module.css";

const PeopleItem = (props) => {
  return (
    <>
      <div className="flex-column align-center">
        <MediaCard
          url={props.iconThumbnail}
          alt={props.username}
          shape="circle"
          type="image"
          background={false}
          fontSize={"4rem"}
        />
        <div className={`flex-column align-center ${classes.details}`}>
          <p className={`heading-tertiary`}>{props.username}</p>
          <p>
            {props.firstName} {props.lastName}
          </p>
        </div>
      </div>
    </>
  );
};

export default PeopleItem;
