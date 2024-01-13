import { useSelector } from "react-redux";
import "./myStyles.css";

const MsgOthers = ({props}) => {
//   return (
//     <div className="msgOthers">
//       <p className="con-icon">S</p>
//       <div className="others-text-content">
//         <p className="text-msg">
//           Hey there!!! I am Tathagat Tiwari. How are You
//           ????????dddddddddddddddddddddddddnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
//         </p>
//         <p className="msg-time">12:02</p>
//       </div>
//     </div>
//   );
// };

  const lightTheme = useSelector((state) => state.themeKey);
  // console.log("message others : ", props);
  return (
    <div className={"other-message-container" + (lightTheme ? "" : " dark")}>
      <div className={"msgOthers" + (lightTheme ? "" : " dark")}>
        <p className={"chat-icon" + (lightTheme ? "" : " dark")}>
          {props.sender.name[0]}
        </p>
        <div className={"others-text-content" + (lightTheme ? "" : " dark")}>
          {/* <p className={"con-title" + (lightTheme ? "" : " dark")}>
            {props.sender.name}
          </p> */}
          <p className={"con-lastMessage" + (lightTheme ? "" : " dark")}>
            {props.content}
          </p>
          {/* <p className="self-timeStamp">12:00am</p> */}
        </div>
      </div>
    </div>
  );
}

export default MsgOthers;
