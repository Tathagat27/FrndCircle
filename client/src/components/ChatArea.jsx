import "./myStyles.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import MsgOthers from "./MsgOthers";
import MsgSelf from "./MsgSelf";
import GroupsIcon from '@mui/icons-material/Groups';

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";

import io from "socket.io-client";

const ENDPOINT = "http://localhost:8080";

let socket, chatCompare_id;

const ChatArea = () => {
  const lightTheme = useSelector((state) => state.themeKey);
  const [messageContent, setMessageContent] = useState("");
  const dyParams = useParams();
  // console.log(dyParams);
  const [chat_id, chat_user, isGroupChat] = dyParams.id.split("&");
  // console.log(chat_id, chat_user, isGroupChat);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [allMessages, setAllMessages] = useState([]);

  // const [allMessagesCopy, setAllMessagesCopy] = useState([]);
  // console.log("Chat area id : ", chat_id._id);
  // const refresh = useSelector((state) => state.refreshKey);
  // const { refresh, setRefresh } = useContext(myContext);
  const [loaded, setloaded] = useState(false);

  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);

  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  };

  const sendMessage = () => {
    // console.log("SendMessage Fired to", chat_id._id);

    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios
      .post(
        "http://localhost:8080/message/",
        {
          content: messageContent,
          chatId: chat_id,
        },
        config
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
        console.log("Message Fired");
        socket.emit("new message", data);        
        setAllMessages((allMessages) => [...allMessages, data]);
        
      })
      .catch((error) => {
        console.error('Axios Error:', error);
      });


  };

  const handleNewMessage = (newMessage) => {
    if(!chatCompare_id || chatCompare_id !== newMessage.chat._id){
        // setAllMessages([...allMessages], newMessage);
        console.log("true");
    }
    else{
      console.log("false");
      console.log(allMessages);
      setAllMessages((allMessages) => [...allMessages, newMessage]);
    }
  };


  // connect to socket

  useEffect(() => {
    console.log("first useEffect");
    socket = io(ENDPOINT);
    socket.emit("setup", userData);
    socket.on("connection", () => {
      setSocketConnectionStatus(!socketConnectionStatus);
    });
  }, []);
  
  useEffect(() => {
    console.log("Users refreshed");
    setloaded(false);
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios
      .get("http://localhost:8080/message/" + chat_id, config)
      .then(({ data }) => {
        console.log(data);
        setAllMessages(data);
        setloaded(true);
        scrollToBottom();
        // console.log("Data from Acess Chat API ", data);
        socket.emit("join chat", chat_id);
        // setAllMessages(allMessages);
      });
    
      chatCompare_id = chat_id;
  }, [chat_id, userData.data.token,]);

  // new message recieved

  useEffect(() => {
    console.log("2nd useEffect");
    scrollToBottom();
    socket.on("message recieved", handleNewMessage);

    return () => {
      socket.off('message recieved', handleNewMessage);
    };
  });


  const messagesEndRef = useRef(null);
  

  if (!loaded) {
    return (
      <div
        style={{
          border: "20px",
          padding: "10px",
          flex: "0.7",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            borderRadius: "10px",
            flexGrow: "1",
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
      </div>
    );
  } else {
    return (
      <div className={"chatArea-container" + (lightTheme ? "" : " dark")}>
        <div className={"ca-header" + (lightTheme ? "" : " dark")}>
          <p className={"con-icon" + (lightTheme ? "" : " dark")}>
            {(isGroupChat === 'false') ? chat_user[0] : <GroupsIcon />}
          </p>
          <div className={"curr-chatUser" + (lightTheme ? "" : " dark")}>
            <p className={"ca-title" + (lightTheme ? "" : " dark")}>
              {chat_user}
            </p>
            {/* <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
              {props.timeStamp}
            </p> */}
          </div>
          <IconButton className={"ca-delete" + (lightTheme ? "" : " dark")}>
            <DeleteIcon />
          </IconButton>
        </div>

        
        
        <div className={"message-container" + (lightTheme ? "" : " dark")}>
          {console.log(allMessages)}
          {allMessages
            .slice(0)
            .map((message, index) => {
              const sender = message.sender;
              
              const self_id = userData.data._id;
              if (sender._id === self_id) {
                // console.log("I sent it ");
                return <MsgSelf props={message} key={index} />;
              } else {
                // console.log("Someone Sent it");
                return <MsgOthers props={message} isGroupChat={isGroupChat} key={index} />;
              }
            })}
            <div ref={messagesEndRef} />
        </div>
        
        <div className={"text-input-area" + (lightTheme ? "" : " dark")}>
          <input
            placeholder="Type a Message"
            className={"search-box" + (lightTheme ? "" : " dark")}
            value={messageContent}
            onChange={(e) => {
              setMessageContent(e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.code == "Enter") {
                // console.log(event);
                sendMessage();
                setMessageContent("");
              }
            }}
          />
          <IconButton
            className={"icon" + (lightTheme ? "" : " dark")}
            onClick={() => {
              sendMessage();
            }}
          >
            <SendIcon />
          </IconButton>
        </div>
      </div>
    );
  }
};

export default ChatArea;
