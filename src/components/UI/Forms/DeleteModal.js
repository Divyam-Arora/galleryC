import { useState } from "react";
import useHttp from "../../../hooks/http-hook";
import ButtonPrimary from "../ButtonPrimary";
import Modal from "../Modal";
import ModalSpinner from "../ModalSpinner";

const DeleteModal = function ({ API, action, tag, target, text = "" }) {
  const [toClose, setToClose] = useState(false);
  const { sendRequest, status, isLoading, data } = useHttp();
  const formattedText = text.split("\n");

  const submitHandler = (e) => {
    e.preventDefault();
    sendRequest(API, "DELETE", {}, {}, false);
  };

  return (
    <Modal
      action={action}
      type="close-button"
      close={toClose}
      data={data || (!isLoading && status)}
    >
      <section style={{ width: "500px", maxWidth: "100%" }}>
        <h3 className="modal-heading heading-tertiary">
          {tag} {target}?
        </h3>
        {text && (
          <div className="flex-column margin-top-lg margin-bottom">
            {formattedText.map((t) => (
              <p key={t + Math.random()}>{t}</p>
            ))}
          </div>
        )}
        <form className="form" onSubmit={submitHandler}>
          <div className="flex-row">
            {isLoading && <ModalSpinner />}
            <ButtonPrimary disabled={isLoading}>{tag}</ButtonPrimary>
            <ButtonPrimary
              type={"button"}
              style={"secondary"}
              disabled={isLoading}
              onClick={() => {
                setToClose(true);
              }}
            >
              Cancel
            </ButtonPrimary>
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default DeleteModal;
