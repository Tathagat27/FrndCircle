import { useContext, useEffect, useState } from "react";
import "./myStyles.css";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import logo from "../../public/favicon.png";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { refreshSidebarFun } from "../features/refreshSidebar";
import { myContext } from "./MainContainer";
import GroupsIcon from '@mui/icons-material/Groups';

function Groups() {
  // const [refresh, setRefresh] = useState(true);
  const { refresh, setRefresh } = useContext(myContext);

  const lightTheme = useSelector((state) => state.themeKey);
  const dispatch = useDispatch();
  const [groups, setGroups] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  // console.log("Data from LocalStorage : ", userData);
  const nav = useNavigate();
  if (!userData) {
    console.log("User not Authenticated");
    nav("/");
  }

  const searchGroups = (query) => {

    console.log(query);
      // setSearch(query);
      if(query.trim().length > 0){
        const filteredGroups= groups.filter((group) => group.chatName.toLowerCase().startsWith(query.toLowerCase()));

        setGroups(filteredGroups);
      }
      else{
        setRefresh(!refresh);
      }

      
  }

  const user = userData.data;
  useEffect(() => {
    console.log("Users refreshed : ", user.token);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios
      .get("http://localhost:8080/chat/fetchGroups", config)
      .then((response) => {
        console.log("Group Data from API ", response.data);
        setGroups(response.data);
      });
  }, [refresh]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          ease: "anticipate",
          duration: "0.3",
        }}
        className="availableOnline"
      >
        <div className={"avl-header" + (lightTheme ? "" : " dark")}>
        <div className="online-logo">
            <img src={logo} alt="logo" />
          </div>

          <p className={"con-title" + (lightTheme ? "" : " dark")}>
            Available Groups
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

        <div className="avl-grp-area">
        <div className={"sb-search" + (lightTheme ? "" : " dark")}>
          <IconButton className={"icon" + (lightTheme ? "" : " dark")}>
            <SearchIcon />
          </IconButton>
          <input
            placeholder="Search"
            className={"search-box" + (lightTheme ? "" : " dark")}
            onChange={(e) => {
              searchGroups(e.target.value);
            }}
          />
        </div>
        <div className="avlUsersAndGrps">
        {console.log(groups)}
          {groups.map((group, index) => {
            return (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={"list-tem" + (lightTheme ? "" : " dark")}
                key={index}
                onClick={() => {
                  console.log("Creating chat with group", group.chatName);
                  const config = {
                    headers: {
                      Authorization: `Bearer ${userData.data.token}`,
                    },
                  };
                  axios.post(
                    "http://localhost:8080/chat/createGroup",
                    {
                      userId: user._id,
                    },
                    config
                  );
                  dispatch(refreshSidebarFun());
                }}
              >
              <div className="avl-users-grps-container">
                <p className={"con-icon" + (lightTheme ? "" : " dark")}>
                  <GroupsIcon />
                </p>
                <div className="curr-chatUser">
                  <p className={"ca-title" + (lightTheme ? "" : " dark")}>
                  {group.chatName}
                </p>
                </div>
                
                </div>
              </motion.div>
            );
          })}
        </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Groups;