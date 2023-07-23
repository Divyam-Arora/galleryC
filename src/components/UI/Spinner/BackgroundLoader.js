import classes from "./BackgroundLoader.module.css";

const BackgroundLoader = function ({ height, width, size, color, animate }) {
  return (
    <div
      style={{
        height: height || "auto",
        width: width || "auto",
        backgroundColor: color || "var(--primaryBackgroundColor)",
      }}
      className={`${classes.loader} ${size ? classes[size] : ""} ${
        animate ? classes.animate : ""
      }`}
    ></div>
  );
};

export default BackgroundLoader;
