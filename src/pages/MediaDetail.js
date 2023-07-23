import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { API_KEY } from "../util/api-key";
import Media from "../components/Media/Media";
import useHttp from "../hooks/http-hook";
import { ApiGetMedia } from "../util/apis";
import { mediaActions } from "../store/media-slice";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { IconContext } from "react-icons";
import ButtonPrimary from "../components/UI/ButtonPrimary";
import { MdInfo, MdShare } from "react-icons/md";
import Menu from "../components/UI/Menu";

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
