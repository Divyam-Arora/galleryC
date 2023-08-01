import { IconContext } from "react-icons";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BackButton = function () {
  const navigate = useNavigate();
  return (
    <IconContext.Provider value={{ size: "20px" }}>
      <span
        className="icon"
        onClick={() => {
          navigate(-1);
        }}
      >
        <MdArrowBack />
      </span>
    </IconContext.Provider>
  );
};

export default BackButton;
