import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { showNotifications } from "../../../store/notification-actions";
import ModalSpinner from "../ModalSpinner";
import { MdEdit } from "react-icons/md";
import useHttp from "../../../hooks/http-hook";
import InlineSpinner from "../Spinner/InlineSpinner";

const EditIcon = function ({ API, action, size = "auto" }) {
  const formRef = useRef();
  const inputRef = useRef();
  const { data, sendRequest, isLoading } = useHttp();
  const dispatch = useDispatch();

  const updateHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    if (e.target.files.length > 0) {
      if (e.target.files[0].size > 5242880) {
        dispatch(
          showNotifications({
            title: "Max size exceeded",
            description: "Size should be less than 5 MB!",
            type: "ALERT",
          })
        );
        formRef.current.reset();
      } else {
        dispatch(
          showNotifications({
            title: "Uploading",
            description: "Uploading Image...",
            type: "INFO",
          })
        );
        sendRequest(
          API,
          "POST",
          formData,
          { "Content-Type": "multipart/form-data" },
          false
        );
      }
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(
        showNotifications({
          title: "Uploaded",
          description: "Image uploaded.",
          type: "SUCCESS",
        })
      );

      action && action(data);
      formRef.current.reset();
    }
  }, [data]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="icon">
      <form ref={formRef} style={{ display: "none" }} onSubmit={submitHandler}>
        <input
          ref={inputRef}
          type="file"
          name="file"
          accept="image/*"
          onChange={updateHandler}
        />
      </form>
      {isLoading ? (
        <span className="flex-row" style={{ minHeight: size, minWidth: size }}>
          <InlineSpinner />
        </span>
      ) : (
        <div
          onClick={() => {
            inputRef.current.click();
          }}
        >
          {<MdEdit />}
        </div>
      )}
    </div>
  );
};

export default EditIcon;
