import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import PersonDetail from "../components/People/PersonDetail";
import PersonMediaForm from "../components/People/PersonMediaForm";
import Menu from "../components/UI/Menu";
import ScrollTriggerContainer from "../components/UI/ScrollTriggerContainer";
import TextSearch from "../components/UI/Search/TextSearch";
import useHttp from "../hooks/http-hook";
import { personActions } from "../store/person-slice";
import { ApiGetPerson, ApiGetPersonSharedMedia } from "../util/apis";
import UserDetail from "../components/People/UserDetail";
import { IconContext } from "react-icons";
import ButtonPrimary from "../components/UI/ButtonPrimary";
import { logout } from "../store/auth-actions";
import { MdLogout } from "react-icons/md";

const Person = function () {
  const { username } = useParams();
  const {
    item: person,
    page,
    extra,
    hasNext,
    search,
    refresh,
  } = useSelector((state) => state.person);
  const { userName } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isSharing, setIsSharing] = useState(false);
  const personRequest = useHttp();
  const sharedMediaRequest = useHttp();
  const menuItems = useMemo(
    () => ({
      "Share Media": () => {
        setIsSharing(true);
      },
    }),
    []
  );

  useEffect(() => {
    if (person?.username != username)
      personRequest.sendRequest(ApiGetPerson(username));
  }, [username]);

  useEffect(() => {
    if (personRequest.data) {
      dispatch(personActions.newItem({ item: personRequest.data }));
    }
  }, [personRequest.data]);

  const mediaAction = () => {
    sharedMediaRequest.sendRequest(
      ApiGetPersonSharedMedia(username, page + 1, extra, search)
    );
  };

  const shareAction = () => {
    setIsSharing(false);
  };

  const searchAction = (input) => {
    dispatch(personActions.search({ search: input }));
  };

  useEffect(() => {
    if (sharedMediaRequest.data) {
      dispatch(
        personActions.append({
          list: sharedMediaRequest.data.response,
          page: sharedMediaRequest.data.page,
          hasNext: sharedMediaRequest.data.hasNext,
          totalPages: sharedMediaRequest.data.totalPages,
          totalElements: sharedMediaRequest.data.totalElements,
        })
      );
    }
  }, [sharedMediaRequest.data]);

  return (
    <>
      <div className="content-header">
        <h2 className="heading-secondary">{username}</h2>
        {userName != username ? (
          <span className="flex-row">
            <TextSearch
              action={searchAction}
              value={search}
              placeholder="Find shared media..."
            />
            <Menu menuItems={menuItems} />
          </span>
        ) : (
          <IconContext.Provider value={{ size: "2rem" }}>
            <ButtonPrimary
              borderRadius={"8"}
              // style={"secondary"}
              onClick={() => {
                dispatch(logout());
              }}
            >
              <MdLogout />
              <p>Sign out</p>
            </ButtonPrimary>
          </IconContext.Provider>
        )}
      </div>
      <div
        className="subcontent"
        id={location.pathname.split("/").join("") + "_subcontent"}
      >
        {person?.username == username &&
          (username == userName ? (
            <UserDetail />
          ) : (
            <ScrollTriggerContainer
              page={page}
              hasNext={hasNext}
              extra={extra}
              search={search}
              action={mediaAction}
              refresh={refresh}
            >
              <PersonDetail />
            </ScrollTriggerContainer>
          ))}
      </div>
      {isSharing && <PersonMediaForm addAction={shareAction} />}
    </>
  );
};

export default Person;
