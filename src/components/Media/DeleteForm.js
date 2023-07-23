import { useDispatch } from "react-redux";
import { ApiDeleteMedia } from "../../util/apis";
import DeleteModal from "../UI/Forms/DeleteModal";
import { useNavigate } from "react-router-dom";
import { homeActions } from "../../store/home-slice";
import { mediaActions } from "../../store/media-slice";

const DeleteForm = function ({ mediaId, action }) {
  const dispatch = useDispatch();
  const onDelete = (data) => {
    action(data);
    if (data) {
      dispatch(homeActions.remove({ id: mediaId }));
      dispatch(mediaActions.reset());
    }
  };
  return (
    <DeleteModal
      API={ApiDeleteMedia(mediaId)}
      action={onDelete}
      tag={"Delete"}
      target={"Media"}
      text={
        "Deleting this media will remove it from all conversations and albums.\nAre you sure you want to delete it?"
      }
    />
  );
};

export default DeleteForm;
