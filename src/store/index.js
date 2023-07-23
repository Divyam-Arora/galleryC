import { configureStore } from "@reduxjs/toolkit";
import albumSlice from "./album-slice";
import albumsSlice from "./albums-slice";
import authSlice from "./auth-slice";
import conversationSlice from "./conversation-slice";
import homeSlice from "./home-slice";
import httpStateSlice from "./httpState-slice";
import notificationSlice from "./notification-slice";
import peopleSlice from "./people-slice";
import personSlice from "./person-slice";
import shareSlice from "./share-slice";
import userSlice from "./user-slice";
import mediaSlice from "./media-slice";
import uploadSlice from "./upload-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    httpState: httpStateSlice.reducer,
    notification: notificationSlice.reducer,
    upload: uploadSlice.reducer,
    people: peopleSlice.reducer,
    person: personSlice.reducer,
    albums: albumsSlice.reducer,
    album: albumSlice.reducer,
    home: homeSlice.reducer,
    media: mediaSlice.reducer,
    user: userSlice.reducer,
    share: shareSlice.reducer,
    conversation: conversationSlice.reducer,
  },
});

export default store;
