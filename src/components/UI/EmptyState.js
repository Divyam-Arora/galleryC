import classes from "./EmptyState.module.css";

const EmptyState = function ({ title = "Empty", description = "" }) {
  return (
    <div className="flex-row width-100">
      <div className={classes.container}>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

export default EmptyState;
