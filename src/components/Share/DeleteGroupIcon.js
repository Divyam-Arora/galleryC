import { useState } from "react";
import { MdDelete } from "react-icons/md";
import DeleteGroupIconForm from "./DeleteGroupIconForm";

const DeleteGroupIcon = function ({ action }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const closeAction = (data) => {
    data && action(data);
    setIsRemoving(false);
  };
  return (
    <div>
      <div
        className="icon"
        onClick={() => {
          setIsRemoving(true);
        }}
      >
        <MdDelete />
      </div>
      {isRemoving && <DeleteGroupIconForm action={closeAction} />}
    </div>
  );
};

export default DeleteGroupIcon;
