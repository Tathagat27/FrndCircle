import "./myStyles.css";
import logo from "../../public/favicon.png";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const AvailableGroups = () => {
  return (
    <div className="availableOnline">
      <div className="avl-header">
        <div className="online-logo">
          <img src={logo} alt="logo" />
        </div>
        <p className="header-text">Available Groups</p>
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
            <p className="con-icon">G</p>
            <div className="curr-chatUser">
              <p className="ca-title">Group</p>
            </div>
          </div>

          <div className="avl-users-grps-container">
            <p className="con-icon">G</p>
            <div className="curr-chatUser">
              <p className="ca-title">Group</p>
            </div>
          </div>

          <div className="avl-users-grps-container">
            <p className="con-icon">G</p>
            <div className="curr-chatUser">
              <p className="ca-title">Group</p>
            </div>
          </div>

          <div className="avl-users-grps-container">
            <p className="con-icon">G</p>
            <div className="curr-chatUser">
              <p className="ca-title">Group</p>
            </div>
          </div>

          <div className="avl-users-grps-container">
            <p className="con-icon">G</p>
            <div className="curr-chatUser">
              <p className="ca-title">Group</p>
            </div>
          </div>

          <div className="avl-users-grps-container">
            <p className="con-icon">G</p>
            <div className="curr-chatUser">
              <p className="ca-title">Group</p>
            </div>
          </div>

          <div className="avl-users-grps-container">
            <p className="con-icon">G</p>
            <div className="curr-chatUser">
              <p className="ca-title">Group</p>
            </div>
          </div>

          <div className="avl-users-grps-container">
            <p className="con-icon">G</p>
            <div className="curr-chatUser">
              <p className="ca-title">Group</p>
            </div>
          </div>

          <div className="avl-users-grps-container">
            <p className="con-icon">G</p>
            <div className="curr-chatUser">
              <p className="ca-title">Group</p>
            </div>
          </div>

          <div className="avl-users-grps-container">
            <p className="con-icon">G</p>
            <div className="curr-chatUser">
              <p className="ca-title">Group</p>
            </div>
          </div>

          <div className="avl-users-grps-container">
            <p className="con-icon">G</p>
            <div className="curr-chatUser">
              <p className="ca-title">Group</p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------- */}
      </div>
    </div>
  )
}

export default AvailableGroups