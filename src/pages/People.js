import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { React, useEffect } from "react";
import PeopleList from "../components/People/PeopleList";
import useHttp from "../hooks/http-hook";
import { peopleActions } from "../store/people-slice";
import TextSearch from "../components/UI/Search/TextSearch";
import { ApiGetPeople } from "../util/apis";
import PeopleListContainer from "../components/People/PeopleListContainer";
import { MdSearch } from "react-icons/md";

const PeoplePage = (props) => {
  const people = useSelector((state) => state.people);
  const dispatch = useDispatch();
  const location = useLocation();

  const searchAction = (input) => {
    dispatch(peopleActions.search({ search: input }));
  };

  return (
    <>
      <div className="content-header">
        <h2 className="heading-secondary ellipsis">
          {people.search ? (
            <div className="flex-row">
              <MdSearch /> {people.search}
            </div>
          ) : (
            "Recently Shared"
          )}
        </h2>
        <TextSearch
          page="people"
          value={people.search}
          action={searchAction}
          timed={true}
          placeholder="Find people..."
        />
      </div>
      <div
        className="subcontent"
        id={location.pathname.split("/").join("") + "_subcontent"}
      >
        <PeopleListContainer>
          <PeopleList />
        </PeopleListContainer>
      </div>
    </>
  );
};

export default PeoplePage;
