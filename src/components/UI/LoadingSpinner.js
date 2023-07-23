import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <span className={classes.back}>
      <span className={classes.loader}></span>
    </span>
  );
};

export default LoadingSpinner;
