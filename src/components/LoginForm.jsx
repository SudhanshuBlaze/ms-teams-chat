import { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const authObject = {
      "Project-ID": process.env.REACT_APP_PROJECT_ID,
      "User-Name": username,
      "User-Secret": password,
    };
    try {
      await axios.get("https://api.chatengine.io/chats", {
        headers: authObject,
      });
      //   this saves the user creds into local storage so, it won't ask user to login every time
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      window.location.reload(); //reloads the page, but this time user creds will be saved locally
    } catch (error) {
      setError("Oops!!, Incorrect credentials.");
    }
  }
  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Teams-Chat</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
            required
          />
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>
          <h2 className="error">{error}</h2>
        </form>
      </div>
    </div>
  );
}
export default LoginForm;
