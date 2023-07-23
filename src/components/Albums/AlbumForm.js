import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/http-hook";
import { albumsActions } from "../../store/albums-slice";
import { ApiCreateAlbum } from "../../util/apis";
import ButtonPrimary from "../UI/ButtonPrimary";
import Modal from "../UI/Modal";
import ModalSpinner from "../UI/ModalSpinner";
import classes from "./AlbumForm.module.css";

const AlbumForm = function ({ createAction }) {
  const nameRef = useRef();
  const { data, sendRequest, cleanUp, error } = useHttp();
  const { isLoading } = useSelector((state) => state.httpState);
  const dispatch = useDispatch();
  const [toClose, setToClose] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    sendRequest(ApiCreateAlbum(), "POST", { name }, {}, false);
  };

  // useEffect(() => {
  //   if (data) {
  //     dispatch(albumsActions.add({ item: data }));
  //   }
  // }, [data]);

  const onCreated = () => {
    data && dispatch(albumsActions.add({ item: data }));
    createAction(data);
  };

  return (
    <Modal action={onCreated} data={data} close={toClose} type="close-button">
      <div className="modal-heading">
        <h5 className="heading-tertiary">Create Album</h5>
      </div>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className="flex-column width-100">
          <label>Enter album name:</label>
          <input
            ref={nameRef}
            type="text"
            className="input"
            name="albumName"
            required
            autoFocus
          />
        </div>
        <div className="flex-row">
          {isLoading && <ModalSpinner />}
          <ButtonPrimary type={"submit"} disabled={isLoading || data}>
            Create
          </ButtonPrimary>
          <ButtonPrimary
            type="button"
            disabled={isLoading}
            onClick={() => {
              setToClose(true);
            }}
            style="secondary"
          >
            Cancel
          </ButtonPrimary>
        </div>
      </form>
    </Modal>
  );
};

export default AlbumForm;
