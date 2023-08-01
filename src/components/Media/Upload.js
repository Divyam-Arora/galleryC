import { useEffect, useReducer, useRef } from "react";
import { IconContext } from "react-icons";
import { MdOutlineFileUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/http-hook";
import { homeActions } from "../../store/home-slice";
import { showNotifications } from "../../store/notification-actions";
import { uploadActions } from "../../store/upload-slice";
import { uploadAction } from "../../util/actions";
import { ApiUploadMedia } from "../../util/apis";
import { maxImageSize, maxVideoSize } from "../../util/helpers";
import ButtonPrimary from "../UI/ButtonPrimary";
import classes from "./Upload.module.css";

const initFiles = [];
const filesReducer = (state, action) => {
  // const files = Array.from(action.payload.list);
  console.log(action);
  switch (action.type) {
    case "APPEND":
      const newState = {
        id: new Date().getTime().toString() + Math.random(),
        file: action.file,
      };
      if (
        (action.file.type.includes("image") &&
          action.file.size <= maxImageSize) ||
        (action.file.type.includes("video") && action.file.size <= maxVideoSize)
      ) {
        action.dispatch(
          uploadActions.appendActive({
            list: [
              {
                id: newState?.id,
                file: URL.createObjectURL(action.file),
                type: action.file.type.split("/")[0],
              },
            ],
          })
        );
        return [...state, newState];
      } else {
        const errText = action.file.type.includes("image")
          ? "10MB Image size limit exceeded"
          : "50MB Video size limit exceeded";
        action.dispatch(
          uploadActions.appendPassive({
            list: [
              {
                id: newState.id,
                tag: uploadAction.Size,
                description: errText,
                file: URL.createObjectURL(action.file),
                type: action.file.type.split("/")[0],
              },
            ],
          })
        );
        return [...state];
      }
      break;
    case "REMOVE":
      const removed = state.shift();
      action.dispatch(
        uploadActions.shift({
          id: removed.id,
          tag: action.tag,
          description: action.description,
        })
      );
      return [...state];

    default:
      throw new Error("unknown action type");
  }
};

const Upload = function (props) {
  const formRef = useRef();
  const fileInputRef = useRef();
  const { search } = useSelector((state) => state.home);
  // const [files, setFiles] = useState({ active: [], passive: [] });
  const [files, dispatchFiles] = useReducer(filesReducer, initFiles);
  const dispatch = useDispatch();
  const { data, cleanUp, sendRequest, error, isLoading } = useHttp();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const triggerUpload = (e) => {
    const fileElement = fileInputRef.current;
    fileElement.click();
  };

  const fileUploadHandler = (e) => {
    // const file = fileInputRef.current.value;
    const formData = new FormData(formRef.current);
    const files = Array.from(formData.entries());
    const inputFiles = fileInputRef.current.files;
    console.log(files);
    console.log(formData);
    console.log(fileInputRef.current.files[0]);
    if (files.length > 0) {
      cleanUp();
      Array.from(inputFiles).forEach((file) => {
        dispatchFiles({ type: "APPEND", dispatch, file });
      });
      dispatch(
        showNotifications({
          title: "Uploading",
          description: `Uploading ${files.length} file${
            files.length > 1 ? "s" : ""
          }`,
          type: "INFO",
        })
      );

      formRef.current.reset();
    }
  };

  useEffect(() => {
    const body = new FormData();
    if (files.length > 0) {
      body.append("media", files[0].file);
      sendRequest(
        ApiUploadMedia(),
        "POST",
        body,
        {
          "Content-Type": "multipart/form-data",
        },
        false,
        false
      );
    }
  }, [files]);

  useEffect(() => {
    if (data?.length > 0) {
      const currentDate = new Date();
      if (
        (search.date == currentDate.getDate() || search.date == null) &&
        (search.month ==
          currentDate
            .toLocaleDateString("en-us", { month: "long" })
            .toUpperCase() ||
          search.month == null) &&
        (search.year == currentDate.getFullYear() || search.year == null)
      ) {
        dispatch(homeActions.add({ list: data }));
      }
      // dispatch(
      //   showNotifications({
      //     title: "Uploaded",
      //     description: `Successfully uploaded`,
      //     type: "SUCCESS",
      //   })
      // );
      // formRef.current.reset();
      dispatchFiles({
        type: "REMOVE",
        dispatch,
        tag: uploadAction.Complete,
        description: "Upload completed",
      });
      if (props.action) {
        props.action(data);
      }
    }

    if (error) {
      dispatchFiles({
        type: "REMOVE",
        dispatch,
        tag: uploadAction.Fail,
        description: error?.message,
      });
    }
  }, [data, dispatch, homeActions, error]);

  return (
    <div className={classes.upload}>
      <ButtonPrimary
        onClick={triggerUpload}
        disabled={isLoading}
        type="button"
        compact={true}
      >
        <IconContext.Provider value={{ size: "2rem" }}>
          {/* {!isLoading ? (
            <UploadSpinner />
          ) : ( */}
          <>
            <MdOutlineFileUpload />
            <p>Upload</p>
          </>
          {/* )} */}
        </IconContext.Provider>
        <form
          ref={formRef}
          style={{ display: "none" }}
          onSubmit={submitHandler}
        >
          <input
            ref={fileInputRef}
            type="file"
            name="media"
            multiple
            accept="image/*, video/*, .mkv"
            style={{
              display: "none",
            }}
            onChange={fileUploadHandler}
          />
        </form>
      </ButtonPrimary>
    </div>
  );
};

export default Upload;
