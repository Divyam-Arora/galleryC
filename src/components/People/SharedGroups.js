import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { MdRemoveCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/http-hook";
import { personActions } from "../../store/person-slice";
import {
  ApiEditConversationMedia,
  ApiGetPersonSharedGroups,
  ApiGetPersonSharedMediaConversations,
} from "../../util/apis";
import ConversationHead from "../Share/ConversationHead";
import ButtonPrimary from "../UI/ButtonPrimary";
import Modal from "../UI/Modal";
import ModalSpinner from "../UI/ModalSpinner";
import ScrollTriggerContainer from "../UI/ScrollTriggerContainer";
import UserModalSpinner from "../layout/UserModalSpinner";
import classes from "./SharedGroups.module.css";

const SharedGroups = function ({ closeAction, type, options }) {
  const { sendRequest, data, cleanUp, isLoading } = useHttp();
  const { userName } = useSelector((state) => state.auth);
  const removeRequest = useHttp();
  const dispatch = useDispatch();
  const [selectedConversationId, setSelectedConversationId] = useState();
  const [conversations, setConversations] = useState({
    list: [],
    page: -1,
    hasNext: true,
  });
  let API;

  switch (type) {
    case "sharedGroups":
      API = ApiGetPersonSharedGroups(options.username, conversations.page + 1);
      break;
    case "sharedMediaConversations":
      API = ApiGetPersonSharedMediaConversations(
        options.username,
        options.mediaId,
        conversations.page + 1
      );
      break;
  }

  const requestAction = () => {
    API && sendRequest(API, "GET", {}, {}, false);
  };

  useEffect(() => {
    if (data) {
      setConversations((state) => ({
        list: [...state.list, ...data.response],
        page: data.page,
        hasNext: data.hasNext,
      }));
    }
  }, [data]);

  const removeAction = (conversationId) => {
    setSelectedConversationId(conversationId);
    removeRequest.sendRequest(
      ApiEditConversationMedia(conversationId),
      "POST",
      {
        toRemove: [options.mediaId],
        toAdd: [],
      },
      {},
      false
    );
  };

  useEffect(() => {
    if (removeRequest.data) {
      setConversations((state) => {
        return {
          ...state,
          list: state.list.filter((item) => item.id != selectedConversationId),
        };
      });
      dispatch(personActions.refresh());
    }
  }, [removeRequest.data]);

  return (
    <Modal action={closeAction} initialReset={true}>
      <section className={classes.section}>
        <div className="modal-heading modal-padding">
          <h3 className="heading-tertiary">
            {type == "sharedGroups" ? "Groups" : "Conversations"}
          </h3>
        </div>
        <div className={classes.container}>
          <ScrollTriggerContainer
            action={requestAction}
            page={conversations.page}
            hasNext={conversations.hasNext}
          >
            <ul className={classes.list}>
              {conversations.list.map((conversation) => (
                <li key={conversation.id}>
                  <Link to={`/conversations/${conversation.id}`}>
                    <ButtonPrimary
                      style={"subtle"}
                      size="max"
                      borderRadius={15}
                      shape="square"
                    >
                      <ConversationHead
                        // type="conversation"
                        key={conversation.id}
                        isGroup={conversation.group}
                        name={conversation.name}
                        members={conversation.members}
                        memberCount={conversation.memberCount}
                        url={conversation.iconThumbnail}
                      />
                    </ButtonPrimary>
                  </Link>
                  {type == "sharedMediaConversations" &&
                    userName == options.owner && (
                      <div className={classes.remove}>
                        <IconContext.Provider value={{ size: "2rem" }}>
                          <ButtonPrimary
                            style={"subtle"}
                            disabled={removeRequest.isLoading}
                            onClick={() => {
                              removeAction(conversation.id);
                            }}
                          >
                            {removeRequest.isLoading &&
                            selectedConversationId == conversation.id ? (
                              <ModalSpinner />
                            ) : (
                              <MdRemoveCircleOutline />
                            )}
                          </ButtonPrimary>
                        </IconContext.Provider>
                      </div>
                    )}
                </li>
              ))}
            </ul>
          </ScrollTriggerContainer>
          <div className="flex-row">{isLoading && <UserModalSpinner />}</div>
        </div>
      </section>
    </Modal>
  );
};

export default SharedGroups;
