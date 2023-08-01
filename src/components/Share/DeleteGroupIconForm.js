import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { conversationActions } from "../../store/conversation-slice";
import { shareActions } from "../../store/share-slice";
import { ApiDeleteGroupIcon } from "../../util/apis";
import DeleteIcon from "../UI/Buttons/DeleteIcon";

const DeleteGroupIconForm = function ({ action }) {
  const { conversationId } = useParams();
  const dispatch = useDispatch();

  const closeAction = (data) => {
    if (data) {
      dispatch(shareActions.update({ item: data, isListItem: true }));
      dispatch(conversationActions.updateItem({ item: data }));
      action(data);
    }
  };

  return (
    <DeleteIcon API={ApiDeleteGroupIcon(conversationId)} action={closeAction} />
  );
};

export default DeleteGroupIconForm;
