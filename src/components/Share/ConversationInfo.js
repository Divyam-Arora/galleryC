import { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { MdExitToApp, MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import useHttp from "../../hooks/http-hook";
import { ApiGetConversationInfo } from "../../util/apis";
import PersonHead from "../People/PersonHead";
import BackButton from "../UI/BackButton";
import ButtonPrimary from "../UI/ButtonPrimary";
import EmptyState from "../UI/EmptyState";
import containerClasses from "./ConversationContainer.module.css";
import ConversationHead from "./ConversationHead";
import classes from "./ConversationInfo.module.css";
import ConversationMedia from "./ConversationMedia";
import LeaveConversationForm from "./LeaveConversationForm";

const ConversationInfo = function () {
  const containerRef = useRef();
  const navigate = useNavigate();
  const [isLeaving, setIsLeaving] = useState(false);
  const { userName } = useSelector((state) => state.auth);
  const { conversationId } = useParams();
  const { sendRequest, data: conversation, cleanUp, isLoading } = useHttp();

  useEffect(() => {
    containerRef.current.classList.add(containerClasses.appear);
    setTimeout(() => {
      containerRef.current.classList.remove(containerClasses.appear);
    }, [200]);
  }, []);

  useEffect(() => {
    sendRequest(ApiGetConversationInfo(conversationId));
    return cleanUp;
  }, []);

  const leaveAction = () => {
    setIsLeaving(false);
  };

  return (
    <div ref={containerRef} className={containerClasses.container}>
      <div className="content-header">
        <BackButton />
        <IconContext.Provider value={{ size: "20px" }}>
          <ButtonPrimary
            style={"subtle"}
            onClick={() => {
              setIsLeaving(true);
            }}
          >
            <p>Leave conversation</p>
            <MdExitToApp />
          </ButtonPrimary>
        </IconContext.Provider>
      </div>
      <div className="subcontent">
        {conversation && (
          <>
            <ConversationHead
              members={conversation.info.members}
              name={conversation.info.name}
              isGroup={conversation.info.group}
              createdBy={conversation.info.createdBy}
              createdAt={conversation.info.createdAt}
              url={conversation.info.iconThumbnail}
              memberCount={conversation.info.memberCount}
              type="profile"
            />
            <IconContext.Provider value={{ size: "20px" }}>
              <section className={classes.section}>
                <div className="flex-row">
                  <h3 className="heading-tertiary">
                    {conversation.info.mediaCount} Media shared
                  </h3>
                  {conversation.info.mediaCount > 6 && (
                    <div className="margin-left-auto">
                      <ButtonPrimary
                        style={"subtle"}
                        onClick={() => {
                          navigate(`/conversations/${conversationId}/media`);
                        }}
                      >
                        All Media <MdKeyboardArrowRight />
                      </ButtonPrimary>
                    </div>
                  )}
                </div>
                <div className="grid grid-col-3">
                  {conversation.media.slice(0, 6).map((m) => {
                    return (
                      <Link key={m.id} to={`/media/${m.id}`}>
                        <ConversationMedia
                          media={m}
                          date={m.sharedOn}
                          owner={m.owner}
                        />
                      </Link>
                    );
                  })}
                </div>
                {conversation.media.length == 0 && !isLoading && (
                  <EmptyState title="No shared Media" />
                )}
              </section>
              <section className={classes.section}>
                <div className="flex-row">
                  <h3 className="heading-tertiary">
                    {conversation.info.memberCount} Members
                  </h3>
                  {conversation.info.memberCount > 10 && (
                    <div className="margin-left-auto">
                      <ButtonPrimary
                        style={"subtle"}
                        onClick={() => {
                          navigate(`/conversations/${conversationId}/members`);
                        }}
                      >
                        All Members <MdKeyboardArrowRight />
                      </ButtonPrimary>
                    </div>
                  )}
                </div>
                <div className={`grid grid-col-2 ${classes.members}`}>
                  {conversation.members.slice(0, 10).map((m) => {
                    return m.username != userName ? (
                      <Link key={m.username} to={`/people/${m.username}`}>
                        <PersonHead
                          username={m.username}
                          url={m.iconThumbnail}
                          fullname={m.firstName + " " + m.lastName}
                          type="member"
                          admin={conversation.info.admin}
                        />
                      </Link>
                    ) : (
                      <PersonHead
                        key={m.username}
                        username={m.username}
                        url={m.iconThumbnail}
                        fullname={m.firstName + " " + m.lastName}
                        type="member"
                        admin={conversation.info.admin}
                      />
                    );
                  })}
                </div>
              </section>
            </IconContext.Provider>
          </>
        )}
      </div>
      {isLeaving && (
        <LeaveConversationForm
          conversationId={conversationId}
          leaveAction={leaveAction}
        />
      )}
    </div>
  );
};

export default ConversationInfo;
