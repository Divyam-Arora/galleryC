import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import useHttp from "../../hooks/http-hook";
import { shareActions } from "../../store/share-slice";
import { ApiGetAllConversations } from "../../util/apis";
import UserModalSpinner from "../layout/UserModalSpinner";
import ScrollTriggerContainer from "../UI/ScrollTriggerContainer";
import EmptyState from "../UI/EmptyState";

const ConversationListContainer = function ({ children }) {
  const {
    list: conversations,
    page,
    hasNext,
    extra,
    search,
    refresh,
  } = useSelector((state) => state.share);
  const { data, sendRequest, error, cleanUp, isLoading } = useHttp();
  const dispatch = useDispatch();
  const { conversationId } = useParams();
  const refreshRequest = useHttp();
  const [toRefresh, setToRefresh] = useState(true);

  // useEffect(() => {
  //   if (toRefresh && conversations.length > 0) {
  //     refreshRequest.sendRequest(
  //       ApiGetAllConversations(
  //         0,
  //         0,
  //         search,
  //         new Date(conversations[0].updatedAt).getTime()
  //       ),
  //       "GET",
  //       {},
  //       {},
  //       false,
  //       false
  //     );
  //     setToRefresh(false);
  //   }
  // }, [toRefresh, conversations]);

  useEffect(() => {
    let timer;
    if (refreshRequest.data) {
      dispatch(
        shareActions.updateRecent({
          list: refreshRequest.data.response,
        })
      );
      timer = setTimeout(() => {
        setToRefresh(true);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [refreshRequest.data]);

  const requestAction = () => {
    sendRequest(
      ApiGetAllConversations(page, extra, search),
      "GET",
      {},
      {},
      false
    );
  };

  useEffect(() => {
    if (data) {
      if (refresh) {
        dispatch(
          shareActions.fill({
            list: data.response,
            page: data.page,
            hasNext: data.hasNext,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
          })
        );
      } else {
        dispatch(
          shareActions.append({
            list: data.response,
            page: data.page,
            hasNext: data.hasNext,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
          })
        );
      }
    }

    return cleanUp;
  }, [data]);

  return (
    <>
      <ScrollTriggerContainer
        action={requestAction}
        extra={extra}
        hasNext={hasNext}
        page={page}
        search={search}
      >
        {children}
      </ScrollTriggerContainer>
      {isLoading && (
        <div className="flex-row">
          <UserModalSpinner />
        </div>
      )}
      {conversations.length == 0 && !isLoading && (
        <EmptyState
          title="No conversations"
          // description="Start a conversation by sharing media or create a group."
        />
      )}
    </>
  );
};

export default ConversationListContainer;
