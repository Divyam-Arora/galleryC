import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Home from "../components/Home/Home";

import { useRef } from "react";
import DateSearch from "../components/UI/Search/DateSearch";
import { homeActions } from "../store/home-slice";

// const transformTempData = (data) => {
//   return data.map((val) => {
//     return {
//       id: val.date,
//       date: val.date,
//       media: val.mediaList,
//     };
//   });
// };

const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const scrollEl = useRef();
  const { isLoading } = useSelector((state) => state.httpState);
  const { search, list } = useSelector((state) => state.home);
  const searchAction = (date) => {
    console.log(date);
    dispatch(homeActions.search({ search: date }));
  };

  return (
    <>
      <div className="content-header">
        <h2 className="heading-secondary">Home</h2>
        <DateSearch action={searchAction} initialDate={search} padding={true} />
      </div>
      <div
        className={`subcontent`}
        ref={scrollEl}
        id={`${location.pathname.split("/").join("")}_subcontent`}
      >
        <Home />
      </div>
    </>
  );
};

export default HomePage;
