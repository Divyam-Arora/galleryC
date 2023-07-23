import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useHttp from "../hooks/http-hook";
import { ApiGetAllGroups } from "../util/apis";
import { shareActions } from "../store/share-slice";
import Conversations from "../components/Share/Conversations";

const SharePage = () => {
  return <Conversations />;
};

export default SharePage;
