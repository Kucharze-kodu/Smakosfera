import { styles } from "../style";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { urlAccountInfo } from "../endpoints";

const MyAccount = () => {
  const [accountInfo, setAccountInfo] = useState([]);

    // Check if user is logged in
    const { isLoggedIn } = useAuth();
    const { getResJsonToken } = useAuth();
    const { getResJsonId } = useAuth();

    // GET 
    useEffect(() => {
      axios
        .get(urlAccountInfo, {
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
    isLoggedIn() ? (
    <>
      {/* My Account section */}
      
        <div className={`${styles.paragraph} text-white underline text-[32px] font-20 p-2`}>
          Informacje o koncie 
          </div>
        <div className={`${styles.paragraph} text-white text-[24px] p-2`}>
          Twoja nazwa:
        </div>
        <div className={`${styles.paragraph} text-dimWhite p-2`}>
          {accountInfo.name}
        </div>
        <div className={`${styles.paragraph} text-dimWhite p-2`}>
          <Link
            to="/changename"
            className={`${styles.paragraph} my-1 cursor-pointer opacity-50 hover:text-white`}
            >
            Zmień swoją nazwę!
          </Link>
        </div>
        <div className={`${styles.paragraph} text-white text-[24px] p-2`}>
          Twój email:
        </div>
        <div className={`${styles.paragraph} text-dimWhite p-2`}>
          {accountInfo.email}
        </div>
        <div className={`${styles.paragraph} text-dimWhite p-2 hover:text-white`}>
          <Link
            to="/changeemail"
            className={`${styles.paragraph} my-1 cursor-pointer opacity-50`}
            >
            Zmień email
          </Link>
        </div>
        <div className={`${styles.paragraph} text-dimWhite p-2 hover:text-white`}>
          <Link
            to="/changepassword"
            className={`${styles.paragraph} my-1 cursor-pointer text-[24px] opacity-50`}
            >
            Zmień swoje hasło
          </Link>
        </div>

      </>
          ) : (
            <div className={`${styles.paragraph} my-48 xs:my-auto items-center justify-center xs:justify-start text-center text-dimWhite`}>
              Nie masz uprawnień do wyświetlania tej strony!
            </div>
  )
  );
};

export default MyAccount;
