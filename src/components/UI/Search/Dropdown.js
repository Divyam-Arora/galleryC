import React, { useEffect, useRef, useState } from "react";
import classes from "./Dropdown.module.css";
import { MdAdd, MdTransitEnterexit } from "react-icons/md";
import { IconContext } from "react-icons";
function Dropdown({ list, action }) {
  const ulRef = useRef();
  const liRef = useRef();
  const [activeItem, setActiveItem] = useState(-1);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDownHandler);
  }, []);

  const onKeyDownHandler = (e) => {
    // e.stopPropagation();
    // console.log(e);
    if (e.code == "ArrowUp") {
      e.preventDefault();
      setActiveItem((s) => Math.max(s - 1, 0));
    }

    if (e.code == "ArrowDown") {
      e.preventDefault();
      setActiveItem((s) => Math.min(s + 1, list.length - 1));
    }

    if (e.code == "Enter") {
      // e.preventDefault();
      // console.log("pressed enter " + activeItem);
      const value = ulRef.current.querySelector(`li.${classes.active}`).dataset
        .value;
      // console.log(value);
      value && action(value);
    }
  };

  useEffect(() => {
    return () => window.removeEventListener("keydown", onKeyDownHandler);
  }, []);
  return (
    <>
      {
        <div className={classes.container}>
          <ul
            ref={ulRef}
            // onKeyDown={onKeyDownHandler}
            className={`${classes.list} ${
              list.length == 0 ? classes.clear : ""
            }`}
          >
            {list.map((item, i) => (
              <li
                key={item}
                ref={liRef}
                data-value={item}
                onClick={() => action && action(item)}
                className={i == activeItem ? classes.active : ""}
              >
                <IconContext.Provider value={{ size: "2rem" }}>
                  <MdAdd />
                  <strong>{item}</strong>
                </IconContext.Provider>
              </li>
            ))}
          </ul>
        </div>
      }
    </>
  );
}

export default Dropdown;
