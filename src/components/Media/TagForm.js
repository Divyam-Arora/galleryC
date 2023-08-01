import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/http-hook";
import useSelection from "../../hooks/selection-hook";
import { mediaActions } from "../../store/media-slice";
import { ApiEditMediaTags, ApiGetMediaTags, ApiGetTags } from "../../util/apis";
import ButtonPrimary from "../UI/ButtonPrimary";
import Modal from "../UI/Modal";
import ModalSpinner from "../UI/ModalSpinner";
import EmptyButton from "../UI/Search/EmptyButton";
import TextSearch from "../UI/Search/TextSearch";
import formClasses from "./SelectionForm.module.css";
import classes from "./TagForm.module.css";

const TagForm = function ({ closeAction }) {
  const { mediaId } = useParams();
  const dispatch = useDispatch();
  const [toClose, setToClose] = useState(false);
  const existingListRequest = useHttp([]);
  const searchRequest = useHttp([]);
  const { sendRequest, data, cleanUp, isLoading } = useHttp();
  const { selected, deselected, selectHandler, allSelected } = useSelection(
    existingListRequest.data.map((tag) => tag.id)
  );

  useEffect(() => {
    existingListRequest.sendRequest(
      ApiGetMediaTags(mediaId),
      "GET",
      {},
      {},
      false,
      false
    );
  }, []);

  const addAction = () => {
    if (selected.size || deselected.size) {
      sendRequest(
        ApiEditMediaTags(mediaId),
        "POST",
        {
          toAdd: Array.from(selected.keys()),
          toRemove: Array.from(deselected.keys()),
        },
        {},
        false,
        false
      );
    }
  };

  const searchAction = (value) => {
    if (value.trim().length) {
      searchRequest.sendRequest(ApiGetTags(value), "GET", {}, {}, false, false);
    } else {
      searchRequest.clearData();
    }
  };

  const selectAction = (value) => {
    if (value.trim().length == 0) {
      searchRequest.clearData();
    } else {
      searchRequest.clearData();
      selectHandler({ id: value.trim().toUpperCase() });
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(mediaActions.updateItem({ item: { tags: data } }));
      closeAction(data);
    }
  }, [data]);

  return (
    <Modal action={closeAction} type="close-button" close={toClose}>
      <section className={`${formClasses.container} ${classes.container}`}>
        <div className="modal-heading flex-wrap">
          <h3 className="heading-tertiary">Select Tag</h3>
          <TextSearch
            active={true}
            size="max"
            emptyAfterSearch={true}
            list={searchRequest.data}
            action={selectAction}
            timed={true}
            responsive={false}
            timedAction={searchAction}
            loading={searchRequest.isLoading}
            placeholder="Find tags..."
          />
        </div>
        <ul className={classes.list}>
          {allSelected.map((val) => (
            <li className={`${classes.tag} ${classes["appear-tag"]}`}>
              <div className={`flex-row`}>
                <EmptyButton
                  show={true}
                  color="darkred"
                  action={() => selectHandler({ id: val })}
                />
                <strong className="ellipsis" title={val}>
                  {val}
                </strong>
                {/* <IconContext.Provider value={{ size: "1.6rem" }}>
                  <ButtonPrimary style={"subtle"} borderRadius={10}>
                    <MdClose />
                  </ButtonPrimary>
                </IconContext.Provider> */}
              </div>
            </li>
          ))}
        </ul>
        <div className={`${formClasses.action} flex-row justify-end`}>
          {(isLoading || existingListRequest.isLoading) && <ModalSpinner />}
          <ButtonPrimary onClick={() => addAction()} disabled={isLoading}>
            Add
          </ButtonPrimary>
          <ButtonPrimary
            style={"secondary"}
            onClick={() => {
              setToClose(true);
            }}
            disabled={isLoading}
          >
            Cancel
          </ButtonPrimary>
        </div>
      </section>
    </Modal>
  );
};

export default TagForm;
