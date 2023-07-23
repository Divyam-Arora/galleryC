import { IoMdArrowRoundUp } from "react-icons/io";
import classes from "./UploadSpinner.module.css";

const UploadSpinner = function () {
  return (
    <div className={classes.loader}>
      <div>
        <IoMdArrowRoundUp />
      </div>
    </div>
  );
};

export default UploadSpinner;
