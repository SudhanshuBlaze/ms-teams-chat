import { useState } from "react";
import { sendMessage, isTyping } from "react-chat-engine";
import { SendOutlined, PictureOutlined } from "@ant-design/icons";

function MessageForm(props) {
  const [value, setValue] = useState("");
  const { chatId, creds } = props;
  function handleSubmit(event) {
    event.preventDefault();
    const text = value.trim();
    if (text.length > 0) sendMessage(creds, chatId, { text });
    setValue(""); //after sending the message, clear the text area
  }
  function handleChange(event) {
    setValue(event.target.value);
    isTyping(props, chatId);
  }
  function handleUpload(event) {
    sendMessage(creds, chatId, { files: event.target.files, text: "" });
  }

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="Send a Message.."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <label htmlFor="upload-button">
        <span className="image-button ">
          <PictureOutlined className="picture-icon" />
        </span>
      </label>
      {/* the above label is for the below <input/>, see the "id" */}
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: "none" }} //because we alread have <label>
        onChange={handleUpload}
      />
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" />
      </button>
    </form>
  );
}
export default MessageForm;
