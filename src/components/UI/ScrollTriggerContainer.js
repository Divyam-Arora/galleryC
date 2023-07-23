import { useEffect, useMemo, useRef, useState } from "react";

const ScrollTriggerContainer = function ({
  children,
  action,
  page,
  search,
  hasNext,
  extra,
  triggerPaused,
  reverse = false,
  refresh = false,
}) {
  const [observer, setObserver] = useState(null);
  const triggerRef = useRef();
  const callback = (entries, observer) => {
    if ((action && entries[0].isIntersecting) || refresh) {
      action();
      observer.disconnect();
    }
  };

  useEffect(() => {
    if (observer) {
      observer.disconnect();
    }
    const newOb = new IntersectionObserver(callback, {
      root: triggerRef.current.parentNode,
      threshold: 0,
      rootMargin: "100%",
    });
    // console.log("scrollTrigger", extra, hasNext);
    hasNext && !triggerPaused && newOb.observe(triggerRef.current);
    setObserver(newOb);

    return () => {
      newOb.disconnect();
    };
  }, [page, search, hasNext, extra, refresh, triggerPaused]);

  // useEffect(() => {
  //   if (observer) {
  //     if (triggerPaused) observer.unobserve(triggerRef.current);
  //     else observer.observe(triggerRef.current);
  //   }
  // }, [triggerPaused]);

  return (
    <>
      {reverse && <span ref={triggerRef}></span>}
      {children}
      {!reverse && <span ref={triggerRef}></span>}
    </>
  );
};
export default ScrollTriggerContainer;
