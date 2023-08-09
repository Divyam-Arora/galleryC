export const actions = {
  Shared: "Shared",
  UnShared: "UnShared",
  UnShared_Activity: "UnShared_Activity",
  Created: "Created",
  Added: "Added",
  Removed: "Removed",
  Changed_Icon: "Changed_Icon",
  Removed_Icon: "Removed_Icon",
  Changed_Name: "Changed_Name",
  Removed_Name: "Removed_Name",
  Left: "Left",
};

export const getUserSubject = (
  loggedUser,
  username,
  isGroup = false,
  action
) => {
  let subject = username;
  if (username == loggedUser) subject = "You";
  else if (!isGroup && action != actions.Left) subject = "";

  return subject;
};

export const getActivityText = (action, by, targetId, targetString) => {
  let activity = "";
  switch (action) {
    case actions.Changed_Name:
      activity = `${by} changed the group name`;
      break;
    case actions.Removed_Name:
      activity = `${by} removed the group name`;
      break;
    case actions.Changed_Icon:
      activity = `${by} changed the group icon`;
      break;
    case actions.Removed_Icon:
      activity = `${by} removed the group icon`;
      break;
    case actions.Shared:
      activity = `${by} shared a media`;
      break;
    case actions.UnShared:
      activity = `${by} unshared a media`;
      break;
    case actions.UnShared_Activity:
      activity = `${by} unshared a media`;
      break;
    case actions.Created:
      activity = `${by} started the conversation`;
      break;
    case actions.Added:
      activity = `${by} added ${targetString}`;
      break;
    case actions.Removed:
      activity = `${by} removed ${targetString}`;
      break;
    case actions.Left:
      activity = `${by} left`;
      break;
  }

  return activity;
};

export const getActivity = (action, by, target) => {
  let activity = {
    tag: "info",
    text: getActivityText(action, by, 0, target),
  };

  switch (action) {
    case actions.UnShared:
      activity.tag = "unshared";
      activity.text = "This media was unshared";
      break;

    case actions.Shared:
      activity.tag = "shared";
  }

  return activity;
};

export const getSize = (bytes) => {
  let size = bytes;
  if (size / 1024 >= 1) {
    size = size / 1024;
    if (size / 1024 >= 1) return (size / 1024).toFixed(2) + " MB";
    else return size.toFixed(2) + " KB";
  } else return size.toFixed(2) + " B";
};

export const getType = (num) => {
  // console.log("hash: " + hash);
  switch (num) {
    case 0:
      return "all";
      break;
    case 1:
      return "image";
      break;
    case 2:
      return "video";
      break;
    default:
      return "all";
  }
};

export const maxImageSize = 10 * 1024 * 1024;
export const maxVideoSize = 50 * 1024 * 1024;
