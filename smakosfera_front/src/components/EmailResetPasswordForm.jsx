import { styles } from "../style";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { urlResetPassword } from "../endpoints";
import axios from 'axios';

const whiteSpaceText = '\u00A0';

const EmailResetPassword = () => {
  const[newEmail, setNewEmail] = useState("");
  const[message, setMessage] = useState("");
  const[isPopupOpen, setIsPopupOpen] = useState(false);

    // Check if user is logged in
    const { isLoggedIn } = useAuth();
    const { getResJsonToken } = useAuth();
    const { getResJsonId } = useAuth();
  
  let handleSubmit = async (e) => {
    e.preventDefault();
    try{
      let res = await fetch(urlResetPassword, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getResJsonToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  
          email: newEmail,
        }),
      });

      // let resJson = await res.json();
      
      if(res.status === 200){
        setIsPopupOpen(true);
      }
      else{
        setMessage("Konto o takim emailu nie istnieje!");
      }
    }
     catch (error) {
    }
  };

  return (
    <div className={`${styles.background} flex flex-row items-center`}>
      <div className="flex md:flex-row flex-col h-[90%] md:h-[75%] w-full border-[2px] border-white mx-5 lg:mx-48">
        <Link to="/" className="w-full">
          <div className="flex items-center md:items-top justify-center  md:h-full border-b-[1px] md:border-b-[0px] border-r-[0px] md:border-r-[1px] border-r-dimWhite border-b-dimWhite">
            <img className="sm:p-24 md:p-16 p-12" src={logo} />
          </div>
        </Link>
        <div className="overflow-auto flex flex-col p-3 items-center w-full h-full justify-center xs:justify-start md:my-10 text-center text-white">


        {isPopupOpen ? (
            <div className="popup">
              <div className="popup-content">
                <div className="text-container">
                  <div style={{ lineHeight: '1.75' }} className={`${styles.heading5}`}>
                    Na twoją skrzynkę został wysłany link resetujący hasło!
                    </div>
                </div>
                    <div style={{ lineHeight: '1.75' }} className={`${styles.heading5}`}>
                      {whiteSpaceText}
                    </div>
                <div className="link-container">
                  <Link
                    to="/"
                    className={`${styles.paragraph} p-5 mt-3 sm:min-w-[25%] min-w-[100%] border-[1px] focus:border-white hover:border-white border-dimWhite w-[100%] hover:bg-black bg-black rounded-[15px] `}
                  >
                    OK
                  </Link>
                </div>
              </div>
            </div>
          ) : (
        <form onSubmit={handleSubmit} className="flex flex-col w-[75%] ">
        <div className={`${styles.heading4} text-white `}>Podaj swój email!</div>
        <input
              type="email"
              value={newEmail}
              id="email"
              name="email"
              title="Email:"
              className={`${styles.paragraph3} bg-dark border-[1px] text-left pl-2 mr-1 mt-3 border-dimWhite w-[100%] text-black hover:text-white focus:text-white hover:bg-black focus:bg-black`}
              placeholder="Twój email:"
              maxLength={256}
              required
              onChange={(e) => setNewEmail(e.target.value)}
            ></input>
            <button
                type="submit"
                className={`${styles.paragraph} p-5 mt-3 sm:min-w-[25%] min-w-[100%] border-[1px] focus:border-white hover:border-white border-dimWhite w-[100%] hover:bg-black bg-black rounded-[15px] `}
              >
                Wyślij!
              </button>
              <div className="">{message ? <p>{message}</p> : null}</div>
              <Link
              to="/home/my-account"
              className={`${styles.paragraph} my-1 cursor-pointer opacity-50`}
              >
              Powrót
              </Link>
              </form>
              )}
        </div>
      </div>
    </div>
  );
};

export default EmailResetPassword;
