import { styles } from "../style";
import { useNavigate, Link } from "react-router-dom";
import { logo } from "../assets";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from 'axios';
import { urlNameChange } from "../endpoints";

const whiteSpaceText = '\u00A0';

const RegisterForm = () => {
  const[newName, setNewName] = useState("");
  const[newSurname, setNewSurname] = useState("");
  const[message, setMessage] = useState("");
  const[isPopupOpen, setIsPopupOpen] = useState(false);

    // Check if user is logged in
    const { isLoggedIn } = useAuth();
    const { getResJsonToken } = useAuth();
    const { getResJsonId } = useAuth();
    const { handleLogout } = useAuth();

  let handleSubmit = async (e) => {
    e.preventDefault();
    try{
      let res = await fetch(urlNameChange, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getResJsonToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  
          name: newName,
          surname: newSurname,
        }),
      });

      // let resJson = await res.json();
      
      if(res.status === 200){
        setIsPopupOpen(true);
      }
      else{
        setMessage("Coś poszło nie tak!");
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
                    Nazwa została zmieniona pomyślnie! Prosimy o ponowne zalogowanie się!
                    </div>
                </div>
                    <div style={{ lineHeight: '1.75' }} className={`${styles.heading5}`}>
                      {whiteSpaceText}
                    </div>
                <div className="link-container"
                onClick={handleLogout}
                >
                  
                  <Link
                    to="/home/my-account"
                    className={`${styles.paragraph} p-5 mt-3 sm:min-w-[25%] min-w-[100%] border-[1px] focus:border-white hover:border-white border-dimWhite w-[100%] hover:bg-black bg-black rounded-[15px] `}
                  >
                    OK
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            isLoggedIn() ? (
        <form onSubmit={handleSubmit} className="flex flex-col w-[75%] ">
        <div className={`${styles.heading4} text-white `}>Zmień swoją nazwę!</div>
        <input
              type="text"
              value={newName}
              id="name"
              name="name"
              title="Imię:"
              className={`${styles.paragraph3} bg-dark border-[1px] text-left pl-2 mr-1 mt-3 border-dimWhite w-[100%] text-black   hover:text-white focus:text-white hover:bg-black focus:bg-black`}
              placeholder="Nowe Imię:"
              maxLength={50}
              required
              onChange={(e) => setNewName(e.target.value)}
            ></input>
            <input
              type="text"
              value={newSurname}
              id="surname"
              name="surname"
              title="Nazwisko:"
              className={`${styles.paragraph3} bg-dark border-[1px] text-left pl-2 mr-1 mt-3 border-dimWhite w-[100%] text-black hover:text-white hover:bg-black focus:text-white focus:bg-black text-black`}
              placeholder="Nowe nazwisko:"
              maxLength={50}
              required
              onChange={(e) => setNewSurname(e.target.value)}
            ></input>
            <button
                type="submit"
                className={`${styles.paragraph} p-5 mt-3 sm:min-w-[25%] min-w-[100%] border-[1px] focus:border-white hover:border-white border-dimWhite w-[100%] hover:bg-black bg-black rounded-[15px] `}
              >
                Zmień!
              </button>
              <div className="">{message ? <p>{message}</p> : null}</div>
              <Link
              to="/home/my-account"
              className={`${styles.paragraph} my-1 cursor-pointer opacity-50`}
              >
              Powrót
              </Link>
              </form>
              ) : (
                <div className={`${styles.paragraph} my-48 xs:my-auto text-dimWhite`}>
                  Nie masz uprawnień do wyświetlania tej strony!
                </div>
              )
              )}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
