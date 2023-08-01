import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/http-hook";
import { albumActions } from "../../store/album-slice";
import { albumsActions } from "../../store/albums-slice";
import { ApiEditAlbumMedia, ApiGetAllAlbumMedia } from "../../util/apis";
import MediaForm from "../Media/MediaForm";

const AlbumMediaForm = function ({ addAction }) {
  const [toAdd, setToAdd] = useState(new Map());
  const [toRemove, setToRemove] = useState(new Map());
  const album = useSelector((state) => state.album);
  const [albumMedia, setAlbumMedia] = useState([]);
  const dispatch = useDispatch();

  const { data, sendRequest, cleanUp, error } = useHttp();
  const albumRequest = useHttp();

  useEffect(() => {
    album.item &&
      albumRequest.sendRequest(ApiGetAllAlbumMedia(album?.item?.id));
  }, []);

  useEffect(() => {
    if (albumRequest.data) {
      setAlbumMedia(albumRequest.data);
    }
  }, [albumRequest.data]);

  const onSubmit = (media) => {
    setToAdd(media.mediaSelected);
    setToRemove(media.mediaDeselected);
    sendRequest(
      ApiEditAlbumMedia(album.item.id),
      "PUT",
      {
        toAdd: Array.from(media.mediaSelected.keys()),
        toRemove: Array.from(media.mediaDeselected.keys()),
      },
      {},
      false
    );
  };

  useEffect(() => {
    if (data) {
      console.log(toAdd, toRemove);
      dispatch(albumsActions.updateRecent({ list: [data] }));
      // dispatch(albumsActions.update({ item: data, isListItem: true }));
      dispatch(
        albumActions.editMedia({
          toAdd: Array.from(toAdd.values()).reverse(),
          toRemove: Array.from(toRemove.values()),
        })
      );
    }
  }, [data]);

  return (
    <MediaForm
      action={onSubmit}
      addAction={addAction}
      existingList={albumMedia}
      isSuccess={!!data}
    />
  );
};

export default AlbumMediaForm;
