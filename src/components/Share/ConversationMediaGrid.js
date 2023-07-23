import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useHttp from "../../hooks/http-hook";
import { ApiGetConversationMedia } from "../../util/apis";
import BackButton from "../UI/BackButton";
import ScrollTriggerContainer from "../UI/ScrollTriggerContainer";
import containerClasses from "./ConversationContainer.module.css";
import ConversationMedia from "./ConversationMedia";
import TextSearch from "../UI/Search/TextSearch";
import { MdSearch } from "react-icons/md";

const ConversationMediaGrid = function () {
  const containerRef = useRef();
  const [media, setMedia] = useState([]);
  const [search, setSearch] = useState("");
  const [response, setResponse] = useState({ page: -1, hasNext: true });
  const { conversationId } = useParams();
  const { sendRequest, data, cleanUp } = useHttp();

  useEffect(() => {
    containerRef.current.classList.add(containerClasses.appear);
    setTimeout(() => {
      containerRef.current.classList.remove(containerClasses.appear);
    }, [200]);
  }, []);

  const requestAction = () => {
    sendRequest(
      ApiGetConversationMedia(conversationId, response.page + 1, search)
    );
  };

  useEffect(() => {
    if (data) {
      setMedia((media) => [...media, ...data.response]);
      setResponse({ page: data.page, hasNext: data.hasNext });
    }
  }, [data]);

  return (
    <div ref={containerRef} className={containerClasses.container}>
      <div className="content-header align-center">
        <div className="flex-row">
          <BackButton />
          <h2 className="heading-secondary">
            {search ? (
              <span className="flex-row">
                <MdSearch />
                {search}
              </span>
            ) : (
              "All Media"
            )}
          </h2>
        </div>
        <TextSearch
          placeholder="Find conversation media..."
          action={(value) => {
            setMedia([]);
            setResponse({ page: -1, hasNext: true });
            setSearch(value);
          }}
          value={search}
        />
      </div>
      <div className="subcontent">
        <ScrollTriggerContainer
          action={requestAction}
          page={response.page}
          hasNext={response.hasNext}
          search={search}
        >
          <div className="grid grid-col-3 margin-top">
            {media.map((m) => (
              <Link to={`/media/${m.id}`} key={m.id}>
                <ConversationMedia
                  media={m}
                  owner={m.owner}
                  date={m.sharedOn}
                />
              </Link>
            ))}
          </div>
        </ScrollTriggerContainer>
      </div>
    </div>
  );
};

export default ConversationMediaGrid;
