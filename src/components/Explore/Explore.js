import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Catagories from "./Catagories";
import classes from "./Explore.module.css";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/http-hook";
import ScrollTriggerContainer from "../UI/ScrollTriggerContainer";
import { ApiExploreMedia } from "../../util/apis";
import { getType } from "../../util/helpers";
import MediaCard from "../UI/MediaCard";
import EmptyState from "../UI/EmptyState";

const targets = [
  { value: "Title", api: "" },
  { value: "Tag", api: "" },
];

const initialPageState = {
  ...targets.reduce((state, target) => {
    state[target.value.toLowerCase()] = {
      list: [],
      page: -1,
      hasNext: true,
    };
    return state;
  }, {}),
};

const Explore = () => {
  const location = useLocation();
  const params = useSearchParams();
  const currentTarget = params[0].get("target") || "name";
  const navigate = useNavigate();
  const { sendRequest, data, cleanUp, isLoading } = useHttp();
  const [pages, setPages] = useState({ ...initialPageState });

  useEffect(() => {
    setPages({ ...initialPageState });
  }, [location.hash, params[0].get("s")]);

  const requestAction = () => {
    sendRequest(
      ApiExploreMedia(
        params[0].get("s"),
        getType(Number.parseInt(location.hash.at(1)) || 0) == "all"
          ? ""
          : getType(Number.parseInt(location.hash.at(1)) || 0),
        params[0].get("target") || "name"
      )
    );
  };

  useEffect(() => {
    // console.log(pages, params[0].get("target"));
    if (data && data.response.length > 0) {
      setPages((s) => {
        console.log(
          `target: ${params[0].get("target")}, state: ${
            s[params[0].get("target").list]
          }`
        );
        return {
          ...s,
          [data.extra]: {
            page: data.page,
            list: data.response,
            hasNext: data.hasNext,
          },
        };
      });
    }
  }, [data]);
  // console.log(pages);
  return (
    <section className={classes.container}>
      {params[0].get("s") && (
        <>
          <div className={`${classes.targets}`}>
            {targets.map((target) => (
              <div
                key={target.value}
                className={`heading-subtle ${
                  target.value.toLowerCase() == params[0].get("target")
                    ? classes["active-target"]
                    : ""
                }`}
                onClick={() => {
                  // console.log(params[0]);
                  navigate({
                    pathname: "",
                    hash: location.hash,
                    search: createSearchParams({
                      // ...{ ...params[0] },
                      s: params[0].get("s"),
                      target: target.value.toLowerCase(),
                    }).toString(),
                  });
                }}
              >
                {target.value}
              </div>
            ))}
            <span
              className={classes.active}
              style={{
                transform: `translateX(${
                  Math.max(
                    targets.findIndex(
                      (target) =>
                        target.value.toLowerCase() == params[0].get("target")
                    ),
                    0
                  ) * 100
                }%)`,
              }}
            ></span>
          </div>
          {pages[params[0].get("target")].list.length == 0 && (
            <EmptyState title="No results" />
          )}
          <ul className="grid subcontent">
            <ScrollTriggerContainer
              action={requestAction}
              extra={params[0].get("target")}
              page={pages[params[0].get("target")].page}
              hasNext={pages[params[0].get("target")].hasNext}
              search={params[0].get("s") + location.hash}
            >
              {pages[params[0].get("target")].list.map((media) => (
                <li key={media.id}>
                  <Link to={`/media/${media.id}`}>
                    <MediaCard
                      url={media.url}
                      type={media.media_type}
                      alt={media.alt}
                      thumbnail={media.url}
                    />
                  </Link>
                </li>
              ))}
            </ScrollTriggerContainer>
          </ul>
        </>
      )}
    </section>
  );
};

export default Explore;
