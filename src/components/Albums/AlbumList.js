import Album from "./Album";

import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AlbumList.module.css";

const AlbumList = ({ list: albums = [], action, selectedList = [] }) => {
  const navigate = useNavigate();

  const clickHander = (album) => {
    if (action) action(album);
    else navigate(`/albums/${album.id}`);
  };

  return (
    <div>
      <ul className={`${classes.albumList} grid`}>
        {albums.map((albumData) => {
          return (
            <li
              key={albumData.id}
              className={`${classes.album}`}
              onClick={clickHander.bind(this, albumData)}
            >
              <Album
                id={albumData.id}
                thumbnails={albumData.thumbnails}
                count={albumData.mediaCount}
                title={albumData.name}
                type={"image"}
                selected={selectedList.some((id) => id == albumData.id)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AlbumList;
