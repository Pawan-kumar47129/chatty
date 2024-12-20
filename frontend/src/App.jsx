import { Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import {
  HomePage,
  LoaderPage,
  LoginPage,
  ProfilePage,
  SettingsPage,
  SignUpPage,
} from "./pages";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "./services/authService.js";
import { setAuthState, setSocketConnected } from "./store/authSlice.js";
import { AuthLayout, Navbar } from "./components";

import { getSocket } from "./services/socketServer.js";

function App() {
  const themeMode = useSelector((state) => state.theme.themeMode);
  const authStatus = useSelector((state) => state.auth.authStatus);
  const socketConnected = useSelector((state) => state.auth.socketConnected);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  //get socket client object
  const socket = getSocket();
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await authService.checkAuth();
      if (res && res.success) {
        dispatch(setAuthState(res.user));
      }
      setLoading(false);
    })();
  }, [dispatch]);

  useEffect(() => {
    if (authStatus && !socketConnected) {
      socket.connect();
      socket.on("connect", () => {
        dispatch(setSocketConnected(true));
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        socket.on("disconnect", () => dispatch(setSocketConnected(false)));
      }
    }
  }, [authStatus, dispatch]);
  if (loading) {
    return <LoaderPage />;
  }
  return (
    <div className="flex flex-col h-svh" data-theme={themeMode}>
      <div className="h-[10vh] box-border">
        <Navbar />
      </div>
      <div className="h-[90vh] overflow-auto box-border">
        <Routes>
          <Route
            path="/"
            element={
              <AuthLayout authentication={true}>
                <HomePage />
              </AuthLayout>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <AuthLayout authentication={false}>
                <SignUpPage />
              </AuthLayout>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <AuthLayout authentication={false}>
                <LoginPage />
              </AuthLayout>
            }
          ></Route>
          <Route
            path="/settings"
            element={
              <AuthLayout authentication={false}>
                <SettingsPage />
              </AuthLayout>
            }
          ></Route>
          <Route
            path="profile"
            element={
              <AuthLayout authentication={true}>
                <ProfilePage />
              </AuthLayout>
            }
          ></Route>
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
