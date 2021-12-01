import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./savedChat.css";

function SavedChat() {
  const [savedMessages, setSavedMessages] = useState([]);

  // eslint-disable-next-line
  useEffect(async () => {
    const res = await axios.get("http://localhost:3001/chats/getChats", {
      headers: { token: localStorage.getItem("token") },
    });

    //console.log(res.data);
    setSavedMessages(res.data);
  }, []);

  return (
    <div className="savedChat">
      <Link to="/livechat"> Live Chat </Link>

      <div className="container">
        {savedMessages.map((item, i) => {
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
