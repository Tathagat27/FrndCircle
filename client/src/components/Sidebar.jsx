import { useContext, useState, useEffect } from "react";
import "./myStyles.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import GroupsIcon from '@mui/icons-material/Groups';

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import axios from "axios";
// import { refreshSidebarFun } from "../features/refreshSidebar";
import { myContext } from "./MainContainer";


import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  const refreshSidebar = useSelector((state) => state.refreshKey);
  const { refresh, setRefresh } = useContext(myContext);
  console.log("Context API : refresh : ", refresh);
  const [conversations, setConversations] = useState([]);
  // console.log("Conversations of Sidebar : ", conversations);

  const userData = JSON.parse(localStorage.getItem("userData"));
  // console.log("Data from LocalStorage : ", userData);
  const nav = useNavigate();
  if (!userData) {
    console.log("User not Authenticated");
    nav("/");
  }

  const user = userData.data;

  const searchInSidebar = (query) => {

    console.log(query);
      // setSearch(query);
      if(query.trim().length > 0){
        const filteredConversations = conversations.filter((conversation) => ((!conversation.isGroupChat) ? (user.name === conversation.users[0].name) ? conversation.users[1].name : conversation.users[0].name : conversation.chatName).toLowerCase().startsWith(query.toLowerCase()));

        setConversations(filteredConversations);
      }
      else{
        setRefresh(!refresh);
      }

      
  }
  
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios.get(`${BASE_URL}/chat/`, config).then((response) => {
      console.log("Data refresh in sidebar ", response.data);
      setConversations(response.data);
      // setRefresh(!refresh);
    });
  }, [refresh, refreshSidebar]);

  return (
    
    <div className="sidebar">
      <div className={"sb-header" + (lightTheme ? "" : " dark")}>
        <div>
        <Link to={'welcome'}>
          <IconButton>
            <AccountCircleIcon  className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>
        </Link>
          
        </div>

        <div>
          <Link to={"users"}>
            <IconButton>
              <PersonAddIcon className={"icon" + (lightTheme ? "" : " dark")} />
            </IconButton>
          </Link>

          <Link to={"groups"}>
            <IconButton>
              <GroupAddIcon className={"icon" + (lightTheme ? "" : " dark")} />
            </IconButton>
          </Link>

          <Link to={"create-group"}>
            <IconButton>
              <AddCircleIcon className={"icon" + (lightTheme ? "" : " dark")} />
            </IconButton>
          </Link>

          <IconButton onClick={() => {
              dispatch(toggleTheme());
            }}>
             {lightTheme && (<NightlightIcon className={"icon" + (lightTheme ? "" : " dark")} />)}
             {!lightTheme && (
              <LightModeIcon className={"icon" + (lightTheme ? "" : " dark")} />
            )}
          </IconButton>

          <IconButton
            onClick={() => {
              localStorage.removeItem("userData");
              navigate("/");
            }}
          >
            <ExitToAppIcon className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>


        </div>
      </div>

      <div className={"sb-search" + (lightTheme ? "" : " dark")}>
        <IconButton className={"icon" + (lightTheme ? "" : " dark")}>
          <SearchIcon />
        </IconButton>

        <input placeholder="Search" className={"search-box" + (lightTheme ? "" : " dark")} onChange={(e) => {
            searchInSidebar(e.target.value);
          }} />
      </div>

      <div  className={"sb-chat" + (lightTheme ? "" : " dark")}>
          {(conversations.length === 0) &&
            <div className={"con-container" + (lightTheme ? "" : " dark")} ><p className={"con-title" + (lightTheme ? "" : " dark")}>No users or group</p></div>
          }
        {conversations.map((conversation, index) => {

          {/* console.log("current convo : ", conversation.users); */}
          if (conversation.users.length === 1) {
            return <div key={index}></div>;
          }

          const chatUserName = (!conversation.isGroupChat) ? (user.name === conversation.users[0].name) ? conversation.users[1].name : conversation.users[0].name : conversation.chatName;
          
          if (conversation.latestMessage === undefined || conversation.latestMessage === null) {
            // console.log("No Latest Message with ", conversation.users[1]);


          return (
            <div
                key={index}
                onClick={() => {
                  console.log("Refresh fired from sidebar");
                  // dispatch(refreshSidebarFun());
                  setRefresh(!refresh);
                }}
              >
                <div
                  key={index}
                  className="conversation-container"
                  onClick={() => {
                    navigate(
                      "chat/" +
                        conversation._id +
                        "&" +
                        chatUserName +
                        "&" +
                      conversation.isGroupChat
                    );
                  }}
                  // dispatch change to refresh so as to update chatArea
                >
                <div className={"con-container" + (lightTheme ? "" : " dark")}>
                  <p className={"con-icon" + (lightTheme ? "" : " dark")}>
                    {(!conversation.isGroupChat) ? chatUserName[0] : <GroupsIcon />}
                  </p>
                  <p className={"con-title" + (lightTheme ? "" : " dark")}>
                    {chatUserName}
                  </p>

                  <p className="con-lastMessage">
                    No previous Messages
                  </p>
                  {/* <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
                {conversation.timeStamp}
              </p> */}
              </div>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="conversation-container"
                onClick={() => {
                  navigate(
                    "chat/" +
                    conversation._id +
                        "&" +
                        chatUserName +
                        "&" +
                      conversation.isGroupChat
                  );
                }}
              >
              <div className="con-container">
                <p className={"con-icon" + (lightTheme ? "" : " dark")}>
                {(!conversation.isGroupChat) ? chatUserName[0] : <GroupsIcon />}
                </p>
                <p className={"con-title" + (lightTheme ? "" : " dark")}>
                  {chatUserName}
                </p>

                <p className="con-lastMessage">
                  {(conversation.latestMessage.content.length < 33) ? (conversation.latestMessage.content) : (conversation.latestMessage.content.substring(0,33) + `...`)}
                </p>
                {/* <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
                {conversation.timeStamp}
              </p> */}
              </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Sidebar;
