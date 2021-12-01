import React, { useEffect, useState } from "react";
import "./chat.css";
import { io } from "socket.io-client";
import jwt from "jsonwebtoken";
import Message from "./Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { Link } from "react-router-dom";
import axios from "axios";

let socket;
function Chat() {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  const token = localStorage.getItem("token");
  const decoded = jwt.decode(token);
  // console.log(decoded);

  const send = async () => {
    const message = document.getElementById("chatInput").value;
    await axios.post(
      "http://localhost:3001/chats/postChat",
      { userName: decoded.user.name, message: message },
      { headers: { token: localStorage.getItem("token") } }
    );
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket = io("http://localhost:3001");

    socket.on("connect", () => {
      alert("connected");
      setId(socket.id);
    });

    socket.emit("joined", { user: `${decoded.user.name}` });
    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      // console.log(data.message);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      //console.log(data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      //console.log(data.message);
    });

    return () => {
      socket.emit("disconnected");
      socket.off();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      //console.log(data.message, data.user);
    });
    return () => socket.off();
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <Link to="/" onClick={() => localStorage.removeItem("token")}>
            Logout
          </Link>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input type="text" id="chatInput" />
          <button onClick={send} className="sendBtn">
            Send
          </button>
        </div>
      </div>
      <Link
        style={{
          marginTop: "1rem",
          textDecoration: "none",
          color: "white",
          background: "black",
        }}
        to="/savedchat"
      >
        View SavedChats
      </Link>
    </div>
  );
}

export default Chat;
