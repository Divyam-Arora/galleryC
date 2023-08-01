import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import useHttp from "../../hooks/http-hook";
import { conversationActions } from "../../store/conversation-slice";
import { shareActions } from "../../store/share-slice";
import { ApiGetRecentActivity } from "../../util/apis";
import Menu from "../UI/Menu";
import TextSearch from "../UI/Search/TextSearch";
import ConversationList from "./ConversationList";
import ConversationListContainer from "./ConversationListContainer";
import classes from "./Conversations.module.css";
import EditGroupMembersForm from "./EditGroupMembersForm";

const Conversations = function () {
  const {
    list: conversations,
    search,
    initialRequest,
  } = useSelector((state) => state.share);
  const {
    item: conversation,
    list: activities,
    initialRequest: initialActivityRequest,
  } = useSelector((state) => state.conversation);
  const [isGroupFormOpen, setIsGroupFormOpen] = useState(false);
  const [toRefresh, setToRefresh] = useState(true);
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const recentRequest = useHttp();
  const menuItems = useMemo(
    () => ({
      "New Group": () => {
        setIsGroupFormOpen(true);
      },
    }),
    []
  );

  const onClickConversation = (conversation) => {
    navigate(`/conversations/${conversation.id}`);
  };

  const searchAction = (input) => {
    dispatch(shareActions.search({ search: input }));
  };

  const closeGroupFormAction = (conversation) => {
    setIsGroupFormOpen(false);
    conversation && navigate(`/conversations/${conversation.id}`);
  };

  useEffect(() => {
    if (
      toRefresh &&
      initialRequest &&
      (conversationId ? initialActivityRequest : true)
    ) {
      recentRequest.sendRequest(
        ApiGetRecentActivity(
          conversations[0]
            ? new Date(conversations?.[0].lastActivity.on).getTime()
            : 0,
          conversationId || 0,
          activities[0] ? new Date(activities[0].on).getTime() : 0,
          search
        ),
        "GET",
        {},
        {},
        false,
        false
      );
      setToRefresh(false);
    }
    return recentRequest.cleanUp;
  }, [conversationId, toRefresh, initialRequest, initialActivityRequest]);

  useEffect(() => {
    let timer;
    if (recentRequest.data) {
      dispatch(
        shareActions.updateRecent({ list: recentRequest.data.conversations })
      );
      if (recentRequest.data.conversationActivity) {
        dispatch(
          conversationActions.editActivity({
            list: recentRequest.data.conversationActivity,
          })
        );
      }
    }

    if (recentRequest.error) {
      console.log(recentRequest.error, recentRequest.data);
      if (recentRequest.error.response.status == 403) {
        dispatch(shareActions.remove({ id: conversationId }));
        dispatch(conversationActions.reset());
      }
      navigate("/conversations");
    }

    if (recentRequest.data || recentRequest?.error?.response?.status == 403) {
      timer = setTimeout(() => {
        setToRefresh(true);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [recentRequest.data, recentRequest.error]);

  return (
    <div className={classes.container}>
      <div className={classes["list-container"]}>
        <div className="flex-column" style={{ paddingRight: "0.8rem" }}>
          <div className={classes.head}>
            <h2 className="heading-secondary">Conversations</h2>
            <Menu menuItems={menuItems} />
          </div>
          <TextSearch
            action={searchAction}
            value={search}
            timed={true}
            responsive={false}
            placeholder="Find conversations..."
          />
        </div>
        <div className="subcontent" id={"conversations_subcontent"}>
          <ConversationListContainer>
            <ConversationList
              conversationId={conversationId}
              isNav={true}
              type="list-item"
              conversations={conversations}
              action={onClickConversation}
            />
          </ConversationListContainer>
        </div>
      </div>
      <div
        className={`${classes["convo-container"]} ${
          conversationId ? classes.active : ""
        }`}
      >
        <Outlet />
      </div>

      {isGroupFormOpen && (
        <EditGroupMembersForm closeAction={closeGroupFormAction} />
      )}
    </div>
  );
};

export default Conversations;
