import { useState } from "react";
import "./myStyles.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NightlightIcon from "@mui/icons-material/Nightlight";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";

import { IconButton } from "@mui/material";
import ConversationsItem from "./ConversationsItem";
import { Link } from "react-router-dom";

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
    {
      name: "Test#4",
      lastMessage: "Last Message #3",
      timeStamp: "today",
    },
    {
      name: "Test#5",
      lastMessage: "Last Message #3",
      timeStamp: "today",
    },
    {
      name: "Test#6",
      lastMessage: "Last Message #3",
      timeStamp: "today",
    },
    {
      name: "Test#7",
      lastMessage: "Last Message #3",
      timeStamp: "today",
    },
    {
      name: "Test#8",
      lastMessage: "Last Message #3",
      timeStamp: "today",
    },
    {
      name: "Test#9",
      lastMessage: "Last Message #3",
      timeStamp: "today",
    },
    {
      name: "Test#10",
      lastMessage: "Last Message #3",
      timeStamp: "today",
    },
  ]);


  return (
    <div className="sidebar">
      <div className="sb-header">
        <div>
        <Link to={'welcome'}>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </Link>
          
        </div>

        <div>
          <Link to={"users"}>
            <IconButton>
              <PersonAddIcon />
            </IconButton>
          </Link>

          <Link to={"groups"}>
            <IconButton>
              <GroupAddIcon />
            </IconButton>
          </Link>

          <Link to={"create-group"}>
            <IconButton>
              <AddCircleIcon />
            </IconButton>
          </Link>

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
          return (
            <Link style={{textDecoration: 'none', color: 'inherit'}} key={conversation.name} to={"chat"}>
              <ConversationsItem style={{textDecoration: 'none'}} props={conversation} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
