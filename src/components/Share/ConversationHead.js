import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { BsDot } from "react-icons/bs";
import { MdCheckCircle, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { ApiUserIcon } from "../../util/apis";
import { getActivityText, getUserSubject } from "../../util/helpers";
import MediaCard from "../UI/MediaCard";
import classes from "./ConversationHead.module.css";
import DeleteGroupIconForm from "./DeleteGroupIconForm";
import EditGroupIconForm from "./EditGroupIconForm";
import GroupNameForm from "./GroupNameForm";

const ConversationHead = function ({
  name,
  size,
  isGroup,
  url,
  members = [],
  createdBy,
  createdAt,
  memberCount = 0,
  lastMedia,
  lastActivity,
  type = "list-item",
  selected = false,
}) {
  const { userName } = useSelector((state) => state.auth);
  const [isEditName, setIsEditName] = useState(false);
  const [groupName, setGroupName] = useState(name);
  const [iconURL, setIconURL] = useState(url);

  useEffect(() => {
    setGroupName(name);
  }, [name]);

  useEffect(() => {
    setIconURL(url);
  }, [url]);

  let headClassName = "";

  switch (type) {
    case "head":
      headClassName = "head";
      break;
    case "inline":
      headClassName = "inline";
      break;
    case "profile":
      headClassName = "profile";
      break;
    case "conversation":
      headClassName = "conversation";
      break;
  }

  const getConversationHead = () => {
    if (isGroup) return getGroupHead(groupName, members, memberCount);
    else return getUserHead(members);
  };

  const getUserHead = (members) => {
    return members?.[0]?.username || "No User";
  };

  const getGroupHead = (name, members, memberCount) => {
    if (name) return name;
    return (
      <>
        {members
          .slice(0, 2)
          .map((member) => member.username)
          .join(", ")}
        {memberCount > 2 ? (
          <span className="subtle-text">{` + ${memberCount - 2} more`}</span>
        ) : (
          ""
        )}
      </>
    );
  };

  const editNameAction = (value) => {
    value && setGroupName(value);
    setIsEditName(false);
  };

  return (
    <div
      className={`${classes.container} ${classes[headClassName]} ${
        size ? classes[size] : ""
      } ${selected ? classes.selected : ""}`}
    >
      <span
        className={`${classes["user-head"]} ${
          isGroup ? classes["group-head"] : ""
        }`}
      >
        {iconURL ? (
          <MediaCard alt={name || "group"} shape="circle" url={iconURL} />
        ) : members.length > 0 ? (
          members.slice(0, 2).map((member) => {
            if (member.iconThumbnail) {
              return (
                <div key={member.username} className={classes["user-icon"]}>
                  <MediaCard
                    alt={member?.username}
                    url={member.iconThumbnail}
                    shape="circle"
                    background={false}
                  />
                </div>
              );
            } else {
              return (
                <div className={classes["user-icon"]}>
                  <img src={ApiUserIcon} alt="user-icon" />
                </div>
              );
            }
          })
        ) : (
          <MediaCard alt="!" shape="circle" />
        )}
        {type == "profile" && isGroup && (
          <span className={classes.edit}>
            <IconContext.Provider value={{ size: "24px" }}>
              <EditGroupIconForm
                action={(item) => {
                  setIconURL(item?.iconThumbnail);
                }}
              />
              {iconURL && (
                <DeleteGroupIconForm
                  action={(item) => {
                    setIconURL(item?.iconThumbnail);
                  }}
                />
              )}
            </IconContext.Provider>
          </span>
        )}
      </span>
      <div
        className={`flex-column ${classes.details} ${
          type == "conversation" ? "gap-sm" : ""
        }`}
      >
        {type == "list-item" && (
          <>
            <p className="heading-tertiary">{getConversationHead()}</p>
            {lastActivity ? (
              <p>
                {getActivityText(
                  lastActivity.action,
                  getUserSubject(userName, lastActivity.by, isGroup, action),
                  lastActivity.targetId,
                  lastActivity.targetString
                )}
              </p>
            ) : (
              <p>{isGroup && memberCount + " members"}</p>
            )}
          </>
        )}
        {type == "head" && (
          <p className="heading-secondary">{getConversationHead()}</p>
        )}
        {type == "profile" && (
          <>
            <span className="flex-row">
              <p className="heading-secondary">{getConversationHead()}</p>
              {isGroup && (
                <span
                  className={classes.icon}
                  onClick={() => {
                    setIsEditName(true);
                  }}
                >
                  <MdEdit />
                </span>
              )}
            </span>
            {isGroup && (
              <p className="flex-row bold">
                Group <BsDot /> <span>{memberCount} members</span>
              </p>
            )}
            {isGroup && <p>Created By {createdBy}</p>}
            <p>{new Date(createdAt).toDateString()}</p>
          </>
        )}
        {type == "inline" && <p>{getConversationHead()}</p>}
        {type == "conversation" && (
          <>
            <p>
              <strong>{getConversationHead()}</strong>
            </p>
            {!isGroup ? (
              memberCount > 0 && (
                <p>{`${members?.[0]?.firstName} ${members?.[0]?.lastName}`}</p>
              )
            ) : (
              <p>{memberCount + " members"}</p>
            )}
          </>
        )}
      </div>
      <div className="margin-left-auto flex-row">
        {
          <span
            className={`${classes.check} ${
              selected ? classes.selected : ""
            } flex-row`}
          >
            <IconContext.Provider
              value={{ size: "3.2rem", color: "var(--secondaryColor)" }}
            >
              <MdCheckCircle />
            </IconContext.Provider>
          </span>
        }
        {lastActivity && (
          <p className="subtle-text height-100 margin-right">
            {new Date(lastActivity.on).toLocaleDateString("US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        )}
      </div>
      {isEditName && <GroupNameForm closeAction={editNameAction} name={name} />}
    </div>
  );
};

export default ConversationHead;
