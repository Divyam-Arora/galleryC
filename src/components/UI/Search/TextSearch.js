import { IconContext } from "react-icons";
import { MdArrowBack, MdSearch } from "react-icons/md";

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import InlineSpinner from "../Spinner/InlineSpinner";
import Dropdown from "./Dropdown";
import EmptyButton from "./EmptyButton";
import classes from "./TextSearch.module.css";

const formatInput = (value = "") => {
  return value
    .trim()
    .split(" ")
    .reduce((acc, val) => (val.length > 0 ? acc + " " + val : acc), "")
    .trim();
};
const TextSearch = ({
  placeholder = "search here...",
  action,
  active = false,
  value = "",
  timed = false,
  timedAction,
  list,
  size = "min",
  responsive = true,
  emptyAfterSearch = false,
  loading = false,
  disabled = false,
  padding = false,
}) => {
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(null);
  const [showDropdown, setShowDropdown] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (value.length > 0) {
      setInput(value);
    }
  }, []);

  useEffect(() => {
    if (showDropdown) {
      const listner = (e) => {
        e.preventDefault();
        if (!e.target.closest("#tag-search-form")) {
          setShowDropdown(false);
          window.removeEventListener("click", listner);
        }
      };
      window.addEventListener("click", listner);
    }
  }, [showDropdown]);

  const hideDropdown = (e) => {
    if (e.code == "Escape") {
      setShowDropdown(false);
    }
  };

  const searchInputHandler = (e) => {
    e.preventDefault();
    !disabled && mainAction(input);
  };

  const mainAction = (value) => {
    if (action) {
      action(formatInput(value));
      emptyAfterSearch && setInput("");
      inputRef.current.focus();
      console.log(value);
    }
  };

  const onChangeInput = (e) => {
    e.preventDefault();
    if (e.target.value.length == 0) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
    if (timed) {
      if (timer) {
        clearTimeout(timer);
      }
      setTimer(
        setTimeout(() => {
          if (timedAction) {
            timedAction(formatInput(e.target.value));
          } else if (action) {
            action(formatInput(e.target.value));
            console.log(e.target.value);
          }
        }, 500)
      );
    }
    setInput(e.target.value);
  };

  const onClickEmpty = (e) => {
    e.preventDefault();
    setInput("");
    setIsOpen(false);
    action("");
    if (timer) {
      clearTimeout(timer);
    }
  };

  return (
    <div
      className={`${classes.container} ${
        responsive ? classes.responsive : ""
      }  ${classes[size]}`}
    >
      <div
        className={classes.button}
        onClick={() => {
          setIsOpen(true);
          inputRef.current.focus();
        }}
      >
        <IconContext.Provider value={{ size: padding ? "3rem" : "2.5rem" }}>
          {/* <ButtonPrimary compact={true}> */}
          <span className={padding ? "icon-sm" : ""}>
            <MdSearch />
          </span>
          {/* </ButtonPrimary> */}
        </IconContext.Provider>
      </div>
      <IconContext.Provider value={{ size: "2rem" }}>
        <form
          onSubmit={searchInputHandler}
          className={`${classes.search} ${isOpen ? classes.open : ""}`}
          onKeyDown={hideDropdown}
          id="tag-search-form"
        >
          <div
            className={`${classes.back} icon`}
            onClick={() => setIsOpen(false)}
          >
            {/* <ButtonPrimary compact={true}> */}
            <MdArrowBack />
            {/* </ButtonPrimary> */}
          </div>
          <input
            ref={inputRef}
            className={`${classes.input} text`}
            type="text"
            value={input}
            onChange={onChangeInput}
            placeholder={placeholder}
            autoFocus={active}
            onClick={() => setShowDropdown(true)}
            disabled={disabled}
          />
          <span className="margin-left-auto flex-row">
            {loading ? (
              <span
                className="flex-row"
                style={{
                  padding: "0.5rem 0.5rem",
                  width: "3rem",
                  height: "3rem",
                }}
              >
                <InlineSpinner />
              </span>
            ) : (
              <EmptyButton
                action={onClickEmpty}
                show={!disabled && input.trim().length > 0}
              />
            )}
          </span>
          <span className={classes.icon} onClick={searchInputHandler}>
            <MdSearch />
          </span>
          {showDropdown && list && list.length > 0 && (
            <Dropdown list={list} action={mainAction} />
          )}
        </form>
      </IconContext.Provider>
    </div>
  );
};

export default TextSearch;
