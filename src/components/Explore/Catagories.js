import ButtonPrimary from "../UI/ButtonPrimary";

import classes from "./Catagories.module.css";

const Catagories = () => {
  return (
    <div className={classes.catagories}>
      <h4 className="heading-tertiary">Catagories</h4>
      <ul className={classes.list}>
        <li>
          <ButtonPrimary>
            <span className={classes.name}>Videos</span>
          </ButtonPrimary>
        </li>
        <li>
          <ButtonPrimary>
            <span className={classes.name}>Photos</span>
          </ButtonPrimary>
        </li>
        <li>
          <ButtonPrimary>
            <span className={classes.name}>Recently Added</span>
          </ButtonPrimary>
        </li>
        <li>
          <ButtonPrimary>
            <span className={classes.name}>Screenshots</span>
          </ButtonPrimary>
        </li>
        <li>
          <ButtonPrimary>
            <span className={classes.name}>Screenshots</span>
          </ButtonPrimary>
        </li>
        <li>
          <ButtonPrimary>
            <span className={classes.name}>Screenshots</span>
          </ButtonPrimary>
        </li>
      </ul>
    </div>
  );
};

export default Catagories;
