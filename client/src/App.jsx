import "./App.css";
import Login from "./components/Login";
import MainContainer from "./components/MainContainer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./components/Welcome";
import ChatArea from "./components/ChatArea";
import CreateGroup from "./components/CreateGroup";
import OnlineUsers from "./components/OnlineUsers";
import AvailableGroups from "./components/AvailableGroups";
import Signup from "./components/Signup";
import { useSelector } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "app",
    element: <MainContainer />,
    children: [
      {
        path: "welcome",
        element: <Welcome />,
      },
      {
        path: "chat/:id",
        element: <ChatArea />,
      },
      {
        path: "users",
        element: <OnlineUsers />,
      },
      {
        path: "groups",
        element: <AvailableGroups />,
      },
      {
        path: "create-group",
        element: <CreateGroup />,
      },
    ],
  },
]);

function App() {
  const lightTheme = useSelector((state) => state.themeKey);
  return (
    <div className={"app" + (lightTheme ? "" : " dark")}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
