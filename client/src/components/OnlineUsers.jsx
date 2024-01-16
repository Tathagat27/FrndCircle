import "./myStyles.css";
import logo from "../../public/favicon.png";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { myContext } from "./MainContainer.jsx";
import { refreshSidebarFun } from "../features/refreshSidebar";

const OnlineUsers = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const { refresh, setRefresh } = useContext(myContext);
  const lightTheme = useSelector((state) => state.themeKey);

  const [users, setUsers] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const nav = useNavigate();

  const dispatch = useDispatch();

  if (!userData) {
    console.log("USer not Authenticated");
    nav(-1);
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

  const createChat = (user) => {
    console.log("Creating chat with ", user.name);
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios.post(
      `${BASE_URL}/chat/`,
      {
        userId: user._id,
      },
      config
    );
  }

  useEffect(() => {
    console.log("Users refreshed");

    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };

    axios.get(`${BASE_URL}/user/fetchUsers`, config).then((data) => {
      console.log("User Data from API", data);
      setUsers(data.data);
    });
  }, [refresh]);

  return (
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
          <div className="online-logo">
            <img src={logo} alt="logo" />
          </div>

          <p className={"con-title" + (lightTheme ? "" : " dark")}>
            Available Users
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
                  createChat(user);
                  setRefresh(!refresh);
                  dispatch(refreshSidebarFun());
                }}
              >
              
          <div className={"avl-users-grps-container" + (lightTheme ? "" : " dark")}>
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
  );
};

export default OnlineUsers;
