import "./myStyles.css";
import React, { useContext, useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { create } from "@mui/material/styles/createTransitions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { AnimatePresence, motion } from "framer-motion";
import { myContext } from "./MainContainer.jsx";
import { refreshSidebarFun } from "../features/refreshSidebar.js";

function CreateGroups() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const { refresh, setRefresh } = useContext(myContext);
  const lightTheme = useSelector((state) => state.themeKey);
  const userData = JSON.parse(localStorage.getItem("userData"));
  // console.log("Data from LocalStorage : ", userData);
  const nav = useNavigate();
  const dispatch = useDispatch();

  if (!userData) {
    console.log("User not Authenticated");
    nav("/");
  }
  const user = userData.data;
  const [groupName, setGroupName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("Users refreshed");

    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };

    axios.get(`${BASE_URL}/user/fetchUsers`, config).then((data) => {
      // console.log("User Data from API", data);
      setUsers(data.data);
    });
  }, [refresh]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (user) => {
    
    if(selectedUsers.includes(user)){
      const updatedUsers = selectedUsers.filter(u => u !== user);
      setSelectedUsers(updatedUsers);
    }
    else{
      setSelectedUsers([...selectedUsers, user]);
    }
    // console.log(selectedUsers);
    
  }

  const searchUsers = (query) => {

    console.log(query);
      // setSearch(query);
      if(query.trim().length > 0){
        const filteredUsers= users.filter((user) => user.name.toLowerCase().startsWith(query.toLowerCase()));

        setUsers(filteredUsers);
      }
      else{
        setRefresh(!refresh);
      }

      
  }


  console.log("User Data from CreateGroups : ", userData);

  const createGroup = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios.post(
      `${BASE_URL}/chat/createGroup`,
      {
        name: groupName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      },
      config
    );
    nav("/app/groups");
  };

  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you want to create a Group Named " + groupName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will create a create group in which you will be the admin and
              other will be able to join this group.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button
              onClick={() => {
                createGroup();
                handleClose();
                dispatch(refreshSidebarFun());
              }}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className={"createGroup" + (lightTheme ? "" : " dark")}>
      <div className="create-group-input">
        <input
          placeholder="Enter Group Name"
          className={"input-group" + (lightTheme ? "" : " dark")}
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
        />
        <IconButton
          className={"icon" + (lightTheme ? "" : " dark")}
          style={{color:"#00e500"}}
          onClick={() => {
            handleClickOpen();
            // createGroup();
          }}
        >
          <CheckCircleIcon />
        </IconButton>
      </div>
        
          {/* Users */}

      <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          duration: "0.3",
        }}
        className="availableOnline"
      >
        <div className={"avl-header" + (lightTheme ? "" : " dark")}>

          <p className={"ug-title" + (lightTheme ? "" : " dark")}>
            Select Group Members
          </p>
          <IconButton
            className={"icon" + (lightTheme ? "" : " dark")}
            onClick={() => {
              setRefresh(!refresh);
            }}
          >
            <RefreshIcon />
          </IconButton>
        </div>
        <div className={"avl-grp-area" + (lightTheme ? "" : " dark")}>

        <div className={"sb-search" + (lightTheme ? "" : " dark")}>
          <IconButton className={"icon" + (lightTheme ? "" : " dark")}>
            <SearchIcon />
          </IconButton>
          <input
            placeholder="Search"
            className={"search-box" + (lightTheme ? "" : " dark")}
            onChange={(e) => {
              searchUsers(e.target.value);
            }}
          />
        </div>
        <div className={"avlUsersAndGrps" + (lightTheme ? "" : " dark")}>
          {users.map((user, index) => {
            return (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={"list-tem" + (lightTheme ? "" : " dark")}
                key={index}
                onClick={() => {
                  console.log("Selecting User : ", user.name);
                  handleSelect(user);
                }}
              >
              
          <div className={"avl-users-grps-container" + ((selectedUsers.includes(user)) ? ' selected' : '') + (lightTheme ? "" : " dark")}>
                <p className={"con-icon" + (lightTheme ? "" : " dark")}>{user.name[0]}</p>
                <div className="curr-chatUser">
                <p className={"ca-title" + (lightTheme ? "" : " dark")}>
                  {user.name}
                </p>
                </div></div>
             
              </motion.div>
            );
          })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
        
      </div>
    </>
  );
}

export default CreateGroups;