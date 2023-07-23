import { useEffect, useRef } from "react";
import { MdEdit } from "react-icons/md";
import useHttp from "../../hooks/http-hook";
import { ApiEditGroupIcon } from "../../util/apis";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotifications } from "../../store/notification-actions";
import { shareActions } from "../../store/share-slice";
import { conversationActions } from "../../store/conversation-slice";
import UserModalSpinner from "../layout/UserModalSpinner";
import ModalSpinner from "../UI/ModalSpinner";
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
