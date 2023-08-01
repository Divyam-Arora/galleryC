import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import MediaCard from "../../UI/MediaCard";
import MediaList from "../Media/MediaList";
import MediaListContainer from "../Media/MediaListContainer";

const Home = (props) => {
  const {
    list: media,
    search,
    searchPage,
  } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const onClickMedia = (media) => {
    navigate("media/" + media.id);
  };

  return (
    <>
      <MediaListContainer>
        <MediaList
          media={search.year ? searchPage.list : media}
          // media={DUMMY_DATA}
          action={onClickMedia}
        />
      </MediaListContainer>
    </>
  );
};

export default Home;
