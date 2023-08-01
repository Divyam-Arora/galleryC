import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Media from "../components/Media/Media";
import useHttp from "../hooks/http-hook";
import { mediaActions } from "../store/media-slice";
import { ApiGetMedia } from "../util/apis";

const MediaDetailPage = () => {
  const { data, sendRequest, cleanUp, error, isLoading } = useHttp();
  const { mediaId } = useParams();
  const { item: media } = useSelector((state) => state.media);
  const dispatch = useDispatch();
  const isSame = media?.id == mediaId;

  useEffect(() => {
    if (!isSame) {
      dispatch(mediaActions.reset());
      sendRequest(ApiGetMedia(mediaId));
    }
    return cleanUp;
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(mediaActions.newItem({ item: data }));
    }
  }, [data]);

  return (
    <>
      <Media />
      {/* {isLoading && <LoadingSpinner />} */}
    </>
  );
};

export default MediaDetailPage;
