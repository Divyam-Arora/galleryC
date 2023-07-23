import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useState } from "react";
import { API_KEY } from "../util/api-key";
import { useMemo } from "react";
import Album from "./Album";
import items from "../components/Albums/data";
import AlbumList from "../components/Albums/AlbumList";
import useHttp from "../hooks/http-hook";
import { albumsActions } from "../store/albums-slice";
import { ApiGetAllAlbums } from "../util/apis";
import ButtonPrimary from "../components/UI/ButtonPrimary";
import {
  MdAdd,
  MdAddBox,
  MdAddCircleOutline,
  MdLibraryAdd,
  MdOutlineAddBox,
  MdSearch,
} from "react-icons/md";
import { IconContext } from "react-icons";
import AlbumForm from "../components/Albums/AlbumForm";
import Menu from "../components/UI/Menu";
import ScrollTriggerContainer from "../components/UI/ScrollTriggerContainer";
import AlbumListContainer from "../components/Albums/AlbumListContainer";
import TextSearch from "../components/UI/Search/TextSearch";
import { notificationActions } from "../store/notification-slice";
import { showNotifications } from "../store/notification-actions";
import EmptyState from "../components/UI/EmptyState";

const AlbumsPage = React.memo((props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { list: albums, search } = useSelector((state) => state.albums);
  const { isLoading } = useSelector((state) => state.httpState);
  const [isCreating, setIsCreating] = useState(false);
  const menuItems = useMemo(
    () => ({
      "Create Album": () => {
        setIsCreating(true);
      },
    }),
    []
  );

  const createAction = (data) => {
    if (data) {
      navigate("/albums/" + data.id);
    }
    setIsCreating(false);
  };

  const searchAction = (input) => {
    console.log(input);
    dispatch(albumsActions.search({ search: input }));
  };

  const albumComp = useMemo(() => <AlbumList list={albums} />, [albums]);
  return (
    <>
      <div className="content-header header-loader">
        <h2 className="heading-secondary flex-row ellipsis">
          {search ? (
            <>
              <span className="flex-row">
                <MdSearch />
              </span>{" "}
              <p className="ellipsis">{search}</p>
            </>
          ) : (
            <p className="ellipsis">Albums</p>
          )}
        </h2>
        <span className="flex-row">
          <TextSearch
            page="albums"
            value={search}
            action={searchAction}
            placeholder="Find albums..."
          />
          <Menu menuItems={menuItems} />
        </span>
        {isCreating && <AlbumForm createAction={createAction} />}
      </div>
      <div
        className="subcontent"
        id={location.pathname.split("/").join("") + "_subcontent"}
      >
        <AlbumListContainer>{albumComp}</AlbumListContainer>
      </div>
    </>
  );
});

export default AlbumsPage;
