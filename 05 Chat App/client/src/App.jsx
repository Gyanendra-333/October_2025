import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";
import { getUser, setOnlineUsers } from "./store/slices/authSlice";
import { connectSocket, disconnectSocket } from "./lib/socket";


const App = () => {
  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [getUser])

  useEffect(() => {
    if (authUser) {
      const socket = connectSocket(authUser._id);
      socket.on("setOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users))
      })
      return () => disconnectSocket();
    }
  }, [authUser])

  return <div>
    App
  </div>;
};

export default App;
