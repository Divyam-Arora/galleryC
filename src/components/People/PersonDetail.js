import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ConversationMedia from "../Share/ConversationMedia";
import ButtonPrimary from "../UI/ButtonPrimary";
import MediaCard from "../UI/MediaCard";
import classes from "./PersonDetail.module.css";
import SharedGroups from "./SharedGroups";

const PersonDetail = function () {
  const { item: person, list: sharedMedia } = useSelector(
    (state) => state.person
  );
  const [groupModal, setGroupModal] = useState({
    isOpen: false,
    type: "",
    options: { username: person?.username, mediaId: 0 },
  });

  const closeGroupsAction = () => {
    setGroupModal({
      isOpen: false,
      type: "",
      options: { ...groupModal.options },
    });
  };

  return (
    <div className="flex-column">
      <div className={classes.person}>
        <div className={classes.profile}>
          <MediaCard
            shape="circle"
            alt={person?.username}
            url={person?.iconThumbnail}
            background={false}
            fontSize={"4rem"}
          />
        </div>
        <div className={classes.details}>
          {/* <p className={`heading-secondary ${classes.username}`}>
            {person.username}
          </p> */}
          <div>
            <p className={`heading-secondary ${classes.name}`}>
              {person?.firstName} {person?.lastName}
            </p>
            <p>Member since {new Date(person?.since).getFullYear()}</p>
          </div>
          <div className={classes.info}>
            <p>
              <span className="heading-tertiary margin-right-sm">
                {person?.sharedMediaCount}
              </span>
              share{person?.sharedMediaCount == 1 ? "" : "s"}
            </p>
            <ButtonPrimary
              style={"subtle"}
              type={"button"}
              disabled={!person.sharedGroupCount}
              onClick={() => {
                setGroupModal({
                  isOpen: true,
                  type: "sharedGroups",
                  options: { ...groupModal.options },
                });
              }}
            >
              <p>
                <span className="heading-tertiary margin-right-sm">
                  {person?.sharedGroupCount}
                </span>
                group{person?.sharedGroupCount == 1 ? "" : "s"}
              </p>
            </ButtonPrimary>
          </div>
        </div>
      </div>
      <div className={`flex-column ${classes["media-container"]}`}>
        <h2 className="heading-secondary">Shared Media</h2>
        <ul className="grid">
          {sharedMedia.map((m) => (
            <li key={m.id} className="flex-column position-relative">
              <Link to={`/media/${m.id}`}>
                <ConversationMedia
                  media={m}
                  date={m.sharedOn}
                  owner={m.owner}
                />
              </Link>
              {m.conversationCount && (
                <span className={classes.conversation}>
                  <ButtonPrimary
                    style={"inline"}
                    disabled={!m?.conversationCount}
                    type={"button"}
                    onClick={() => {
                      setGroupModal({
                        isOpen: true,
                        type: "sharedMediaConversations",
                        options: {
                          ...groupModal.options,
                          mediaId: m.id,
                          owner: m.owner.username,
                        },
                      });
                    }}
                  >
                    {`${m.conversationCount} conversation${
                      m.conversationCount == 1 ? "" : "s"
                    }`}
                  </ButtonPrimary>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      {groupModal.isOpen && (
        <SharedGroups
          closeAction={closeGroupsAction}
          type={groupModal.type}
          options={groupModal.options}
        />
      )}
    </div>
  );
};

export default PersonDetail;
