import { styles } from "../style";
import { Link, useParams } from "react-router-dom";
import { logo } from "../assets";
import { useState } from "react";
import axios from 'axios';
import { urlResetPassword2 } from "../endpoints";

const whiteSpaceText = '\u00A0';

const ResetPasswordForm = () => {
  const[password, setPassword] = useState("");
  const[confirmPassword, setConfrimPassword] = useState("");
  const[message, setMessage] = useState("");
  const[isPopupOpen, setIsPopupOpen] = useState(false);
  const{token} = useParams();

    let handleSubmit = async (e) => {
      e.preventDefault();
      const newPasswordObj = {
        newPassword: password,
        confirmNewPassword: confirmPassword,
      };
      axios
        .post(urlResetPassword2 + token, newPasswordObj,{
          headers: {
            Authorization:{
                "Content-Type": "application/json",
              }
            }
        })
        .then((response) => {
          console.log(response.data);
          setIsPopupOpen(true);
        })
        .catch((error) => {
          console.log("Błąd: ", error);
          setMessage("Coś poszło nie tak!");
        })
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
                    Hasło zostało zmienione pomyślnie!
                    </div>
                </div>
                    <div style={{ lineHeight: '1.75' }} className={`${styles.heading5}`}>
                      {whiteSpaceText}
                    </div>
                <div className="link-container">
                  <Link
                    to="/login"
                    className={`${styles.paragraph} p-5 mt-3 sm:min-w-[25%] min-w-[100%] border-[1px] focus:border-white hover:border-white border-dimWhite w-[100%] hover:bg-black bg-black rounded-[15px] `}
                  >
                    OK
                  </Link>
                </div>
              </div>
            </div>
          ) : (
        <form onSubmit={handleSubmit} className="flex flex-col w-[75%] ">
        <div className={`${styles.heading4} text-white `}>Zmień hasło!</div>
        <input
                type="password"
                value={password}
                id="password2"
                name="password"
                title="Nowe hasło:"
                className={`${styles.paragraph3} bg-dark border-[1px] text-left pl-2 mr-1 mt-3 border-dimWhite w-[100%] text-black hover:text-white focus:text-white hover:bg-black focus:bg-black`}
                placeholder="Nowe hasło:"
                maxLength={256}
                required
                onChange={(e) => setPassword(e.target.value)}
            ></input>
        <input
              type="password"
              value={confirmPassword}
              id="password3"
              name="password"
              title="Powtórz nowe hasło:"
              className={`${styles.paragraph3} bg-dark border-[1px] text-left pl-2 mr-1 mt-3 border-dimWhite w-[100%] text-black hover:text-white focus:text-white hover:bg-black focus:bg-black`}
              placeholder="Powtórz nowe hasło:"
              maxLength={256}
              required
              onChange={(e) => setConfrimPassword(e.target.value)}
            ></input>
            <button
                type="submit"
                className={`${styles.paragraph} p-5 mt-3 sm:min-w-[25%] min-w-[100%] border-[1px] focus:border-white hover:border-white border-dimWhite w-[100%] hover:bg-black bg-black rounded-[15px] `}
              >
                Zmień!
              </button>
              <div className="">{message ? <p>{message}</p> : null}</div>
              <Link
              to="/login"
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

export default ResetPasswordForm;
