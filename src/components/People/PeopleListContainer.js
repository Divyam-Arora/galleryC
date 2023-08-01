import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/http-hook";
import { peopleActions } from "../../store/people-slice";
import { ApiGetPeople } from "../../util/apis";
import EmptyState from "../UI/EmptyState";
import UserModalSpinner from "../layout/UserModalSpinner";

const PeopleListContainer = function ({ showLoading = false, children }) {
  const { sendRequest, data, cleanUp, isLoading } = useHttp();
  const people = useSelector((state) => state.people);
  const dispatch = useDispatch();

  useEffect(() => {
    sendRequest(ApiGetPeople(people.search), "GET", {}, {}, false, false);
    return cleanUp;
  }, [sendRequest, cleanUp, people.search]);

  useEffect(() => {
    if (data) {
      dispatch(peopleActions.fill({ list: data }));
    }
  }, [data, dispatch]);

  return (
    <>
      {children}
      {showLoading && isLoading && (
        <span className="flex-row">
          <UserModalSpinner />
        </span>
      )}
      {people.list.length == 0 && !isLoading && <EmptyState title="No user" />}
    </>
  );
};

export default PeopleListContainer;
