import classes from "./MenuList.module.css";

const MenuList = function ({ action, menuItems }) {
  // console.log(menuItems);
  const listClickHandler = (e) => {
    const el = e.target;
    if (el.closest("li")) {
      action();
      menuItems[el.dataset.label]();
    }
  };
  return (
    <div className={classes.container}>
      <ul className={classes.list} onClick={listClickHandler}>
        {Object.keys(menuItems).map((label) => {
          return (
            <li key={Math.random()} data-label={label}>
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MenuList;
