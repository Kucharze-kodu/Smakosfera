import { styles } from "../style";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { useState } from "react";
import { urlRegister } from "../endpoints";

const whiteSpaceText = '\u00A0';

const RegisterForm = () => {
  const[name, setName] = useState("");
  const[surname, setSurname] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[confirmPassword, setConfirmPassword] = useState("");
  const[message, setMessage] = useState("");
  const[isPopupOpen, setIsPopupOpen] = useState(false);
  
  let handleSubmit = async (e) => {
    
    e.preventDefault();
    try{
      let res = await fetch(urlRegister, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          surname: surname,
          email: email,
          password: password,
          confirmPassword: confirmPassword
        }),
      });

      // let resJson = await res.json();
      
      if(res.status === 200){
        setName("");
        setSurname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setMessage("");
        setIsPopupOpen(true);
      }
      else{
        setMessage("Email jest już zajęty lub hasła się nie zgadzają!");
      }
    }
     catch (error) {
    }
  };
  
  const closePopup = () => {
    setIsPopupOpen(false);
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
                    Aktywuj konto poprzez link aktywacyjny wysłany na adres
                    email, a następnie zaloguj się.
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
            <div className={`${styles.heading4} text-white `}>Zarejestruj się!</div>
            <input
              type="text"
              value={name}
              id="name"
              name="name"
              title="Imię:"
              className={`${styles.paragraph3} bg-dark border-[1px] text-left pl-2 mr-1 mt-3 border-dimWhite w-[100%] text-black   hover:text-white focus:text-white hover:bg-black focus:bg-black`}
              placeholder="Imię:"
              maxLength={50}
              required
              onChange={(e) => setName(e.target.value)}
            ></input>
            <input
              type="text"
              value={surname}
              id="surname"
              name="surname"
              title="Nazwisko:"
              className={`${styles.paragraph3} bg-dark border-[1px] text-left pl-2 mr-1 mt-3 border-dimWhite w-[100%] text-black hover:text-white hover:bg-black focus:text-white focus:bg-black text-black`}
              placeholder="Nazwisko:"
              maxLength={50}
              required
              onChange={(e) => setSurname(e.target.value)}
            ></input>
            <input
              type="email"
              value={email}
              id="email"
              name="email"
              title="Email:"
              className={`${styles.paragraph3} bg-dark border-[1px] text-left pl-2 mr-1 mt-3 border-dimWhite w-[100%] text-black hover:text-white focus:text-white hover:bg-black focus:bg-black`}
              placeholder="Email:"
              maxLength={256}
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              value={password}
              id="password"
              name="password"
              title="Hasło:"
              className={`${styles.paragraph3} bg-dark border-[1px] text-left pl-2 mr-1 mt-3 border-dimWhite w-[100%] text-black hover:text-white focus:text-white hover:bg-black focus:bg-black`}
              placeholder="Hasło:"
              maxLength={32}
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <input
              type="password"
              value={confirmPassword}
              id="confirmPassword"
              name="confirmPassword"
              title="Powtórz hasło:"
              className={`${styles.paragraph3} bg-dark border-[1px] text-left pl-2 mr-1 mt-3 border-dimWhite w-[100%] text-black hover:text-white focus:text-white hover:bg-black focus:bg-black`}
              placeholder="Powtórz hasło:"
              maxLength={256}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
            <button
                type="submit"
                className={`${styles.paragraph} p-5 mt-3 sm:min-w-[25%] min-w-[100%] border-[1px] focus:border-white hover:border-white border-dimWhite w-[100%] hover:bg-black bg-black rounded-[15px] `}
              >
                Wyślij!
              </button>
              <div className="">{message ? <p>{message}</p> : null}</div>
              <Link
              to="/login"
              className={`${styles.paragraph} my-1 cursor-pointer opacity-50`}
              >
              Masz już konto?
              </Link>
            </form>
          )}



        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
