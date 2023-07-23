import { useSelector } from "react-redux";
import Modal from "../UI/Modal";
import classes from "./MediaInfo.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Album from "../Albums/Album";
import ConversationHead from "../Share/ConversationHead";
import useHttp from "../../hooks/http-hook";
import { ApiGetMediaAlbums, ApiGetMediaConversations } from "../../util/apis";
import UserModalSpinner from "../layout/UserModalSpinner";
import ButtonPrimary from "../UI/ButtonPrimary";
import {
  MdEvent,
  MdImage,
  MdOndemandVideo,
  MdOutlineImage,
  MdPhotoSizeSelectLarge,
  MdShortText,
} from "react-icons/md";
import { IconContext } from "react-icons";
import { getSize } from "../../util/helpers";
import PersonHead from "../People/PersonHead";

const MediaInfo = function ({ type = "info", action }) {
  const { item: media } = useSelector((state) => state.media);
  const [list, setList] = useState([]);
  const { sendRequest, data, cleanUp, isLoading } = useHttp();

  useEffect(() => {
    switch (type) {
      case "albums":
        sendRequest(ApiGetMediaAlbums(media.id), "GET", {}, {}, false);
        break;
      case "conversations":
        sendRequest(ApiGetMediaConversations(media.id), "GET", {}, {}, false);
        break;
    }
  }, []);

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  const albums = (
    <ul className="grid grid-col-2 row-gap">
      {list.map((album) => (
        <li key={album.id}>
          <Link to={`/albums/${album.id}`}>
            <Album
              type="card"
              id={album.id}
              count={album.mediaCount}
              date={album.createdAt}
              // img={album.thumbnail}
              thumbnails={album.thumbnails}
              title={album.name}
            />
          </Link>
        </li>
      ))}
    </ul>
  );

  const conversations = (
    <ul className="flex-column">
      {list.map((conversation) => (
        <li key={conversation.id}>
          <Link to={`/conversations/${conversation.id}`}>
            <ButtonPrimary
              style={"subtle"}
              size="max"
              borderRadius={20}
              shape="square"
            >
              <ConversationHead
                type="conversation"
                size={"large"}
                isGroup={conversation.group}
                name={conversation.name}
                members={conversation.members}
                memberCount={conversation.memberCount}
                url={conversation.iconThumbnail}
              />
            </ButtonPrimary>
          </Link>
        </li>
      ))}
    </ul>
  );

  const info = (
    <IconContext.Provider
      value={{ size: "2.5rem", color: "var(--secondaryColor)" }}
    >
      <div className="flex-column align-start" style={{ gap: "3rem" }}>
        <div className={classes["info-section"]}>
          <span></span>
          <PersonHead
            username={media.owner.username}
            url={media.owner.iconThumbnail}
            fullname={`${media.owner.firstName} ${media.owner.lastName}`}
            type="list-item"
          />
        </div>
        <div className={classes["info-section"]}>
          <span className="span-column">
            <MdShortText />
          </span>
          <p className="width-100" title={media.name}>
            {media.name}
          </p>
        </div>
        <div className={classes["info-section"]}>
          <span className="span-column">
            <MdEvent />
          </span>
          <p>{new Date(media.createdAt).toDateString()}</p>
          <p className="subtle-text">
            {new Date(media.createdAt).toTimeString()}
          </p>
        </div>
        <div className={classes["info-section"]}>
          <span className="span-column">
            <MdPhotoSizeSelectLarge />
          </span>
          <p>{getSize(media.size)}</p>
          <p className="subtle-text">
            {media.width} x {media.height}
          </p>
        </div>
        <div className={classes["info-section"]}>
          <span className="span-column">
            {media.contentType.toLowerCase() == "image" ? (
              <MdOutlineImage />
            ) : (
              <MdOndemandVideo />
            )}
          </span>
          <p>
            {media.contentType[0].toUpperCase() + media.contentType.slice(1)}
          </p>
          <p className="subtle-text">{media.contentSubType}</p>
        </div>
      </div>
    </IconContext.Provider>
  );

  return (
    <Modal action={action} initialReset={true}>
      <section className={`${classes.section} ${classes[type]}`}>
        <div className="modal-heading modal-padding">
          <h3 className="heading-tertiary">
            {type.at(0).toUpperCase() + type.substring(1)}
          </h3>
        </div>

        <div className={classes.container}>
          {type == "albums" && albums}
          {type == "conversations" && conversations}
          {type == "info" && info}
          {isLoading && (
            <div className="flex-row">
              <UserModalSpinner />
            </div>
          )}
        </div>
      </section>
    </Modal>
  );
};

export default MediaInfo;
