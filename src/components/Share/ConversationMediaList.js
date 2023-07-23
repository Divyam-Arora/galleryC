import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MediaCard from "../UI/MediaCard";
import ConversationMedia from "./ConversationMedia";
import classes from "./ConversationMediaList.module.css";
import { actions, getActivity, getUserSubject } from "../../util/helpers";

const ConversationMediaList = function () {
  const { list: activities, item: conversation } = useSelector(
    (state) => state.conversation
  );
  const { userName } = useSelector((state) => state.auth);

  const getConversationActivity = (activity) => {
    if (activity.action == actions.Shared) {
      return (
        <div className={classes.media}>
          <h4>{activity.by.username}</h4>
          <Link to={`/media/${activity.target.id}`}>
            <ConversationMedia media={activity.target} date={activity.on} />
          </Link>
        </div>
      );
    } else if (
      activity.action == actions.Added ||
      activity.action == actions.Removed
    ) {
      return (
        <div className={classes.media}>
          <p>
            {`${getUserSubject(
              userName,
              activity.by.username,
              conversation.group
            )} ${activity.action} `}
            <Link to={`/people/${activity.target}`}>
              <strong>{activity.target}</strong>
            </Link>
          </p>
        </div>
      );
    } else {
      return (
        <div className={classes.media}>
          <p>
            {
              getActivity(
                activity.action,

                userName == activity.by.username ? "you" : activity.by.username,
                activity.target
              ).text
            }
          </p>
        </div>
      );
    }
  };

  let lastDate = null;
  return (
    <ul
      className={`${classes.list} ${
        !conversation.group ? classes.personal : ""
      }`}
    >
      {activities.map((activity, i) => {
        const isDateSame =
          new Date(activity.on).toDateString() ==
          new Date(activities?.[i + 1]?.on).toDateString();
        const isUnshared = activity.action != actions.Shared;
        const isUserSame =
          activities?.[i + 1]?.by.username == activity.by.username;
        const toHideProfile =
          (activities?.[i + 1]?.by.username == activity.by.username &&
            activities?.[i + 1]?.action == actions.Shared &&
            isDateSame) ||
          isUnshared
            ? classes.hide
            : "";
        return (
          activity.action != actions.UnShared_Activity && (
            <li key={activity.id}>
              {!isDateSame && (
                <p
                  className="flex-row margin-bottom margin-top subtle-text"
                  title={new Date(activity.sharedOn).toDateString()}
                >
                  {moment(activity.on).fromNow(false)}
                </p>
              )}
              <div
                className={`${classes.container} ${
                  activity.by.username == userName ? classes.user : ""
                } ${
                  classes[
                    getActivity(activity.action, activity.by, activity.target)
                      .tag
                  ]
                } ${toHideProfile} ${isUserSame ? classes.same : ""}`}
              >
                <div className={`${classes.profile}`}>
                  <MediaCard
                    alt={activity.by.username}
                    url={activity.by.iconThumbnail}
                    shape="circle"
                    background={false}
                  />
                </div>
                <div
                  key={activity.id}
                  className={`${classes["media-container"]} `}
                >
                  {getConversationActivity(activity)}
                </div>
              </div>
            </li>
          )
        );
      })}
    </ul>
  );
};

export default ConversationMediaList;
