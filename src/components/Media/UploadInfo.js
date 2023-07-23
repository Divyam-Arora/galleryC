import { useDispatch, useSelector } from "react-redux";
import classes from "./UploadInfo.module.css";
import {
  MdCheck,
  MdCheckCircle,
  MdCheckCircleOutline,
  MdClearAll,
  MdClose,
  MdError,
  MdErrorOutline,
  MdInfo,
  MdInfoOutline,
  MdMinimize,
  MdPlayCircle,
} from "react-icons/md";
import { uploadActions } from "../../store/upload-slice";
import { useCallback, useEffect, useRef, useState } from "react";
import { uploadAction } from "../../util/actions";
import { IconContext } from "react-icons";

const timeout = 3000;
const UploadInfo = function () {
  const [isMax, setIsMax] = useState(true);
  const [timer, setTimer] = useState();
  const { active, passive } = useSelector((s) => s.upload);
  const uploadRef = useRef();
  const dispatch = useDispatch();
  console.log(isMax);

  useEffect(() => {
    setMaxTimer(false);
    uploadRef.current.addEventListener("mouseover", onMouseOverHandler);
    uploadRef.current.addEventListener("mouseleave", () => {
      setMaxTimer(false);
      console.log("mouse leave");
    });
    console.log("in use Effect ");
  }, []);

  const setMaxTimer = (max = false, timeout = 3000) => {
    setTimer(
      setTimeout(() => {
        setIsMax(max);
      }, timeout)
    );
  };

  const onMouseOverHandler = useCallback(() => {
    const listner = (e) => {
      if (isMax && !e.target.closest(`.${classes.container}`)) {
        setIsMax(false);
        document.removeEventListener("click", listner);
      }
    };

    document.addEventListener("click", listner);
    setTimer((s) => {
      clearTimeout(s);
      return null;
    });
    // clearTimeout(timer);
    setIsMax(true);
  }, []);

  const onMinimize = useCallback(() => {
    uploadRef.current.removeEventListener("mouseover", onMouseOverHandler);
    setTimeout(() => {
      console.log("timer running...");
      uploadRef.current.addEventListener("mouseover", onMouseOverHandler);
    }, 300);
    setIsMax(false);
  }, []);

  const onClearHandler = () => {
    onMinimize();
    setTimeout(() => {
      dispatch(uploadActions.clear());
    }, 300);
  };

  const getPassiveText = (tag, description) => {
    let comp;
    let color;
    switch (tag) {
      case uploadAction.Complete:
        color = "var(--success)";
        comp = (
          <>
            <p>Upload completed</p>
            <span className="flex-row">
              <MdCheckCircleOutline />
            </span>
          </>
        );
        break;
      case uploadAction.Size:
        color = "var(--primaryColor)";
        comp = (
          <>
            <p>{description}</p>
            <span className="flex-row">
              <MdInfoOutline />
            </span>
          </>
        );
        break;
      case uploadAction.Fail:
        color = "var(--alert)";
        comp = (
          <>
            <p>Something went wrong!</p>
            <span className="flex-row">
              <MdErrorOutline />
            </span>
          </>
        );
        break;
    }

    return (
      <IconContext.Provider value={{ color, size: "2rem" }}>
        {comp}
      </IconContext.Provider>
    );
  };

  return (
    <section
      ref={uploadRef}
      className={`${classes.container} ${isMax ? "" : classes.min}`}
    >
      <div className="flex-column height-100">
        <div className="flex-row justify-space-between">
          <h4 className="heading-tertiary">Uploads</h4>
          <div className="flex-row no-gap">
            <span title="Minimize" className="icon" onClick={onMinimize}>
              <MdMinimize />
            </span>
            <span title="Clear" className="icon" onClick={onClearHandler}>
              <MdClearAll />
            </span>
          </div>
        </div>
        <ul className={`flex-column justify-start ${classes.list}`}>
          {active.map((item) => (
            <li key={item.id} className="flex-row justify-start">
              <div
                className={classes.thumbnail}
                style={{ backgroundImage: `url(${item.file})` }}
              ></div>
              <p>Uploading...</p>
            </li>
          ))}
          {passive.map((item) => (
            <li key={item.id} className={classes.item}>
              <div className={classes.thumbnail}>
                {item.type.includes("image") ? (
                  <img src={item.file} />
                ) : (
                  <>
                    <video controls={false} autoPlay={false}>
                      <source src={item.file}></source>
                    </video>
                    <span className={classes.icon}>
                      <MdPlayCircle />
                    </span>
                  </>
                )}
              </div>
              <div
                className="flex-row justify-space-between"
                // style={{ flexShrink: 0 }}
              >
                {getPassiveText(item.tag, item.description)}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={classes.loader}
        style={{
          height: `${
            100 - (active.length / (passive.length + active.length)) * 100
          }%`,
          backgroundColor: `${
            active.length > 0 ? "transparent" : "var(--primaryColor)"
          }`,
        }}
      ></div>
      <div className={classes.progress}>
        <p>{`${
          100 -
          (active.length / (passive.length + active.length)).toFixed(2) * 100
        }%`}</p>
      </div>
    </section>
  );
};

export default UploadInfo;
