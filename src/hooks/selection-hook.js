import { useState } from "react";

const useSelection = function (existingList = []) {
  const [selected, setSelected] = useState(new Map());
  const [deselected, setDeselected] = useState(new Map());
  const allSelected = [...existingList, ...selected.keys()].filter((id) => {
    return !deselected.has(id);
  });

  const selectHandler = (item, isSelected) => {
    // console.log(item, isSelected);
    if (selected.has(item.id)) {
      setSelected((state) => {
        state.delete(item.id);
        return new Map(state.entries());
      });
    } else if (deselected.has(item.id)) {
      setDeselected((state) => {
        state.delete(item.id);
        return new Map(state.entries());
      });
    } else if (existingList.find((id) => id == item.id)) {
      setDeselected((state) => {
        state.set(item.id, item);
        return new Map(state.entries());
      });
    } else
      setSelected((state) => {
        state.set(item.id, item);
        return new Map(state.entries());
      });

    // if (isSelected) {
    //   if (existingList.find((id) => id == item.id)) {
    //     setDeselected((state) => {
    //       state.set(item.id, item);
    //       return new Map(state.entries());
    //     });
    //   } else {
    //     setSelected((state) => {
    //       state.delete(item.id);
    //       return new Map(state.entries());
    //     });
    //   }
    // } else {
    //   if (existingList.find((id) => id == item.id)) {
    //     setDeselected((state) => {
    //       state.delete(item.id);
    //       return new Map(state.entries());
    //     });
    //   } else {
    //     setSelected((state) => {
    //       state.set(item.id, item);
    //       return new Map(state.entries());
    //     });
    //   }
    // }
  };

  return {
    allSelected,
    selected,
    deselected,
    selectHandler,
    setSelected,
    setDeselected,
  };
};
export default useSelection;
