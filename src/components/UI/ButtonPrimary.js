import { MdArrowForward, MdArrowForwardIos } from "react-icons/md";
import classes from "./ButtonPrimary.module.css";
import ButtonSpinner from "./Spinner/ButtonSpinner";

const ButtonPrimary = ({
  type,
  form,
  onClick,
  disabled,
  style,
  children,
  shape = "rectangle",
  size = "min",
  compact = false,
  borderRadius = 5,
}) => {
  let buttonClass = classes.btnP;

  switch (style) {
    case "primary":
      buttonClass = classes.btnP;
      break;
    case "secondary":
      buttonClass = classes.btnS;
      break;
    case "subtle":
      buttonClass = classes.btnSubtle;
      break;
    case "inline":
      buttonClass = classes.btnInline;
  }

  return (
    <button
      style={{ borderRadius: borderRadius + "px" }}
      className={`${buttonClass} ${classes[shape]} ${classes[size]} ${
        compact ? classes.compact : ""
      }`}
      type={type}
      onClick={onClick}
      disabled={!!disabled}
      form={form}
    >
      {children}
      {style == "inline" && (
        <div className={classes.icon}>
          <MdArrowForwardIos />
        </div>
      )}
    </button>
  );
};

export default ButtonPrimary;
