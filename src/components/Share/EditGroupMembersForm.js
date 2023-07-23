import { useEffect, useState } from "react";
import useSelection from "../../hooks/selection-hook";
import ButtonPrimary from "../UI/ButtonPrimary";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import PeopleListContainer from "../People/PeopleListContainer";
import ConversationList from "./ConversationList";
import PersonHead from "../People/PersonHead";
import TextSearch from "../UI/Search/TextSearch";
import classes from "./NewGroupForm.module.css";
import ModalSpinner from "../UI/ModalSpinner";
import UserModalSpinner from "../layout/UserModalSpinner";
import { peopleActions } from "../../store/people-slice";
import useHttp from "../../hooks/http-hook";
import {
  ApiEditConversationMembers,
  ApiGetAllConversationMembers,
} from "../../util/apis";
import { shareActions } from "../../store/share-slice";
import { notificationActions } from "../../store/notification-slice";
import { showNotifications } from "../../store/notification-actions";
import { useParams } from "react-router-dom";
import { conversationActions } from "../../store/conversation-slice";

const EditGroupMembersForm = function ({ closeAction, isNewGroup = true }) {
  const [existingList, setExistingList] = useState([]);
  const { selected, deselected, selectHandler } = useSelection(existingList);
  const { isLoading: isLoadingState } = useSelector((state) => state.httpState);
  const people = useSelector((state) => state.people);
  const { conversationId } = useParams();
  const dispatch = useDispatch();
  const [toClose, setToClose] = useState(false);
  const [viewSelected, setViewSelected] = useState(false);
  const listRequest = useHttp();
  const { sendRequest, data, isLoading } = useHttp();
  const displayList = viewSelected
    ? Array.from(selected.values())
    : people.list;

  const searchAction = (value) => {
    dispatch(peopleActions.search({ search: value }));
  };

  useEffect(() => {
    dispatch(peopleActions.search({ search: "" }));
    if (!isNewGroup) {
      listRequest.sendRequest(
        ApiGetAllConversationMembers(conversationId),
        "GET",
        {},
        {},
        false,
        false
      );
    }
  }, []);

  useEffect(() => {
    if (listRequest.data) {
      setExistingList(listRequest.data);
    }
  }, [listRequest.data]);

  useEffect(() => {
    setViewSelected(false);
  }, [people.search]);

  const createNewGroup = () => {
    if (selected.size > 1) {
      sendRequest(
        ApiEditConversationMembers(),
        "POST",
        {
          toAdd: Array.from(selected.keys()),
          toRemove: [],
        },
        {},
        false,
        false
      );
    } else {
      dispatch(
        showNotifications({
          title: "Group Error",
          description: "select at least 2 people",
          type: "ALERT",
        })
      );
    }
  };

  const editGroupMembers = (conversationId) => {
    if (selected.size > 0 || deselected.size > 0) {
      sendRequest(
        ApiEditConversationMembers(conversationId),
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (isNewGroup) createNewGroup();
    else editGroupMembers(conversationId);
  };

  useEffect(() => {
    if (data) {
      if (isNewGroup) dispatch(shareActions.updateOrAdd({ item: data }));
      else {
        dispatch(shareActions.update({ item: data, isListItem: true }));
        dispatch(conversationActions.updateItem({ item: data }));
      }
      closeAction(data);
    }
  }, [data]);

  return (
    <Modal
      action={closeAction}
      close={toClose}
      type="close-button"
      initialReset={true}
    >
      <div className={`${classes.container}`}>
        <div
          className={`width-100 flex-column modal-padding ${classes.sticky} ${classes.head}`}
        >
          <div className="modal-heading width-100">
            <h3 className="heading-tertiary">Select</h3>
            <ButtonPrimary
              style={!viewSelected ? "secondary" : "primary"}
              onClick={() => {
                setViewSelected((state) => !state);
              }}
            >
              {selected.size} Selected
            </ButtonPrimary>
          </div>
          {!viewSelected && (
            <TextSearch
              timed={true}
              action={searchAction}
              placeholder="Find people..."
              responsive={false}
            />
          )}
        </div>
        <div className={`form ${classes.form}`}>
          <ul className="width-100">
            <PeopleListContainer showLoading={true}>
              {displayList.map((person) => (
                <li
                  key={person.id}
                  onClick={selectHandler.bind(this, person)}
                  className={classes.person}
                >
                  <PersonHead
                    username={person.username}
                    url={person.iconThumbnail}
                    type="list-item"
                    fullname={`${person.firstName} ${person.lastName}`}
                    selected={
                      selected.has(person.id) ||
                      (existingList.includes(person.id) &&
                        !deselected.has(person.id))
                    }
                  />
                </li>
              ))}
            </PeopleListContainer>
          </ul>
        </div>
        {isLoadingState && !viewSelected && !isLoading && <UserModalSpinner />}
        <div
          className={`flex-row modal-padding justify-end ${classes.sticky} ${classes.actions}`}
        >
          {isLoading && <ModalSpinner />}
          <ButtonPrimary onClick={submitHandler}>Create</ButtonPrimary>
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
      </div>
    </Modal>
  );
};

export default EditGroupMembersForm;
