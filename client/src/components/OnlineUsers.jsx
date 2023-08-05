import "./myStyles.css";
import logo from "../../public/favicon.png";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const OnlineUsers = () => {
  return (
    <div className="availableOnline">
      <div className="avl-header">
        <div className="online-logo">
          <img src={logo} alt="logo" />
        </div>
        <p className="header-text">Online Users</p>
      </div>

      <div className="avl-grp-area">
        <div className="avl-search">
          <IconButton>
            <SearchIcon />
          </IconButton>

          <input placeholder="Search" />
        </div>

        {/* --------------------------------------------- */}
        <div className="avlUsersAndGrps">
          <div className="avl-users-grps-container">
            <p className="con-icon">T</p>
            <div className="curr-chatUser">
              <p className="ca-title">Tathagat</p>
            </div>
          </div>

          <div className="avl-users-grps-container">
            <p className="con-icon">T</p>
            <div className="curr-chatUser">
              <p className="ca-title">Tathagat</p>
            </div>
          </div>

          <div className="avl-users-grps-container">
            <p className="con-icon">T</p>
            <div className="curr-chatUser">
              <p className="ca-title">Tathagat</p>
            </div>
          </div>

          <div className="avl-users-grps-container">
            <p className="con-icon">T</p>
            <div className="curr-chatUser">
              <p className="ca-title">Tathagat</p>
            </div>
          </div>

          <div className="avl-users-grps-container">
            <p className="con-icon">T</p>
            <div className="curr-chatUser">
              <p className="ca-title">Tathagat</p>
            </div>
          </div>

          <div className="avl-users-grps-container">
            <p className="con-icon">T</p>
            <div className="curr-chatUser">
              <p className="ca-title">Tathagat</p>
            </div>
          </div>

          <div className="avl-users-grps-container">
            <p className="con-icon">T</p>
            <div className="curr-chatUser">
              <p className="ca-title">Tathagat</p>
            </div>
          </div>

          <div className="avl-users-grps-container">
            <p className="con-icon">T</p>
            <div className="curr-chatUser">
              <p className="ca-title">Tathagat</p>
            </div>
          </div>

          <div className="avl-users-grps-container">
            <p className="con-icon">T</p>
            <div className="curr-chatUser">
              <p className="ca-title">Tathagat</p>
            </div>
          </div>

          <div className="avl-users-grps-container">
            <p className="con-icon">T</p>
            <div className="curr-chatUser">
              <p className="ca-title">Tathagat</p>
            </div>
          </div>

          <div className="avl-users-grps-container">
            <p className="con-icon">T</p>
            <div className="curr-chatUser">
              <p className="ca-title">Tathagat</p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------- */}
      </div>
    </div>
  );
};

export default OnlineUsers;
