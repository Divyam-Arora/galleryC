import { useEffect, useMemo, useState } from "react";
import Modal from "../UI/Modal";
import ButtonPrimary from "../UI/ButtonPrimary";
import classes from "./ShareForm.module.css";
import formClasses from "./SelectionForm.module.css";
import useSelection from "../../hooks/selection-hook";
import ModalSpinner from "../UI/ModalSpinner";
import useHttp from "../../hooks/http-hook";
import { useDispatch, useSelector } from "react-redux";
import EditGroupMembersForm from "../Share/EditGroupMembersForm";
import TextSearch from "../UI/Search/TextSearch";
import {
  ApiEditConversationMedia,
  ApiEditMediaConversations,
  ApiGetAllConversations,
  ApiGetAllMediaConversations,
  ApiGetPeople,
} from "../../util/apis";
import ConversationHead from "../Share/ConversationHead";
import PersonHead from "../People/PersonHead";
import UserModalSpinner from "../layout/UserModalSpinner";
import { useParams } from "react-router-dom";
import { mediaActions } from "../../store/media-slice";
import { personActions } from "../../store/person-slice";
import { conversationActions } from "../../store/conversation-slice";
import EmptyState from "../UI/EmptyState";

const ShareForm = function ({ closeAction }) {
  const { mediaId } = useParams();
  const [toClose, setToClose] = useState(false);
  const [viewSelected, setViewSelected] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [search, setSearch] = useState("");
  const [requestList, setRequestList] = useState([]);
  const { sendRequest, data, isLoading } = useHttp();
  const existingListRequest = useHttp([]);
  const conversationRequest = useHttp();
  const peopleRequest = useHttp();
  const dispatch = useDispatch();
  const { deselected, selected, selectHandler, allSelected } = useSelection(
    existingListRequest.data
  );
  const loadingState =
    isLoading ||
    conversationRequest.isLoading ||
    peopleRequest.isLoading ||
    existingListRequest.isLoading;
  const selectionList = !viewSelected
    ? requestList
    : Array.from(selected.values());

  useEffect(() => {
    existingListRequest.sendRequest(
      ApiGetAllMediaConversations(mediaId),
      "GET",
      {},
      {},
      false,
      false
    );
  }, []);

  useEffect(() => {
    conversationRequest.sendRequest(
      ApiGetAllConversations(0, 0, search),
      "GET",
      {},
      {},
      false,
      false
    );
  }, [search]);

  useEffect(() => {
    if (conversationRequest.data) {
      setRequestList(conversationRequest.data.response);
      peopleRequest.sendRequest(
        ApiGetPeople(search),
        "GET",
        {},
        {},
        false,
        false
      );
    }
  }, [conversationRequest.data]);

  useEffect(() => {
    if (peopleRequest.data) {
      setRequestList((state) => {
        const uniqueConvo = new Set();
        conversationRequest.data.response.forEach((item) => {
          if (!item.group) {
            uniqueConvo.add(item.members[0].username);
          }
        });

        const newState = [...conversationRequest.data.response];
        peopleRequest.data.forEach((item) => {
          if (!uniqueConvo.has(item.username)) {
            newState.push(item);
          }
        });

        return newState;
      });
    }
  }, [peopleRequest.data]);

  const shareAction = () => {
    if (selected.size > 0 || deselected.size > 0) {
      const conversationsToAdd = [];
      const peopleToAdd = [];
      selected.forEach((value, key) => {
        if (Number.isInteger(key)) conversationsToAdd.push(key);
        else peopleToAdd.push(key);
      });
      sendRequest(
        ApiEditMediaConversations(mediaId),
        "POST",
        {
          conversationsToAdd,
          peopleToAdd,
          conversationsToRemove: Array.from(deselected.keys()),
        },
        {},
        false,
        false
      );
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(mediaActions.updateItem({ item: data }));
      dispatch(personActions.reset());
      dispatch(conversationActions.reset());
      closeAction(data);
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
        <section className={`${formClasses.container} ${classes.container}`}>
          <div
            className={`modal-heading modal-padding ${formClasses.head} ${classes.head} gap-lg`}
          >
            <div>
              <div className="flex-row">
                <h3 className="heading-tertiary">Select</h3>
                or
                <ButtonPrimary
                  type={"button"}
                  onClick={() => {
                    setIsCreating(true);
                  }}
                >
                  New Group
                </ButtonPrimary>
              </div>
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
            {
              <div className="padding-top">
                <TextSearch
                  size="max"
                  timed={true}
                  responsive={false}
                  disabled={viewSelected}
                  action={(value) => {
                    setRequestList([]);
                    setSearch(value);
                  }}
                  placeholder="Find conversations or people..."
                />
              </div>
            }
          </div>
          <div className={`${formClasses.list} ${classes.list}`}>
            {conversationRequest.data && peopleRequest.data && (
              <ul className="">
                {selectionList.map((item) => {
                  let comp;
                  if (Number.isInteger(item.id)) {
                    comp = (
                      <ConversationHead
                        key={item.id}
                        isGroup={item.group}
                        name={item.name}
                        url={item.iconThumbnail}
                        memberCount={item.memberCount}
                        members={item.members}
                        type="conversation"
                        selected={allSelected.some((id) => id === item.id)}
                      />
                    );
                  } else {
                    comp = (
                      <PersonHead
                        fullname={`${item.firstName} ${item.lastName}`}
                        url={item.iconThumbnail}
                        username={item.username}
                        type="list-item"
                        selected={allSelected.some((id) => id === item.id)}
                      />
                    );
                  }

                  return (
                    <li
                      key={item.id}
                      className={classes.item}
                      onClick={() => {
                        selectHandler(item);
                      }}
                    >
                      <div className="width-100">{comp}</div>
                    </li>
                  );
                })}
              </ul>
            )}
            {!isLoading && loadingState && (
              <span className="flex-row">
                <UserModalSpinner />
              </span>
            )}
            {requestList.length == 0 && !loadingState && !viewSelected && (
              <EmptyState title="No result" />
            )}
          </div>
          <div
            className={`flex-row modal-padding justify-end ${formClasses.action}`}
          >
            {isLoading && <ModalSpinner />}
            <ButtonPrimary
              type="button"
              disabled={isLoading}
              onClick={() => {
                shareAction();
              }}
            >
              Share
            </ButtonPrimary>
            <ButtonPrimary
              type="button"
              disabled={isLoading}
              style={"secondary"}
              onClick={() => setToClose(true)}
            >
              Cancel
            </ButtonPrimary>
          </div>
        </section>
      </Modal>
      {isCreating && (
        <EditGroupMembersForm
          isNewGroup={true}
          closeAction={(data) => {
            if (data) {
              !requestList.some((item) => item.id === data.id) &&
                setRequestList((state) => [data, ...state]);
              selectHandler(data);
            }
            setIsCreating(false);
          }}
        />
      )}
    </div>
  );
};

export default ShareForm;
