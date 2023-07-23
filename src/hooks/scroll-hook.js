import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getState, saveState } from "./scrollData";

const useScroll = function () {
  const location = useLocation();

  const listner = useCallback(
    (e) => {
      // console.log(e.currentTarget.scrollTop);
      // console.log(location.pathname.split("/").join(""));
      saveState(
        location.pathname.split("/").join(""),
        e.currentTarget.scrollTop
      );
    },
    [location.pathname]
  );

  console.log("rendered");

  useEffect(() => {
    const uniqueId = location.pathname.split("/").join("");
    const scrollEl = document.getElementById(uniqueId + "_subcontent");
    // console.log(uniqueId);
    if (scrollEl) {
      // console.log(scrollEl);
      if (getState(uniqueId)) {
        scrollEl.scrollTop = getState(uniqueId);
      }
      scrollEl.addEventListener("scroll", listner, { capture: true });
    }

    return () => {
      if (scrollEl) {
        // console.log("cleanup -- ", uniqueId);
        // saveState(uniqueId, 0);
        scrollEl.removeEventListener("scroll", listner);
      }
    };
  }, [location.pathname]);
};

export default useScroll;
