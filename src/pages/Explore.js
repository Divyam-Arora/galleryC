import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Explore from "../components/Explore/Explore";
import TextSearch from "../components/UI/Search/TextSearch";
import ButtonPrimary from "../components/UI/ButtonPrimary";
import {
  MdCollections,
  MdImage,
  MdPlayArrow,
  MdSearch,
  MdVideocam,
} from "react-icons/md";
import { IconContext } from "react-icons";
import { getType } from "../util/helpers";

const ExplorePage = React.memo(() => {
  const location = useLocation();
  const params = useSearchParams();
  const hash = Number.parseInt(location.hash.at(1)) || 0;
  const navigate = useNavigate();
  const { error } = useSelector((s) => s.httpState);

  return (
    <>
      <div className="content-header flex-wrap content-header-height-auto">
        <h2 className="heading-secondary flex-row ellipsis">
          {params[0].get("s") ? (
            <>
              <span className="flex-row">
                <MdSearch />
              </span>
              <p className="ellipsis">{params[0].get("s")}</p>
            </>
          ) : (
            <p className="ellipsis">Explore</p>
          )}
        </h2>
        <div className="flex-row margin-left-auto">
          <ButtonPrimary
            style={"secondary"}
            borderRadius={100}
            onClick={() =>
              navigate({
                pathname: "",
                hash: ((hash + 1) % 3).toString(),
                search: createSearchParams(params[0]).toString(),
              })
            }
          >
            <IconContext.Provider value={{ color: "var(--primaryColor)" }}>
              {getType(hash).toLowerCase() == "image" && <MdImage />}
              {getType(hash).toLowerCase() == "video" && <MdVideocam />}
              {getType(hash).toLowerCase() == "all" && <MdCollections />}
            </IconContext.Provider>
            <span className="subheading">
              <strong>{getType(hash) || "type"}</strong>
            </span>
          </ButtonPrimary>
        </div>
        <TextSearch
          active={true}
          value={params[0].get("s") || ""}
          placeholder="exlpore your gallery..."
          responsive={false}
          action={(value) => {
            navigate({
              pathname: "",
              hash: location.hash,
              search: createSearchParams({
                // ...params[0],
                target: params[0].get("target") || "title",
                s: value,
              }).toString(),
            });
          }}
        />
      </div>
      {/* <div className="subcontent"> */}
      <Explore />
      {/* </div> */}
    </>
  );
});

export default ExplorePage;
