import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/http-hook";
import { homeActions } from "../../store/home-slice";
import { ApiGetAllMedia } from "../../util/apis";
import EmptyState from "../UI/EmptyState";
import ScrollTriggerContainer from "../UI/ScrollTriggerContainer";

const MediaListContainer = ({ children, triggerPaused, showLoader = true }) => {
  const {
    list: media,
    page,
    hasNext,
    extra,
    search,
    searchPage,
    refresh,
  } = useSelector((state) => state.home);
  // const [gotData, setGotData] = useState(false);
  const dispatch = useDispatch();

  const { data, sendRequest, cleanUp, isLoading } = useHttp();

  // useEffect(() => {
  //   if (!data && media.length === 0) {
  //     sendRequest(ApiGetAllMedia(0), "GET");
  //   }

  //   return cleanUp;
  // }, [media, sendRequest, cleanUp]);

  const mediaAction = () => {
    console.log(page);
    if (search.year) {
      sendRequest(
        ApiGetAllMedia(
          searchPage.page + 1,
          0,
          search.year,
          search.month,
          search.date
        )
      );
    } else {
      sendRequest(
        ApiGetAllMedia(page + 1, extra, search.year, search.month, search.date),
        "GET",
        {},
        {},
        showLoader
      );
    }
  };

  useEffect(() => {
    if (data) {
      // setGotData(true);
      if (search.year)
        dispatch(
          homeActions.appendSearch({
            list: data.response,
            page: data.page,
            hasNext: data.hasNext,
          })
        );
      else
        dispatch(
          homeActions.append({
            list: data.response,
            page: data.page,
            hasNext: data.hasNext,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
          })
        );
    }

    return cleanUp;
  }, [data, dispatch]);
  return (
    <>
      <ScrollTriggerContainer
        action={mediaAction}
        page={search.year ? searchPage.page : page}
        hasNext={search.year ? searchPage.hasNext : hasNext}
        extra={extra}
        triggerPaused={triggerPaused}
        search={search}
        refresh={refresh}
      >
        {children}
      </ScrollTriggerContainer>
      {media.length == 0 && !isLoading && (
        <EmptyState
          title="No media"
          description="Try uploading media and they will appear here."
        />
      )}
    </>
  );
};

export default MediaListContainer;
