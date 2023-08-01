import ConversationHead from "./ConversationHead";
import classes from "./ConversationList.module.css";

const ConversationList = function ({
  conversations = [],
  isNav = false,
  type = "list-item",
  selected = [],
  action,
  conversationId,
}) {
  const clickHandler = (conversation, isSelected) => {
    action(conversation, isSelected);
  };

  return (
    <div className={classes.container}>
      <ul className={classes.list}>
        {conversations.map((item) => (
          <li
            key={item.id}
            className={conversationId == item.id && isNav ? classes.active : ""}
            data-selected={selected.find((convoId) => convoId == item.id)}
            onClick={(e) => {
              clickHandler(item, e.currentTarget.dataset.selected);
            }}
          >
            <ConversationHead
              key={item.id}
              name={item.name}
              lastMedia={item.lastMediaShared}
              lastActivity={item.lastActivity}
              members={item.members}
              url={item?.iconThumbnail}
              memberCount={item.memberCount}
              isGroup={item.group}
              type={type}
              selected={selected.some((convoId) => convoId == item.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
