import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { conversationActions } from "../../store/conversation-slice";
import { shareActions } from "../../store/share-slice";
import { ApiLeaveConversation } from "../../util/apis";
import DeleteModal from "../UI/Forms/DeleteModal";

const LeaveConversationForm = function ({ conversationId, leaveAction }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLeave = (statusCode) => {
    leaveAction();
    if (statusCode == 200) {
      dispatch(shareActions.remove({ id: conversationId }));
      dispatch(conversationActions.reset());
      navigate("/conversations");
    }
  };
  return (
    <DeleteModal
      API={ApiLeaveConversation(conversationId)}
      action={onLeave}
      tag={"Leave"}
      target={"Conversation"}
      text={
        "Leaving this conversation will remove all your media from it but they will still be in your gallery.\nYou will also lose access to any media shared in this conversation.\nIf you are the admin, the next admin will be chosen randomly.\nAre you sure you want to leave?"
      }
    />
  );
};

export default LeaveConversationForm;
