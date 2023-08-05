import "./myStyles.css";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import Welcome from "./Welcome";
import CreateGroup from "./CreateGroup";
import AvailableOnline from "./OnlineUsers";
import { Outlet } from "react-router-dom";

const MainContainer = () => {
  return (
    <div className="mainContainer">
      <Sidebar />
      <Outlet />
      {/* <ChatArea /> */}
      {/* <AvailableOnline /> */}
      {/* <CreateGroup /> */}
    </div>
  );
};

export default MainContainer;
