import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { albumsActions } from "../../store/albums-slice";
import MediaCard from "../UI/MediaCard";
import classes from "./AlbumDetail.module.css";

const AlbumDetail = ({ albumId }) => {
  const navigate = useNavigate();
  const { item, list, search } = useSelector((state) => state.album);
  const dispatch = useDispatch();

  const mediaList = list.map((media) => {
    return (
      <li key={media.id} onClick={navigate.bind(this, "/media/" + media.id)}>
        <MediaCard
          url={media.url}
          alt={media.alt}
          type={media.media_type}
          shape="rectangle"
        />
      </li>
    );
  });
  return (
    <section className={classes.album}>
      {item.description && item.description.length > 0 && (
        <p className={classes.description}>
          {search ? `Results for "${search}"` : item.description}
        </p>
      )}
      {!search && (
        <p className={classes.date}>{new Date(item.date).toDateString()}</p>
      )}
      <ul className="grid">{mediaList}</ul>
    </section>
  );
};

export default AlbumDetail;
