import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homeActions } from "../../store/home-slice";
import MediaList from "../Media/MediaList";
import MediaListContainer from "../Media/MediaListContainer";
import ButtonPrimary from "../UI/ButtonPrimary";
import Modal from "../UI/Modal";
import ModalSpinner from "../UI/ModalSpinner";
import DateSearch from "../UI/Search/DateSearch";

import useSelection from "../../hooks/selection-hook";
import classes from "./SelectionForm.module.css";

const MediaForm = function ({ action, existingList, addAction, isSuccess }) {
  const {
    list: media,
    search,
    searchPage,
  } = useSelector((state) => state.home);
  const {
    selectHandler,
    selected: mediaSelected,
    deselected: mediaDeselected,
    setSelected: setMediaSelected,
  } = useSelection(existingList);
  const [viewSelectedMedia, setViewSelectedMedia] = useState(false);
  const [toClose, setToClose] = useState(false);
  const { isLoading } = useSelector((state) => state.httpState);
  const dispatch = useDispatch();

  const uploadSelectHandler = (media) => {
    setMediaSelected((state) => {
      media.forEach((m) => {
        state.set(m.id, m);
      });
      return new Map(state.entries());
    });
  };

  const getSelectedMedia = () => {
    const combined = [...existingList, ...mediaSelected.keys()];
    // console.log(combined);
    return combined.filter((id) => {
      return !mediaDeselected.has(id);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    action({
      mediaSelected,
      mediaDeselected,
    });
  };

  const searchAction = (date) => {
    dispatch(homeActions.search({ search: date }));
  };

  return (
    <Modal
      action={addAction}
      type="close-button"
      close={isSuccess || toClose}
      initialReset={true}
    >
      <div className={classes.container}>
        <div className={`modal-heading modal-padding ${classes.head}`}>
          <div className="flex-row">
            <h5 className="width-100 heading-tertiary">Select Media</h5>
          </div>
          <div className="flex-row">
            {
              <DateSearch
                initialDate={search}
                action={searchAction}
                disabled={viewSelectedMedia}
              />
            }
          </div>
          <ButtonPrimary
            type="button"
            style={viewSelectedMedia ? "primary" : "secondary"}
            onClick={() => {
              setViewSelectedMedia((state) => !state);
            }}
          >
            {mediaSelected.size} selected
          </ButtonPrimary>
        </div>
        <MediaListContainer
          triggerPaused={viewSelectedMedia}
          showLoader={false}
        >
          {/* <div className={`form ${classes.form}`}> */}
          <div className={classes.list}>
            <MediaList
              media={
                viewSelectedMedia
                  ? Array.from(mediaSelected.values()).reverse()
                  : search.year
                  ? searchPage.list
                  : media
              }
              action={selectHandler}
              selectedList={getSelectedMedia()}
              showDate={!viewSelectedMedia}
            />
          </div>
          {/* </div> */}
        </MediaListContainer>
        <div className={`flex-row modal-padding justify-end ${classes.action}`}>
          {isLoading && <ModalSpinner />}
          <ButtonPrimary disabled={isLoading} onClick={submitHandler}>
            Confirm
          </ButtonPrimary>
          <ButtonPrimary
            type="button"
            style="secondary"
            disabled={isLoading}
            onClick={() => {
              setToClose(true);
            }}
          >
            Cancel
          </ButtonPrimary>
        </div>
      </div>
    </Modal>
  );
};

export default MediaForm;
