import { Route, Routes} from "react-router-dom";

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
import { checkAuthState } from "./store/authSlice.js";
import { AuthLayout, Navbar } from "./components";
function App() {
  const themeMode = useSelector((state) => state.theme.themeMode);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await authService.checkAuth();
      if (res && res.success) {
        dispatch(checkAuthState(res.user));
      }
      setLoading(false);
    })();
  }, [dispatch]);
  if (loading) {
    return <LoaderPage />;
  }
  return (
    <div className="flex flex-col overflow-hidden" data-theme={themeMode}>
      <div><Navbar /></div>
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
  );
}

export default App;
