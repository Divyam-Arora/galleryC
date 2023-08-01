import { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { MdShare } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useHttp from "../../hooks/http-hook";
import { conversationActions } from "../../store/conversation-slice";
import { shareActions } from "../../store/share-slice";
import {
  ApiGetConversationActivity,
  ApiGetConversationDetails,
} from "../../util/apis";
import ButtonPrimary from "../UI/ButtonPrimary";
import Menu from "../UI/Menu";
import ScrollTriggerContainer from "../UI/ScrollTriggerContainer";
import BackgroundLoader from "../UI/Spinner/BackgroundLoader";
import classes from "./ConversationContainer.module.css";
import ConversationHead from "./ConversationHead";
import ConversationMediaForm from "./ConversationMediaForm";
import ConversationMediaList from "./ConversationMediaList";
import EditGroupMembersForm from "./EditGroupMembersForm";
import LeaveConversationForm from "./LeaveConversationForm";

const ConversationContainer = function () {
  const { list: conversations } = useSelector((state) => state.share);
  const {
    item: conversation,
    list: media,
    page,
    extra,
    hasNext,
  } = useSelector((state) => state.conversation);
  const { isLoading } = useSelector((state) => state.httpState);
  const [menuItems, setMenuItems] = useState(null);
  const { userName } = useSelector((state) => state.auth);
  const [isAddingMedia, setIsAddingMedia] = useState(false);
  const [isAddingMembers, setIsAddingMembers] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [toRefresh, setToRefresh] = useState(false);
  const conversationRequest = useHttp();
  const conversationMediaRequest = useHttp();
  const recentRequest = useHttp();
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const containerRef = useRef();
  // const conversationItem = conversations.find(
  //   (convo) => convo.id == conversationId
  // );

  // const menuItems = useMemo(() => {
  //   let menu = {
  //     Share: () => {
  //       setIsAddingMedia(true);
  //     },
  //     Info: () => {
  //       navigate("info");
  //     },
  //     "Leave Conversation": () => {
  //       setIsLeaving(true);
  //     },
  //   };

  //   if (conversation?.admin == userName && conversation?.group) {
  //     menu = {
  //       "Add Members": () => {
  //         setIsAddingMembers(true);
  //       },
  //       ...menu,
  //     };
  //   }

  //   return { ...menu };
  // }, [conversationId]);

  useEffect(() => {
    if (conversationId && conversation) {
      let menu = {
        Info: () => {
          navigate("info");
        },
      };

      if (conversation?.admin == userName && conversation?.group) {
        menu["Add Members"] = () => {
          setIsAddingMembers(true);
        };
      }

      menu["Leave Conversation"] = () => {
        setIsLeaving(true);
      };
      setMenuItems(menu);
    }
  }, [conversation?.id, conversationId]);

  // useEffect(() => {
  //   containerRef.current.classList.add(classes.appear);
  //   setTimeout(() => {
  //     containerRef.current.classList.remove(classes.appear);
  //   }, [200]);
  // }, []);

  useEffect(() => {
    if (conversationId != conversation?.id) {
      conversationRequest.sendRequest(
        ApiGetConversationDetails(conversationId)
      );
    }
    return conversationRequest.cleanUp;
  }, [conversationId]);

  useEffect(() => {
    if (conversationRequest.data) {
      dispatch(conversationActions.newItem({ item: conversationRequest.data }));
    }
    if (conversationRequest.error) {
      if (conversationRequest.error.response.status == 403) {
        dispatch(conversationActions.reset());
        dispatch(shareActions.remove({ id: conversationId }));
      }
      navigate("/conversations");
      // dispatch(conversationActions.)
    }
  }, [conversationRequest.data, conversationRequest.error]);

  const mediaAction = () => {
    conversationMediaRequest.sendRequest(
      ApiGetConversationActivity(conversationId, page + 1, extra)
    );
  };

  const addMediaAction = () => {
    setIsAddingMedia(false);
  };

  const addMembersAction = () => {
    setIsAddingMembers(false);
  };

  const leaveAction = () => {
    setIsLeaving(false);
  };

  useEffect(() => {
    if (conversationMediaRequest.data) {
      dispatch(
        conversationActions.append({
          list: conversationMediaRequest.data.response,
          page: conversationMediaRequest.data.page,
          totalElements: conversationMediaRequest.data.totalElements,
          totalPages: conversationMediaRequest.data.totalPages,
          hasNext: conversationMediaRequest.data.hasNext,
        })
      );
      setToRefresh(true);
    }

    return conversationMediaRequest.cleanUp;
  }, [conversationMediaRequest.data]);

  // useEffect(() => {
  //   if (toRefresh) {
  //     recentRequest.sendRequest(
  //       ApiGetConversationMedia(
  //         conversationId,
  //         0,
  //         0,
  //         "",
  //         media.length > 0 ? new Date(media?.[0].sharedOn).getTime() : 1
  //       ),
  //       "GET",
  //       {},
  //       {},
  //       false,
  //       false
  //     );
  //     setToRefresh(false);
  //   }
  // }, [toRefresh, media]);

  useEffect(() => {
    let timer;
    if (recentRequest.data) {
      dispatch(
        conversationActions.updateRecent({ list: recentRequest.data.response })
      );
      timer = setTimeout(() => {
        setToRefresh(true);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [recentRequest.data]);

  return (
    <div ref={containerRef} className={classes.container}>
      <div className="content-header">
        <h2 className="heading-secondary height-100 width-100">
          {conversation && conversation.id == conversationId && (
            <ConversationHead
              members={conversation.members}
              name={conversation.name}
              url={conversation.iconThumbnail}
              memberCount={conversation.memberCount}
              isGroup={conversation.group}
              type="head"
            />
          )}
          {isLoading && conversation?.id != conversationId && (
            <BackgroundLoader width={"50%"} height={"100%"} animate={true} />
          )}
        </h2>
        <div className="flex-row">
          <ButtonPrimary
            compact={true}
            onClick={() => {
              setIsAddingMedia(true);
            }}
          >
            <IconContext.Provider value={{ size: "2rem" }}>
              <MdShare />
            </IconContext.Provider>
            <p>Share</p>
          </ButtonPrimary>
          {menuItems && <Menu menuItems={menuItems} />}
        </div>
      </div>
      <div
        className={`subcontent ${classes.list}`}
        id={"conversations" + conversationId + "_subcontent"}
      >
        {conversationId == conversation?.id && (
          <ScrollTriggerContainer
            action={mediaAction}
            page={page}
            extra={extra}
            hasNext={hasNext}
            // reverse={true}
          >
            <ConversationMediaList />
          </ScrollTriggerContainer>
        )}
      </div>
      {isAddingMedia && <ConversationMediaForm addAction={addMediaAction} />}
      {isLeaving && (
        <LeaveConversationForm
          leaveAction={leaveAction}
          conversationId={conversationId}
        />
      )}
      {isAddingMembers && (
        <EditGroupMembersForm
          closeAction={addMembersAction}
          isNewGroup={false}
        />
      )}
    </div>
  );
};

export default ConversationContainer;
