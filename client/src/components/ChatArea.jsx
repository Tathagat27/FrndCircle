import "./myStyles.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import MsgOthers from "./MsgOthers";
import MsgSelf from "./MsgSelf";

const ChatArea = () => {
  return (
    <div className="chatArea-container">
      <div className="ca-header">
        <p className="con-icon">T</p>
        <div className="curr-chatUser">
          <p className="ca-title">Tathagat</p>
          <p className="ca-timeStamp">today</p>
        </div>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </div>
      <div className="message-container">
        <MsgOthers />
        <MsgSelf />
        <MsgOthers />
        <MsgSelf />
        <MsgOthers />
        <MsgSelf />
        <MsgOthers />
        <MsgSelf />
      </div>
      <div className="textSent">
        <div className="text-input-area">
          <input placeholder="Send a Message" className="message" />
          <IconButton>
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
