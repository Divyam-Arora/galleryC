import React, { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet, ScrollRestoration } from "react-router-dom";

import "./App.css";

import { useState } from "react";
import Disclaimer from "./components/Disclaimer";
import NotificationList from "./components/UI/NotificationList";
import useScroll from "./hooks/scroll-hook";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route
//         path="/"
//         element={<ParentPage />}
//         children={[
//           <Route index={true} element={<Pages.HomePage />} />,
//           <Route path="albums" element={<Pages.AlbumsPage />} />,
//           <Route path="albums/:albumId" element={<Pages.AlbumPage />} />,
//           <Route path="people" element={<Pages.PeoplePage />} />,
//           <Route path="people/:username" element={<Pages.PersonPage />} />,
//           <Route path="explore" element={<Pages.ExplorePage />} />,
//           <Route path="media/:mediaId" element={<Pages.MediaDetailPage />} />,
//           <Route path="conversations" element={<Pages.SharePage />}>
//             <Route
//               path=":conversationId"
//               element={<Pages.ConversationPage />}
//             />
//             <Route
//               path=":conversationId/info"
//               element={<Pages.ConversationInfoPage />}
//             />
//             <Route
//               path=":conversationId/media"
//               element={<Pages.ConversationMediaPage />}
//             />
//             <Route
//               path=":conversationId/members"
//               element={<Pages.ConversationMembersPage />}
//             />
//           </Route>,
//         ]}
//       />
//       <Route
//         path="auth"
//         element={<Pages.AuthPage />}
//         children={[
//           <Route key="login" index={true} element={<Login />} />,
//           <Route key="signup" path="signup" element={<Signup />} />,
//         ]}
//       />

//       <Route path="*" element={<Pages.NotFound />} />
//     </>
//   )
// );

function App() {
  const { notifications } = useSelector((state) => state.notification);
  const scrollState = useScroll();
  const [disclaimer, setDisclaimer] = useState(
    localStorage.getItem("disclaimer")
  );
  const appRef = useRef();

  // console.log(isLoading);

  const notificationComp = useMemo(
    () => <NotificationList notifications={notifications} />,
    [notifications]
  );

  const handleScroll = (e) => {
    e.currentTarget.scroll({
      top: "100px",
    });
  };

  return (
    <div
      ref={appRef}
      className="app"
      onScrollCapture={(e) => {
        // console.log(document.getElementById("header"));
      }}
    >
      {!disclaimer && (
        <Disclaimer
          action={() => {
            setDisclaimer(localStorage.getItem("disclaimer"));
          }}
        />
      )}
      {notifications.length > 0 && notificationComp}
      <Outlet />
      <ScrollRestoration getKey={(location, matches) => location.pathname} />
      {/* <Routes>
        <Route
          path="/"
          element={<ParentPage />}
          children={[
            <Route index={true} element={<Pages.HomePage />} />,
            <Route path="albums" element={<Pages.AlbumsPage />} />,
            <Route path="albums/:albumId" element={<Pages.AlbumPage />} />,
            <Route path="people" element={<Pages.PeoplePage />} />,
            <Route path="people/:username" element={<Pages.PersonPage />} />,
            <Route path="explore" element={<Pages.ExplorePage />} />,
            <Route path="media/:mediaId" element={<Pages.MediaDetailPage />} />,
            <Route path="conversations" element={<Pages.SharePage />}>
              <Route
                path=":conversationId"
                element={<Pages.ConversationPage />}
              />
              <Route
                path=":conversationId/info"
                element={<Pages.ConversationInfoPage />}
              />
              <Route
                path=":conversationId/media"
                element={<Pages.ConversationMediaPage />}
              />
              <Route
                path=":conversationId/members"
                element={<Pages.ConversationMembersPage />}
              />
            </Route>,
          ]}
        />
        <Route
          path="auth"
          element={<Pages.AuthPage />}
          children={[
            <Route key="login" index={true} element={<Login />} />,
            <Route key="signup" path="signup" element={<Signup />} />,
          ]}
        />

        <Route path="*" element={<Pages.NotFound />} />
      </Routes> */}
    </div>
  );
}

export default App;
