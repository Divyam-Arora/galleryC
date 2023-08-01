import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { conversationActions } from "../../store/conversation-slice";
import { shareActions } from "../../store/share-slice";
import { ApiEditGroupIcon } from "../../util/apis";
import EditIcon from "../UI/Buttons/EditIcon";

const EditGroupIconForm = function ({ action }) {
  const { conversationId } = useParams();
  const dispatch = useDispatch();

  const onSuccess = (data) => {
    dispatch(shareActions.update({ item: data, isListItem: true }));
    dispatch(conversationActions.updateItem({ item: data }));
    action && action(data);
  };

  return <EditIcon API={ApiEditGroupIcon(conversationId)} action={onSuccess} />;
};

export default EditGroupIconForm;
