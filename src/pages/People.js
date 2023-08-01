import { React } from "react";
import { MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PeopleList from "../components/People/PeopleList";
import PeopleListContainer from "../components/People/PeopleListContainer";
import TextSearch from "../components/UI/Search/TextSearch";
import { peopleActions } from "../store/people-slice";

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
          padding={true}
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
