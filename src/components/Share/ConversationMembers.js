import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useHttp from "../../hooks/http-hook";
import { ApiGetConversationMembers } from "../../util/apis";
import PersonHead from "../People/PersonHead";
import BackButton from "../UI/BackButton";
import ScrollTriggerContainer from "../UI/ScrollTriggerContainer";
import containerClasses from "./ConversationContainer.module.css";
import ConversationHead from "./ConversationHead";

const ConversationMembers = () => {
  const containerRef = useRef();
  const { conversationId } = useParams();
  const [members, setMembers] = useState([]);
  const { userName } = useSelector((state) => state.auth);
  const [response, setResponse] = useState({ page: -1, hasNext: true });
  const { sendRequest, data, cleanUp } = useHttp();

  useEffect(() => {
    containerRef.current.classList.add(containerClasses.appear);
    setTimeout(() => {
      containerRef.current.classList.remove(containerClasses.appear);
    }, [200]);
  }, []);

  const requestAction = () => {
    sendRequest(ApiGetConversationMembers(conversationId, response.page + 1));
  };

  useEffect(() => {
    if (data) {
      setMembers((state) => [...state, ...data.response]);
      setResponse({ page: data.page, hasNext: data.hasNext });
    }
  }, [data]);

  return (
    <div ref={containerRef} className={containerClasses.container}>
      <div className="content-header">
        <div className="flex-row">
          <BackButton />
          <h2 className="heading-secondary">All Members</h2>
        </div>
      </div>
      <section className="subcontent margin-top">
        <ScrollTriggerContainer
          action={requestAction}
          page={response.page}
          hasNext={response.hasNext}
        >
          <div className="grid grid-col-2 grid-col-2-mobile">
            {members.map((member) =>
              member.username != userName ? (
                <Link to={`/people/${member.username}`}>
                  <PersonHead
                    username={member.username}
                    fullname={`${member.firstName} ${member.lastName}`}
                    url={member.url}
                    admin={member.admin}
                    type="member"
                  />
                </Link>
              ) : (
                <PersonHead
                  username={member.username}
                  fullname={`${member.firstName} ${member.lastName}`}
                  url={member.url}
                  admin={member.admin}
                  type="member"
                />
              )
            )}
          </div>
        </ScrollTriggerContainer>
      </section>
    </div>
  );
};

export default ConversationMembers;
