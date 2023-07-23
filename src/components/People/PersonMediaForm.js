import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/http-hook";
import { personActions } from "../../store/person-slice";
import { shareActions } from "../../store/share-slice";
import {
  ApiEditPeopleSharedMedia,
  ApiGetAllPersonSharedMedia,
} from "../../util/apis";
import MediaForm from "../Media/MediaForm";

const PersonMediaForm = function ({ addAction }) {
  const { item: person } = useSelector((state) => state.person);
  const [sharedMedia, setSharedMedia] = useState([]);
  const [toAdd, setToAdd] = useState(new Map());
  const [toRemove, setToRemove] = useState(new Map());
  const sharedMediaRequest = useHttp();
  const { sendRequest, data } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    sharedMediaRequest.sendRequest(
      ApiGetAllPersonSharedMedia(person?.username),
      "GET",
      {},
      {},
      false
    );
  }, []);

  useEffect(() => {
    if (sharedMediaRequest.data) {
      setSharedMedia(sharedMediaRequest.data);
    }
  }, [sharedMediaRequest.data]);

  const onSubmit = (media) => {
    setToAdd(media.mediaSelected);
    setToRemove(media.mediaDeselected);
    sendRequest(
      ApiEditPeopleSharedMedia(),
      "POST",
      {
        toAdd: Array.from(media.mediaSelected.keys()),
        toRemove: Array.from(media.mediaDeselected.keys()),
        people: [person?.username],
      },
      {},
      false
    );
  };

  useEffect(() => {
    if (data) {
      dispatch(personActions.updateItem({ item: data.people[0] }));
      dispatch(personActions.refresh());
      dispatch(shareActions.refresh());
    }
  }, [data]);

  return (
    <MediaForm
      addAction={addAction}
      existingList={sharedMedia}
      action={onSubmit}
      isSuccess={!!data}
    />
  );
};

export default PersonMediaForm;
