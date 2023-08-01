import { useState } from "react";
import useHttp from "../../../hooks/http-hook";
import DeleteModal from "./DeleteModal";

const DeleteIconForm = function ({ API, action }) {
  const [toClose, setToClose] = useState(false);
  const { data, sendRequest, isLoading } = useHttp();

  const submitHandler = (e) => {
    e.preventDefault();
    sendRequest(API, "DELETE", {}, {}, false);
  };

  return <DeleteModal API={API} />;
};

export default DeleteIconForm;
