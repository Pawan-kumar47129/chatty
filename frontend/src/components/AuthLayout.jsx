/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LoaderPage } from "../pages";
function AuthLayout({ children, authentication=true }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.authStatus);
  const location = useLocation();
  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (
      authStatus &&
      (location.pathname.includes("/login") ||
        location.pathname.includes("/signup"))
    ) {
      navigate("/");
    }
    setLoading(false);
  }, [authStatus, authentication,navigate ,location.pathname]);

  return loading ? <LoaderPage /> : <div>{children}</div>;
}

export default memo(AuthLayout);
