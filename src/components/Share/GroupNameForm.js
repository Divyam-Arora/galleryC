import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/http-hook";
import { conversationActions } from "../../store/conversation-slice";
import { shareActions } from "../../store/share-slice";
import { ApiEditGroupName } from "../../util/apis";
import ButtonPrimary from "../UI/ButtonPrimary";
import Modal from "../UI/Modal";
import ModalSpinner from "../UI/ModalSpinner";

const GroupNameForm = function ({ closeAction, name }) {
  const [toClose, setToClose] = useState(false);
  const nameRef = useRef();
  const { conversationId } = useParams();
  const { sendRequest, data, isLoading } = useHttp();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(nameRef.current.value);
    sendRequest(
      ApiEditGroupName(conversationId),
      "PUT",
      { name: nameRef.current.value },
      {},
      false
    );
  };

  useEffect(() => {
    if (data) {
      dispatch(conversationActions.updateItem({ item: { name: data } }));
      dispatch(
        shareActions.update({
          item: { id: conversationId, name: data },
          isListItem: true,
        })
      );
      closeAction(data);
    }
  }, [data]);
  return (
    <Modal action={closeAction} type="close-button" close={toClose}>
      <div className="modal-size--small">
        <div className="modal-header">
          <h3 className="heading-tertiary">Edit Name</h3>
        </div>
        <form className="form" onSubmit={submitHandler}>
          <div className="flex-column width-100">
            <label>Name:</label>
            <input
              ref={nameRef}
              className="input"
              autoFocus
              type="text"
              defaultValue={name}
              required
            />
          </div>
          <div className="flex-row">
            {isLoading && <ModalSpinner />}
            <ButtonPrimary>Confirm</ButtonPrimary>
            <ButtonPrimary
              type="button"
              style="secondary"
              onClick={() => {
                setToClose(true);
              }}
            >
              Cancel
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default GroupNameForm;
