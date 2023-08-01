import React, { useMemo, useState } from "react";
import { MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AlbumForm from "../components/Albums/AlbumForm";
import AlbumList from "../components/Albums/AlbumList";
import AlbumListContainer from "../components/Albums/AlbumListContainer";
import Menu from "../components/UI/Menu";
import TextSearch from "../components/UI/Search/TextSearch";
import { albumsActions } from "../store/albums-slice";

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
