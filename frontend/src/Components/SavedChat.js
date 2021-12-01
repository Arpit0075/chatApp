import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./savedChat.css";

function SavedChat() {
  const [savedMessages, setSavedMessages] = useState([]);

  // eslint-disable-next-line
  useEffect(async () => {
    const deployedUrl = "https://chatapp978.herokuapp.com/chats/getChats";
    const localUrl = "http://localhost:3001/chats/getChats";

    const res = await axios.get(deployedUrl, {
      headers: { token: localStorage.getItem("token") },
    });

    //console.log(res.data);
    setSavedMessages(res.data);
  }, []);

  return (
    <div className="savedChat">
      <Link to="/livechat"> Live Chat </Link>

      <div className="container">
        {savedMessages.length === 0 ? <h1>No chats!</h1> : null}
        {savedMessages &&
          savedMessages.map((item, i) => {
            return (
              <div className="item">
                {item.userName}: {item.message}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SavedChat;
