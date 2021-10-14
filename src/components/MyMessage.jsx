function MyMessage({ message }) {
  if (message?.attachments?.length > 0) {
    return (
      <img
        src={message.attachments[0].file}
        alt="message-attachment"
        className="message-image"
        style={{ float: "right" }}
      />
    );
  }
  return (
    <div
      className="message"
      style={{
        float: "right",
        marginRight: "18px",
        color: "white",
        backgroundColor: "#3B2A50",
      }}
    >
      {/* 
         Setting HTML from code is risky because it’s easy to inadvertently expose 
         your users to a cross-site scripting (XSS) attack.
      <div dangerouslySetInnerHTML={{ __html: message.text }} /> 
      So, using a 3rd party lib*/}
      {message.text}
    </div>
  );
}

export default MyMessage;
