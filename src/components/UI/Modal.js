import { useCallback, useEffect, useRef } from "react";
import { IconContext } from "react-icons";
import { MdClose } from "react-icons/md";
import classes from "./Modal.module.css";

const Modal = function ({
  action,
  data,
  close,
  type = "close-icon",
  initialReset = false,
  children,
}) {
  const backdropRef = useRef();
  const closeRef = useRef();

  const closeModal = () => {
    backdropRef.current.classList.add(classes["on-close"]);
    setTimeout(() => {
      action(data);
    }, 300);
  };

  useEffect(() => {
    backdropRef.current.addEventListener("click", onClose);
  }, []);

  useEffect(() => {
    if (data || close) {
      closeModal();
    }
  }, [data, close]);

  const onClose = (e) => {
    if (
      e.target.classList.contains(classes.backdrop) ||
      e.target.closest("#close")
    ) {
      closeModal();
    }
  };

  return (
    <div className={classes.backdrop} ref={backdropRef}>
      <div className={`${classes.modal} ${initialReset ? classes.reset : ""}`}>
        <IconContext.Provider
          value={{
            size: "24px",
            color: "var(--primaryColor)",
            style: { fontWeight: "bold" },
          }}
        >
          <span
            id="close"
            className={classes.close}
            ref={closeRef}
            style={{ display: type == "close-icon" ? "inline" : "none" }}
          >
            <MdClose />
          </span>
        </IconContext.Provider>
        {children}
      </div>
    </div>
  );
};

export default Modal;
