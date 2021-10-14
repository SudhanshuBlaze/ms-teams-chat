import MyMessage from "./MyMessage";
import MessageForm from "./MessageForm";
import TheirMessage from "./TheirMessage";

function ChatFeed(props) {
  const { chats, activeChat, userName, messages } = props;
  //if chats exist then find activeChat
  const chat = chats && chats[activeChat];

  function renderReadReceipts(message, isMyMessage) {
    // console.log(chat.people);
    // console.log(message.id);
    return chat.people.map(
      (person, index) =>
        person.last_read === message.id && (
          <div
            key={`read_${index}`}
            className="read-receipt"
            style={{
              float: isMyMessage ? "right" : "left",
              backgroundImage: `url(${person?.person?.avatar})`,
            }}
          />
        )
    );
  }

  function renderMessages() {
    const msgKeys = Object.keys(messages);

    return msgKeys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : msgKeys[index - 1];
      //iterate over all the messages and checking if the userName is ours
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {isMyMessage ? (
              <MyMessage message={message} />
            ) : (
              <TheirMessage
                message={message}
                lastMessage={message[lastMessageKey]}
              />
            )}
          </div>

          <div
            className="read-receipts"
            style={{
              marginRight: isMyMessage ? "18px" : "0px",
              marginLeft: isMyMessage ? "0px" : "68px",
            }}
          >
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  }
  if (!chat) return "Loading...";

  <div className="chat-feed">
    <div className="chat-title-container">
      <div className="chat-title">{chat?.title}</div>
      <div className="chat-subtitle">
        {chat.people.map((person) => ` ${person.person.username}`)}
      </div>
    </div>
    {renderMessages()}
    <div style={{ height: "100px" }} />
    <div className="message-form-container">
      <MessageForm {...props} chatId={activeChat} />
    </div>
  </div>;

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>
      </div>
      {/*maps over all the messages and renders here */}
      {renderMessages()}
      <div style={{ height: "100px" }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
}

export default ChatFeed;
