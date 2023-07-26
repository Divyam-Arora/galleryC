import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AlbumDetail from "../components/Albums/AlbumDetail";
import useHttp from "../hooks/http-hook";
import { ApiGetAlbum, ApiGetAlbumMedia } from "../util/apis";
import ButtonPrimary from "../components/UI/ButtonPrimary";
import {
  MdAdd,
  MdAddPhotoAlternate,
  MdDelete,
  MdOutlineAddPhotoAlternate,
  MdSearch,
} from "react-icons/md";
import { IconContext } from "react-icons";
import DeleteForm from "../components/Albums/DeleteForm";
import { albumsActions } from "../store/albums-slice";
import AlbumMediaForm from "../components/Albums/AlbumMediaForm";
import Menu from "../components/UI/Menu";
import EditForm from "../components/Albums/EditForm";
import { albumActions } from "../store/album-slice";
import ScrollTriggerContainer from "../components/UI/ScrollTriggerContainer";
import TextSearch from "../components/UI/Search/TextSearch";
import EmptyState from "../components/UI/EmptyState";
import BackgroundLoader from "../components/UI/Spinner/BackgroundLoader";

const AlbumPage = ({ items }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const album = useSelector((state) => state.album);
  const dispatch = useDispatch();
  const { data, sendRequest, cleanUp, error } = useHttp();
  const albumRequest = useHttp();
  const albumMediaRequest = useHttp();
  const navigate = useNavigate();
  const location = useLocation();
  const { albumId } = useParams();

  useEffect(() => {
    if (album?.item?.id != albumId) {
      albumRequest.sendRequest(ApiGetAlbum(albumId));
    }
  }, []);

  useEffect(() => {
    if (albumRequest.data) {
      dispatch(albumActions.newItem({ item: albumRequest.data }));
    }
  }, [albumRequest.data]);

  const mediaAction = () => {
    albumMediaRequest.sendRequest(
      ApiGetAlbumMedia(album.item.id, album.page + 1, album.extra, album.search)
    );
  };

  useEffect(() => {
    if (albumMediaRequest.data) {
      dispatch(
        albumActions.append({
          list: albumMediaRequest.data.response,
          page: albumMediaRequest.data.page,
          hasNext: albumMediaRequest.data.hasNext,
          totalPages: albumMediaRequest.data.totalPages,
          totalElements: albumMediaRequest.data.totalElements,
        })
      );
    }
  }, [albumMediaRequest.data]);

  const deleteAction = (data) => {
    if (data) {
      navigate("/albums");
    }
    setIsDeleting(false);
  };

  const editAction = (data) => {
    setIsEditing(false);
  };

  const addAction = (data) => {
    setIsAdding(false);
  };

  const searchAction = (input) => {
    dispatch(albumActions.search({ search: input }));
  };

  return (
    <>
      <div className="content-header">
        <h2
          title={error || album?.item?.name}
          className="heading-secondary ellipsis flex-row align-end"
        >
          {album.search ? (
            <div className="flex-row">
              <MdSearch /> {album.search}
            </div>
          ) : (
            album?.item?.id == albumId && album?.item?.name
          )}
          {!album.search && albumRequest.isLoading && (
            <BackgroundLoader height={"100%"} width={"400px"} animate={true} />
          )}
        </h2>
        <span className="flex-row">
          <TextSearch
            page={"album"}
            value={album.search}
            action={searchAction}
            placeholder="Find album media..."
          />
          <Menu
            menuItems={{
              "Add Media": () => {
                setIsAdding(true);
              },
              "Delete Album": () => {
                setIsDeleting(true);
              },
              "Edit Album": () => {
                setIsEditing(true);
              },
            }}
          />
        </span>
      </div>
      <div
        className="subcontent"
        id={location.pathname.split("/").join("") + "_subcontent"}
      >
        {album?.item?.id == albumId && (
          <ScrollTriggerContainer
            action={mediaAction}
            page={album.page}
            hasNext={album.hasNext}
            extra={album.extra}
            search={album.search}
            refresh={album.refresh}
          >
            <AlbumDetail albumId={albumId} />
          </ScrollTriggerContainer>
        )}
        {album.list.length == 0 &&
          !albumMediaRequest.isLoading &&
          !albumRequest.isLoading && <EmptyState title="No media" />}
        {isDeleting && (
          <DeleteForm deleteAction={deleteAction} albumId={albumId} />
        )}
        {isEditing && <EditForm editAction={editAction} album={album?.item} />}
        {isAdding && <AlbumMediaForm addAction={addAction} />}
      </div>
    </>
  );
};

export default AlbumPage;
