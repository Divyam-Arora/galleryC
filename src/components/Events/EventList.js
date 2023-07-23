import Event from "./Event";

import classes from "./EventList.module.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

const EventList = React.memo((props) => {
  const navigate = useNavigate();
  const { events } = useSelector((state) => state.events);

  const eventClickHandler = (eventId) => {
    const link = `/events/${eventId}`;
    navigate(link);
  };
  return (
    <>
      <div>
        <ul className={classes.eventList}>
          {events.map((eventData) => {
            return (
              <li
                onClick={eventClickHandler.bind(this, eventData.date)}
                key={eventData.date}
                className={classes.event}
              >
                <Event
                  id={eventData.date}
                  img={eventData.url}
                  count={Math.round(Math.random() * 30) + 1}
                  title={eventData.title}
                  type={eventData.media_type}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
});

export default EventList;
