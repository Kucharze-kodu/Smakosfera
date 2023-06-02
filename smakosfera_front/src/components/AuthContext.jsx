import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [resJsonName, setResJsonName] = useState(null);
  const [cookieName, setCookieName, removeCookieName] = useCookies(["resJson_name"]);

  const [resJsonId, setResJsonId] = useState(null);
  const [cookieId, setCookieId, removeCookieId] = useCookies(["resJson_id"]);

  const [resJsonPermission, setResJsonPermission] = useState(null);
  const [cookiePermission, setCookiePermission, removeCookiePermission] = useCookies(["resJson_permission"]);

  // store cookies
  useEffect(() => {
    const storedResJsonName = cookieName.resJson_name;
    const storedResJsonId = cookieId.resJson_id;
    const storedResJsonPermission = cookiePermission.resJson_permission;
    
    if (storedResJsonName) {
      setResJsonName(storedResJsonName);
    }
    if (storedResJsonId) {
      setResJsonId(storedResJsonId);
    }
    if (storedResJsonPermission) {
      setResJsonPermission(storedResJsonPermission);
    }
  }, [cookieName, cookieId, cookiePermission]);

  // Check if user is loggedIn
  const isLoggedIn = () => {
    if (resJsonName != null && resJsonPermission != null && resJsonId != null) return true;
    else return false;
  };

  // Return name of user
  const getResJsonName = () => {
    return resJsonName;
  }

  // Return id of user
  const getResJsonId = () => {
    return resJsonId;
  }

  // Delete cookies
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the cookies and clear the context
    removeCookieName("resJson_name", { path: "/" });
    removeCookieId("resJson_id", { path: "/" });
    removeCookiePermission("resJson_permission", { path: "/" });
    setResJsonName(null);
    setResJsonId(null);
    setResJsonPermission(null);
    navigate("/logout");
  };

  return (
    // send context betwwen diferent components
    <AuthContext.Provider value={{ isLoggedIn, handleLogout, getResJsonName, getResJsonId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);