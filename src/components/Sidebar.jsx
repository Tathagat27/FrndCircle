import React, { useState } from "react";
import "./myStyles.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NightlightIcon from "@mui/icons-material/Nightlight";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";

import { IconButton } from "@mui/material";
import ConversationsItem from "./ConversationsItem";

const Sidebar = () => {
  const [conversations, setConversation] = useState([
    {
      name: "Test#1",
      lastMessage: "Last Message #1",
      timeStamp: "today",
    },
    {
      name: "Test#2",
      lastMessage: "Last Message #2",
      timeStamp: "today",
    },
    {
      name: "Test#3",
      lastMessage: "Last Message #3",
      timeStamp: "today",
    },
  ]);

  return (
    <div className="sidebar">


      <div className="sb-header">
        <div>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </div>

        <div>
          <IconButton>
            <PersonAddIcon />
          </IconButton>
          <IconButton>
            <GroupAddIcon />
          </IconButton>
          <IconButton>
            <AddCircleIcon />
          </IconButton>
          <IconButton>
            <NightlightIcon />
          </IconButton>
        </div>
      </div>


      <div className="sb-search">
        <IconButton>
          <SearchIcon />
        </IconButton>

        <input placeholder="Search" />
      </div>


      <div className="sb-chat">
        {conversations.map((conversation) => {
          return <ConversationsItem key={conversation.name} props={conversation} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
