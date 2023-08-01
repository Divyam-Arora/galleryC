import { useEffect, useMemo, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { FaHashtag } from "react-icons/fa";
import {
  MdAdd,
  MdFullscreen,
  MdFullscreenExit,
  MdInfo,
  MdShare,
} from "react-icons/md";
import { useSelector } from "react-redux";
import {
  Link,
  createSearchParams,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ApiBasePublicUrl } from "../../util/apis";
import Album from "../Albums/Album";
import ConversationHead from "../Share/ConversationHead";
import ButtonPrimary from "../UI/ButtonPrimary";
import Menu from "../UI/Menu";
import BackgroundLoader from "../UI/Spinner/BackgroundLoader";
import AlbumsForm from "./AlbumsForm";
import DeleteForm from "./DeleteForm";
import classes from "./Media.module.css";
import MediaInfo from "./MediaInfo";
import ShareForm from "./ShareForm";
import TagForm from "./TagForm";

const Media = (props) => {
  const [isAlbumForm, setIsAlbumForm] = useState(false);
  const [isShareForm, setIsShareForm] = useState(false);
  const [isTagForm, setIsTagForm] = useState(false);
  const [isDeleteForm, setIsDeleteForm] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { item: media } = useSelector((state) => state.media);
  const { userName } = useSelector((state) => state.auth);
  const { error, isLoading } = useSelector((state) => state.httpState);
  const { mediaId } = useParams();
  const containerRef = useRef();
  const videoRef = useRef();
  const [mediaInfo, setMediaInfo] = useState({ isOpen: false, type: null });
  const navigate = useNavigate();

  const menuItems = useMemo(() => {
    const menu = {
      "Add Tag": () => {
        setIsTagForm(true);
      },
      Delete: () => {
        setIsDeleteForm(true);
      },
      "Add to Album": () => {
        setIsAlbumForm(true);
      },
      Download: () => {
        fetch(media?.hd_url)
          .then((data) => data.blob())
          .then((blob) => {
            const link = document.createElement("a");
            link.download = media?.name;
            link.target = "_blank";
            const href = URL.createObjectURL(blob);
            link.href = href;
            link.click();
            URL.revokeObjectURL(href);
          });
      },
    };

    return media?.owner?.username == userName ? menu : {};
  }, [media?.id]);

  useEffect(() => {
    document.addEventListener("fullscreenchange", (e) => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      } else {
        setIsFullscreen(true);
      }
    });

    // return () => {
    //   if (media?.contentType == "video") {
    //     const videoEl = videoRef.current;
    //     videoEl.pause();
    //     videoEl.removeAttribute("src");
    //     videoEl.src = "";
    //     videoEl.load();
    //   }
    // };
  }, []);
  const closeAlbumFormAction = (data) => {
    setIsAlbumForm(false);
  };

  const closeShareFormAction = (data) => {
    setIsShareForm(false);
  };

  const closeTagFormAction = (data) => {
    setIsTagForm(false);
  };

  const closeDeleteFormAction = (isSuccess) => {
    setIsDeleteForm(false);
    isSuccess && navigate("/");
  };

  const imageComp = (
    <>
      <img
        className={classes.media}
        height={media?.height}
        width={media?.width}
        src={`${ApiBasePublicUrl}media/${mediaId}/file/original`}
        alt={media?.alt}
      />
    </>
  );

  // useEffect(() => {
  //   const player =
  //     media &&
  //     videojs(videoRef.current, {
  //       sources: [
  //         {
  //           src: media?.hd_url,
  //           type: "video/mp4",
  //         },
  //       ],
  //     });
  // }, [media]);

  // const videoComp = (
  //   <video ref={videoRef} id="video-js" controls data-vjs-player></video>
  // );

  const videoComp = (
    <video
      ref={videoRef}
      alt={media?.alt}
      id="video"
      className={`${classes.media} video-js vjs-theme-fantasy`}
      data-setup="{}"
      controls
      poster={`${ApiBasePublicUrl}media/${mediaId}/file/thumbnail`}
      autoPlay
    >
      <source src={media?.hd_url} type="video/mp4"></source>
      {/* <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"></source> */}
    </video>
  );

  // const videoComp = (
  //   <VideoPlayer
  //     src={media?.hd_url}
  //     // src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  //     type={"mp4"}
  //     poster={`${ApiBasePublicUrl}media/${mediaId}/file/thumbnail`}
  //     controls={true}
  //   />
  // );

  return (
    <>
      <div className="content-header" style={{ minHeight: "5rem" }}>
        {isLoading && media?.id != mediaId ? (
          <BackgroundLoader height={"100%"} width={"30%"} animate={true} />
        ) : (
          <>
            <h2
              title={media?.name}
              className={`heading-secondary ellipsis ${classes.title}`}
            >
              {media?.name || error?.message}
            </h2>

            <div className="flex-row">
              <IconContext.Provider value={{ size: "2rem" }}>
                <ButtonPrimary
                  compact={true}
                  onClick={() => {
                    setMediaInfo({ isOpen: true, type: "info" });
                  }}
                >
                  <MdInfo />
                  <p>Info</p>
                </ButtonPrimary>
                {media?.owner?.username == userName && (
                  <>
                    {" "}
                    <ButtonPrimary
                      compact={true}
                      onClick={() => {
                        setIsShareForm(true);
                      }}
                    >
                      <MdShare />
                      <p>Share</p>
                    </ButtonPrimary>
                  </>
                )}
                <Menu menuItems={menuItems} />
              </IconContext.Provider>
            </div>
          </>
        )}
      </div>
      <div className="subcontent">
        <section className={`${classes.container}`}>
          {
            <IconContext.Provider value={{ size: "2rem" }}>
              <div
                ref={containerRef}
                className={`${classes.mediaContainer} ${classes.fullscreen}`}
              >
                <div
                  className={classes.psedu}
                  style={{
                    backgroundImage: `url("${ApiBasePublicUrl}media/${mediaId}/file/thumbnail")`,
                  }}
                >
                  {media &&
                    (media?.contentType == "video" ? videoComp : imageComp)}
                </div>
                {media?.contentType == "image" && (
                  <div className={classes.actions}>
                    <IconContext.Provider
                      value={{
                        size: "4rem",
                        color: "var(--primaryBackgroundColor)",
                      }}
                    >
                      <span
                        onClick={(e) => {
                          if (!isFullscreen) {
                            containerRef.current.requestFullscreen();
                          } else {
                            document.exitFullscreen();
                          }
                        }}
                      >
                        {!isFullscreen ? (
                          <MdFullscreen />
                        ) : (
                          <MdFullscreenExit />
                        )}
                      </span>
                    </IconContext.Provider>
                  </div>
                )}
              </div>
              <div className={`flex-column ${classes.details}`}>
                {media?.tags.length > 0 && (
                  <ul className="flex-row justify-start flex-wrap">
                    <li>
                      <FaHashtag />
                    </li>
                    {media.tags.map((tag) => (
                      <li key={tag}>
                        <Link
                          to={{
                            pathname: "/explore",
                            hash: "#0",
                            search: createSearchParams({
                              target: "tag",
                              s: tag.toLowerCase(),
                            }).toString(),
                          }}
                        >
                          <ButtonPrimary style={"secondary"}>
                            <strong>{tag}</strong>
                          </ButtonPrimary>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {media?.albums?.length > 0 && (
                  <div className={classes.listContainer}>
                    <div className="flex-row justify-start margin-bottom-sm">
                      <ButtonPrimary
                        style={"inline"}
                        onClick={() =>
                          setMediaInfo({ isOpen: true, type: "albums" })
                        }
                      >
                        <h4 className="heading-secondary">Albums</h4>
                      </ButtonPrimary>
                      <ButtonPrimary
                        style={"secondary"}
                        onClick={() => {
                          setIsAlbumForm(true);
                        }}
                      >
                        <MdAdd />
                      </ButtonPrimary>
                    </div>
                    <ul className="grid grid-col-5 hide-rows">
                      {media.albums.map((album) => (
                        <li key={album.id} className="width-100">
                          <Link to={`/albums/${album.id}`}>
                            <Album
                              id={album.id}
                              count={album.mediaCount}
                              title={album.name}
                              // img={album.thumbnail}
                              thumbnails={album.thumbnails}
                              type="card"
                              date={album.createdAt}
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {media?.conversations?.length > 0 && (
                  <div className={classes.listContainer}>
                    <div className="flex-row justify-start margin-bottom-sm">
                      <ButtonPrimary
                        style={"inline"}
                        onClick={() => {
                          setMediaInfo({ isOpen: true, type: "conversations" });
                        }}
                      >
                        <h4 className="heading-secondary">Conversations</h4>
                      </ButtonPrimary>
                      <ButtonPrimary
                        style={"secondary"}
                        onClick={() => setIsShareForm(true)}
                      >
                        <MdAdd />
                      </ButtonPrimary>
                    </div>
                    <ul className={`grid grid-col-4 ${classes.conversations}`}>
                      {media.conversations.map((conversation) => (
                        <li key={conversation.id}>
                          <Link to={`/conversations/${conversation.id}`}>
                            <ButtonPrimary
                              style={"subtle"}
                              size="max"
                              borderRadius={15}
                              shape="square"
                            >
                              <ConversationHead
                                type="conversation"
                                size={"large"}
                                isGroup={conversation.group}
                                name={conversation.name}
                                url={conversation.iconThumbnail}
                                members={conversation.members}
                                memberCount={conversation.memberCount}
                              />
                            </ButtonPrimary>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </IconContext.Provider>
          }
          {mediaInfo.isOpen && (
            <MediaInfo
              type={mediaInfo.type}
              action={() => {
                setMediaInfo({ isOpen: false, type: null });
              }}
            />
          )}
        </section>
        {isAlbumForm && <AlbumsForm closeAction={closeAlbumFormAction} />}
        {isShareForm && <ShareForm closeAction={closeShareFormAction} />}
        {isTagForm && <TagForm closeAction={closeTagFormAction} />}
        {isDeleteForm && (
          <DeleteForm action={closeDeleteFormAction} mediaId={mediaId} />
        )}
      </div>
    </>
  );
};

export default Media;
