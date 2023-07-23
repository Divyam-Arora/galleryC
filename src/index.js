import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import "./queries.css";
import store from "./store";
import * as Pages from "./pages";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import ParentPage from "./pages/ParentPage";
import { AuthPage } from "./pages";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <ParentPage />,
        children: [
          {
            path: "",
            index: true,
            element: <Pages.HomePage />,
          },
          {
            path: "albums",
            element: <Pages.AlbumsPage />,
          },
          {
            path: "albums/:albumId",
            element: <Pages.AlbumPage />,
          },
          {
            path: "people",
            element: <Pages.PeoplePage />,
          },
          {
            path: "people/:username",
            element: <Pages.PersonPage />,
          },
          {
            path: "explore",
            element: <Pages.ExplorePage />,
          },
          {
            path: "media/:mediaId",
            element: <Pages.MediaDetailPage />,
          },
          {
            path: "conversations",
            element: <Pages.SharePage />,
            children: [
              {
                path: ":conversationId",
                element: <Pages.ConversationPage />,
              },
              {
                path: ":conversationId/info",
                element: <Pages.ConversationInfoPage />,
              },
              {
                path: ":conversationId/media",
                element: <Pages.ConversationMediaPage />,
              },
              {
                path: ":conversationId/members",
                element: <Pages.ConversationMembersPage />,
              },
            ],
          },
        ],
      },
      {
        path: "auth",
        element: <Pages.AuthPage />,
        children: [
          {
            // path: "login",
            index: true,
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
        ],
      },
      {
        path: "*",
        element: <Pages.NotFound />,
      },
    ],
  },
]);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
