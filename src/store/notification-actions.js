import { notificationActions } from "./notification-slice";

export const showNotifications = (notObj) => {
  return async (dispatch) => {
    dispatch(notificationActions.add(notObj));
    setTimeout(() => {
      dispatch(notificationActions.remove());
    }, 5000);
  };
};
