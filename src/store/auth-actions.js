import { albumActions } from "./album-slice";
import { albumsActions } from "./albums-slice";
import { authActions } from "./auth-slice";
import { conversationActions } from "./conversation-slice";
import { homeActions } from "./home-slice";
import { mediaActions } from "./media-slice";
import { peopleActions } from "./people-slice";
import { personActions } from "./person-slice";
import { shareActions } from "./share-slice";
import { uploadActions } from "./upload-slice";
import { userDetailActions } from "./user-slice";

export const logout = () => {
  return async (dispatch) => {
    dispatch(homeActions.reset());
    dispatch(mediaActions.reset());
    dispatch(uploadActions.clear());
    dispatch(albumsActions.reset());
    dispatch(albumActions.reset());
    dispatch(peopleActions.reset());
    dispatch(personActions.reset());
    dispatch(shareActions.reset());
    dispatch(conversationActions.reset());
    dispatch(userDetailActions.clear());
    dispatch(authActions.logout());
  };
};
