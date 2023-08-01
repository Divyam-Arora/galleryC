import PeopleItem from "./PeopleItem";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./PeopleList.module.css";

const PeopleList = (props) => {
  const people = useSelector((state) => state.people);
  const peopleComp = people.list.map((val) => {
    return (
      <li key={val.username} className={classes.item}>
        <Link to={val.username}>
          <PeopleItem {...val} />
        </Link>
      </li>
    );
  });
  return (
    <div className={classes.container}>
      <ul className={classes["people-grid"]}>{peopleComp}</ul>
    </div>
  );
};

export default PeopleList;
