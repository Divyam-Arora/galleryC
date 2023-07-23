import { useState } from "react";
import useHttp from "../../../hooks/http-hook";
import { useDispatch } from "react-redux";
import ButtonPrimary from "../ButtonPrimary";
import ModalSpinner from "../ModalSpinner";
import { MdDelete } from "react-icons/md";
import Modal from "../Modal";
import DeleteModal from "../Forms/DeleteModal";

const DeleteIcon = function ({ API, action }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [toClose, setToClose] = useState(false);
  const { data, sendRequest, isLoading } = useHttp();

  const submitHandler = (e) => {
    e.preventDefault();
    sendRequest(API, "DELETE", {}, {}, false);
  };

  const closeAction = (data) => {
    setIsRemoving(false);
    action(data);
  };

  return (
    <div>
      <div
        className="icon"
        onClick={() => {
          setIsRemoving(true);
        }}
      >
        <MdDelete />
      </div>
      {isRemoving && (
        <DeleteModal
          API={API}
          action={closeAction}
          tag={"Remove"}
          target={"Icon"}
          text={"Permanently removes the icon."}
        />
      )}
    </div>
  );
};

export default DeleteIcon;
