import "./myStyles.css";

const MsgSelf = ({props}) => {
  return (
      <div className="self-text-content">
     
        <p className="text-msg">
          {props.content}
        </p>
      
        
        {/* <p className="msg-time">12:05</p> */}
      </div>
  );
};

export default MsgSelf;
