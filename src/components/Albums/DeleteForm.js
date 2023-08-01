import { useDispatch } from "react-redux";
import { albumsActions } from "../../store/albums-slice";
import { ApiDeleteAlbum } from "../../util/apis";
import DeleteModal from "../UI/Forms/DeleteModal";

const DeleteForm = function ({ deleteAction, albumId }) {
  const dispatch = useDispatch();

  const onDeleted = (data) => {
    data && dispatch(albumsActions.remove({ id: albumId }));
    deleteAction(data);
  };

  return (
    <DeleteModal
      API={ApiDeleteAlbum(albumId)}
      action={onDeleted}
      tag={"Delete"}
      target={"Album"}
      text={
        "Deleting album will remove all media from it but won't delete it from your gallery.\nAre you sure you wanna delete this album?"
      }
    />
  );
};

export default DeleteForm;
