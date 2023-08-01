import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/http-hook";
import { albumActions } from "../../store/album-slice";
import { albumsActions } from "../../store/albums-slice";
import { ApiEditAlbum } from "../../util/apis";
import ButtonPrimary from "../UI/ButtonPrimary";
import Modal from "../UI/Modal";
import ModalSpinner from "../UI/ModalSpinner";
import classes from "./EditForm.module.css";

const EditForm = function ({ editAction }) {
  const [toClose, setToClose] = useState(false);
  const { data, sendRequest } = useHttp();
  const { item: album } = useSelector((state) => state.album);
  const { isLoading } = useSelector((state) => state.httpState);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    setName(album.name);
    setDesc(album.description);
  }, [album.name, album.description]);

  const submitHandler = (e) => {
    e.preventDefault();
    sendRequest(
      ApiEditAlbum(album.id),
      "PUT",
      {
        name: name,
        description: desc,
      },
      {},
      false
    );
  };

  const onEdited = () => {
    if (data) {
      dispatch(
        albumsActions.update({
          item: data,
        })
      );
      dispatch(
        albumActions.update({
          item: {
            id: data.id,
            name: data.name,
            description: data.description,
          },
        })
      );
    }
    editAction(data);
  };

  return (
    <Modal action={onEdited} type="close-button" close={toClose} data={data}>
      <section className={classes.container}>
        <h3 className="heading-tertiary">Edit Album</h3>
        <form
          className={`flex-column ${classes.form}`}
          onSubmit={submitHandler}
        >
          <div className="flex-column width-100">
            <label>Name:</label>
            <input
              className="input"
              type="text"
              name="albumName"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              autoFocus
              required
            />
          </div>
          <div className="flex-column width-100">
            <label>Description:</label>
            <textarea
              className="input"
              name="albumDescription"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>
          <div className="flex-row">
            {isLoading && <ModalSpinner />}
            <ButtonPrimary disabled={isLoading}>Save</ButtonPrimary>
            <ButtonPrimary
              disabled={isLoading}
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
      </section>
    </Modal>
  );
};

export default EditForm;
