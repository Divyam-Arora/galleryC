import React, { useEffect, useState } from "react";
import classes from "./SelectionForm.module.css";
import Modal from "../UI/Modal";
import ButtonPrimary from "../UI/ButtonPrimary";
import AlbumListContainer from "../Albums/AlbumListContainer";
import AlbumList from "../Albums/AlbumList";
import { useDispatch, useSelector } from "react-redux";
import useSelection from "../../hooks/selection-hook";
import useHttp from "../../hooks/http-hook";
import { useParams } from "react-router-dom";
import { ApiEditMediaAlbums, ApiGetAllMediaAlbums } from "../../util/apis";
import TextSearch from "../UI/Search/TextSearch";
import { albumsActions } from "../../store/albums-slice";
import AlbumForm from "../Albums/AlbumForm";
import { mediaActions } from "../../store/media-slice";
import ModalSpinner from "../UI/ModalSpinner";
import { albumActions } from "../../store/album-slice";
import { MdAdd } from "react-icons/md";

function AlbumsForm({ closeAction }) {
  const [viewSelected, setViewSelected] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [toClose, setToClose] = useState(false);
  const { list: albums, search } = useSelector((state) => state.albums);
  const { isLoading } = useSelector((state) => state.httpState);
  const existingListRequest = useHttp([]);
  const { sendRequest, data } = useHttp();
  const { mediaId } = useParams();
  const dispatch = useDispatch();
  const { selected, deselected, selectHandler, allSelected } = useSelection(
    existingListRequest.data
  );

  useEffect(() => {
    existingListRequest.sendRequest(
      ApiGetAllMediaAlbums(mediaId),
      "GET",
      {},
      {},
      false
    );
  }, []);

  const onAdd = () => {
    sendRequest(
      ApiEditMediaAlbums(mediaId),
      "POST",
      {
        toAdd: Array.from(selected.keys()),
        toRemove: Array.from(deselected.keys()),
      },
      {},
      false
    );
  };

  useEffect(() => {
    if (data) {
      dispatch(mediaActions.updateItem({ item: data }));
      dispatch(albumsActions.refresh());
      dispatch(albumActions.refresh());
      setToClose(true);
    }
  }, [data]);

  return (
    <div>
      <Modal
        type="close-button"
        initialReset={true}
        action={closeAction}
        close={toClose}
      >
        <section className={classes.container}>
          <div className={`modal-heading modal-padding ${classes.head}`}>
            <div className="flex-row">
              <h3 className="heading-tertiary">Select Album</h3>
              or
              <ButtonPrimary
                compact={true}
                type={"button"}
                onClick={() => {
                  setIsCreating(true);
                }}
              >
                <MdAdd />
                <p>New</p>
              </ButtonPrimary>
            </div>
            <div className="flex-row">
              {
                <TextSearch
                  value={search}
                  disabled={viewSelected}
                  action={(value) => {
                    dispatch(albumsActions.search({ search: value }));
                  }}
                  placeholder="Find albums..."
                />
              }
              <ButtonPrimary
                type={"button"}
                style={viewSelected ? "primary" : "secondary"}
                onClick={() => {
                  setViewSelected((state) => !state);
                }}
              >
                {selected.size} Selected
              </ButtonPrimary>
            </div>
          </div>
          <AlbumListContainer triggerPaused={viewSelected} showLoader={false}>
            <div className={classes.list}>
              <AlbumList
                list={viewSelected ? Array.from(selected.values()) : albums}
                selectedList={allSelected}
                action={selectHandler}
              />
            </div>
          </AlbumListContainer>
          <div
            className={`flex-row modal-padding justify-end ${classes.action}`}
          >
            {isLoading && <ModalSpinner />}
            <ButtonPrimary type={"button"} onClick={onAdd} disabled={isLoading}>
              Add
            </ButtonPrimary>
            <ButtonPrimary
              style={"secondary"}
              type={"button"}
              disabled={isLoading}
              onClick={() => {
                setToClose(true);
              }}
            >
              Cancel
            </ButtonPrimary>
          </div>
        </section>
      </Modal>
      {isCreating && (
        <AlbumForm
          key={"createAlbum"}
          createAction={(data) => {
            setIsCreating(false);
            selectHandler(data);
          }}
        />
      )}
    </div>
  );
}

export default AlbumsForm;
