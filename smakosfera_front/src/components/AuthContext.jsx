import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [resJsonName, setResJsonName] = useState(null);
  const [cookieName, setCookieName, removeCookieName] = useCookies([
    "resJson_name",
  ]);
  const [resJsonPermission, setResJsonPermission] = useState(null);
  const [cookiePermission, setCookiePermission, removeCookiePermission] = useCookies(["resJson_permission"]);

  // store cookies
  useEffect(() => {
    const storedResJsonName = cookieName.resJson_name;
    const storedResJsonPermission = cookiePermission.resJson_permission;
    if (storedResJsonName) {
      setResJsonName(storedResJsonName);
    }
    if (storedResJsonPermission) {
      setResJsonPermission(storedResJsonPermission);
    }
  }, [cookieName, cookiePermission]);

  // Check if user is loggedIn
  const isLoggedIn = () => {
    if (resJsonName != null && resJsonPermission != null) return true;
    else return false;
  };

  const getResJsonName = () => {
    return resJsonName;
  }

  // Delete cookies
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the cookies and clear the context
    removeCookieName("resJson_name", { path: "/" });
    removeCookiePermission("resJson_permission", { path: "/" });
    setResJsonName(null);
    setResJsonPermission(null);
    navigate("/logout");
  };

  return (
    // send context betwwen diferent components
    <AuthContext.Provider value={{ isLoggedIn, handleLogout, getResJsonName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);