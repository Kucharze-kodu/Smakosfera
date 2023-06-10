import { styles } from "../style";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";

const MyAccount = () => {
  const [accountInfo, setAccountInfo] = useState([]);

    // Check if user is logged in
    const { isLoggedIn } = useAuth();
    const { getResJsonToken } = useAuth();
    const { getResJsonId } = useAuth();

    // GET 
    useEffect(() => {
      axios
        .get(`https://localhost:7000/api/account`, {
          headers: {
            Authorization: `Bearer ${getResJsonToken()}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => { 
          setAccountInfo(response.data);
        });
    }, []);
    
  return (
    <>
      {/* My Account section */}
      <div className={`${styles.paragraph} text-white font-20 p-2`}>
        Informacje o koncie 
        </div>
      <div className={`${styles.paragraph} text-dimWhite p-2`}>
        <p>Twoja nazwa:</p>
        {accountInfo.name}
      </div>
      <div className={`${styles.paragraph} text-dimWhite p-2`}>
        <p>Twój email: </p>
        {accountInfo.email}
      </div>
      <div className={`${styles.paragraph} text-dimWhite p-2`}>
        <Link
          to="/resetpassword"
          className={`${styles.paragraph} my-1 cursor-pointer opacity-50`}
          >
          Zmień hasło
        </Link>
        
      </div>
    </>
  );
};

export default MyAccount;
