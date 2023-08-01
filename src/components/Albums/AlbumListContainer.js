import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/http-hook";
import { albumsActions } from "../../store/albums-slice";
import { ApiGetAllAlbums } from "../../util/apis";
import EmptyState from "../UI/EmptyState";
import ScrollTriggerContainer from "../UI/ScrollTriggerContainer";

const AlbumListContainer = ({ children, triggerPaused, showLoader = true }) => {
  const {
    list: albums,
    page,
    hasNext,
    extra,
    totalElements,
    search,
    refresh,
  } = useSelector((state) => state.albums);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, sendRequest, cleanUp, isLoading } = useHttp();

  const albumsAction = () => {
    sendRequest(
      ApiGetAllAlbums(page + 1, extra, search),
      "GET",
      {},
      {},
      showLoader
    );
  };

  useEffect(() => {
    if (data) {
      dispatch(
        albumsActions.append({
          list: data.response,
          page: data.page,
          hasNext: data.hasNext,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
        })
      );
    }
  }, [data, dispatch]);

  return (
    <>
      <ScrollTriggerContainer
        action={albumsAction}
        page={page}
        hasNext={hasNext}
        extra={extra}
        search={search}
        triggerPaused={triggerPaused}
        refresh={refresh}
      >
        {children}
      </ScrollTriggerContainer>
      {albums.length == 0 && !isLoading && (
        <EmptyState
          title="No Albums"
          description="Create an album to organize your media."
        />
      )}
    </>
  );
};

export default AlbumListContainer;
