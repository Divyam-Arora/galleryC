import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import MediaCard from "../../UI/MediaCard";
import MediaList from "../Media/MediaList";
import MediaListContainer from "../Media/MediaListContainer";

const DUMMY_DATA = [
  {
    id: 236,
    date: "2023-07-15T06:32:33.916457Z",
    url: "http://localhost:8080/api/public/media/236/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/236/file/original",
    media_type: "image",
    alt: "Wallpaper15.bmp",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 235,
    date: "2023-07-15T06:30:26.804370Z",
    url: "http://localhost:8080/api/public/media/235/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/235/file/original",
    media_type: "image",
    alt: "Wallpaper30.bmp",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 234,
    date: "2023-07-15T06:30:26.203973Z",
    url: "http://localhost:8080/api/public/media/234/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/234/file/original",
    media_type: "image",
    alt: "Wallpaper29.bmp",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 226,
    date: "2023-07-09T05:45:19.258734Z",
    url: "http://localhost:8080/api/public/media/226/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/226/file/original",
    media_type: "image",
    alt: "Wallpaper25.bmp",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 223,
    date: "2023-07-09T05:36:08.444188Z",
    url: "http://localhost:8080/api/public/media/223/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/223/file/original",
    media_type: "image",
    alt: "photo-of-gray-surface-3377405.jpg",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 222,
    date: "2023-07-09T05:32:16.703730Z",
    url: "http://localhost:8080/api/public/media/222/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/222/file/original",
    media_type: "image",
    alt: "Wallpaper28.bmp",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 221,
    date: "2023-07-09T05:04:02.577941Z",
    url: "http://localhost:8080/api/public/media/221/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/221/file/original",
    media_type: "image",
    alt: "Wallpaper13.bmp",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 155,
    date: "2023-07-08T15:22:56.145836Z",
    url: "http://localhost:8080/api/public/media/155/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/155/file/original",
    media_type: "image",
    alt: "Wallpaper2.bmp",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 154,
    date: "2023-07-08T15:22:53.181797Z",
    url: "http://localhost:8080/api/public/media/154/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/154/file/original",
    media_type: "image",
    alt: "Wallpaper1.bmp",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 153,
    date: "2023-07-08T15:22:39.379608Z",
    url: "http://localhost:8080/api/public/media/153/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/153/file/original",
    media_type: "image",
    alt: "Wallpaper19.bmp",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 49,
    date: "2023-07-08T03:05:01.941721Z",
    url: "http://localhost:8080/api/public/media/49/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/49/file/original",
    media_type: "image",
    alt: "Wallpaper22.bmp",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 29,
    date: "2023-06-25T00:51:43.109339Z",
    url: "http://localhost:8080/api/public/media/29/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/29/file/original",
    media_type: "video",
    alt: "vlc-record-2022-06-06-00h06m06s-MoviesVerse.asia-.mp4",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 27,
    date: "2023-06-25T00:51:19.720262Z",
    url: "http://localhost:8080/api/public/media/27/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/27/file/original",
    media_type: "video",
    alt: "vlc-record-2023-04-20-15h36m20s-MoviesMod.com-.mp4",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 26,
    date: "2023-06-25T00:50:50.195171Z",
    url: "http://localhost:8080/api/public/media/26/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/26/file/original",
    media_type: "video",
    alt: "Mr. Robot - Hacking the FBI -  I live for this sh t.mp4",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 24,
    date: "2023-06-24T10:34:29.023733Z",
    url: "http://localhost:8080/api/public/media/24/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/24/file/original",
    media_type: "video",
    alt: "MNEK - Colour (Official Video) ft. Hailee Steinfeld.mkv",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 18,
    date: "2023-06-24T03:19:05.216406Z",
    url: "http://localhost:8080/api/public/media/18/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/18/file/original",
    media_type: "image",
    alt: "Wallpaper24.bmp",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 15,
    date: "2023-06-20T12:54:50.683695Z",
    url: "http://localhost:8080/api/public/media/15/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/15/file/original",
    media_type: "image",
    alt: "Wallpaper44.bmp",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 14,
    date: "2023-06-20T12:54:28.479369Z",
    url: "http://localhost:8080/api/public/media/14/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/14/file/original",
    media_type: "image",
    alt: "two-person-riding-boat-on-body-of-water-910213.jpg",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 13,
    date: "2023-06-20T12:54:04.352992Z",
    url: "http://localhost:8080/api/public/media/13/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/13/file/original",
    media_type: "image",
    alt: "Screenshot 2021-10-17 210042.png",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 11,
    date: "2023-06-20T08:44:23.882446Z",
    url: "http://localhost:8080/api/public/media/11/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/11/file/original",
    media_type: "image",
    alt: "Wallpaper10.bmp",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 9,
    date: "2023-06-20T08:38:05.307300Z",
    url: "http://localhost:8080/api/public/media/9/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/9/file/original",
    media_type: "image",
    alt: "background.png",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
  {
    id: 7,
    date: "2023-06-20T06:11:10.747772Z",
    url: "http://localhost:8080/api/public/media/7/file/thumbnail",
    hd_url: "http://localhost:8080/api/public/media/7/file/original",
    media_type: "image",
    alt: "black-and-white-flower-dandelion-minimal-21323.jpg",
    owner: {
      id: "divyam",
      firstName: "Divyam",
      lastName: "Arora",
      username: "divyam",
      email: "divyamk.a.83@gmail.com",
      iconURL: "http://localhost:8080/api/public/user/divyam/icon?id=249",
      iconThumbnail:
        "http://localhost:8080/api/public/user/divyam/thumbnail?id=249",
    },
  },
];

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
