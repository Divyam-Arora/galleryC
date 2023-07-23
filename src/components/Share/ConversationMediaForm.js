import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/http-hook";
import { conversationActions } from "../../store/conversation-slice";
import { shareActions } from "../../store/share-slice";
import {
  ApiEditConversationMedia,
  ApiGetAllConversationMedia,
} from "../../util/apis";
import MediaForm from "../Media/MediaForm";

const ConversationMediaForm = function ({ addAction }) {
  const { item: conversation } = useSelector((state) => state.conversation);
  const mediaRequest = useHttp();
  const { sendRequest, data } = useHttp();
  const [toAdd, setToAdd] = useState(new Map());
  const [toRemove, setToRemove] = useState(new Map());
  const dispatch = useDispatch();

  useEffect(() => {
    conversation &&
      mediaRequest.sendRequest(
        ApiGetAllConversationMedia(conversation.id),
        "GET",
        {},
        {},
        false
      );

    return mediaRequest.cleanUp;
  }, []);
  const mediaAction = ({ mediaSelected: toAdd, mediaDeselected: toRemove }) => {
    setToAdd(toAdd);
    setToRemove(toRemove);
    sendRequest(
      ApiEditConversationMedia(conversation.id),
      "POST",
      {
        toAdd: Array.from(toAdd.keys()),
        toRemove: Array.from(toRemove.keys()),
      },
      {},
      false
    );
  };

  useEffect(() => {
    if (data) {
      dispatch(conversationActions.editActivity({ list: data.activities }));
      dispatch(conversationActions.updateItem({ item: data.conversation }));
      dispatch(
        shareActions.update({ item: data.conversation, isListItem: true })
      );
    }
  }, [data]);

  return (
    <MediaForm
      addAction={addAction}
      existingList={mediaRequest.data || []}
      action={mediaAction}
      isSuccess={!!data}
    />
  );
};

export default ConversationMediaForm;
