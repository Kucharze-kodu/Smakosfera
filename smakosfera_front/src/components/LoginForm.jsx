import { styles } from "../style";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { urlLogin } from "../endpoints";
import { useCookies } from "react-cookie";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const [cookieName, setCookieName] = useCookies(["resJson_name"]);
  const [cookiePermission, setCookiePermission] = useCookies(["resJson_permission"]);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(urlLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      let resJson = await res.json();

      // current time
      const currentDate = new Date();
      // current time + 30 days
      const expirationDate = new Date(
        currentDate.getTime() + 24 * 60 * 60 * 1000 * 30
      );
      setCookieName("resJson_name", resJson.name, {
        path: "/",
        expires: expirationDate,
      });
      setCookiePermission("resJson_permission", resJson.permissionName, {
        path: "/",
        expires: expirationDate,
      });

      if (res.status === 200) {
        setEmail("");
        setPassword("");
        setMessage("Sukces!");

        navigate("/home");
      } else {
        setErrorMessage("Nieprawidłowy login lub hasło!");
      }
    } catch (err) {
      setErrorMessage("Nieprawidłowy login lub hasło!");
      console.log(err);
    }
  };

  return (
    <div className={`${styles.background} flex flex-row items-center`}>
      <div className="flex md:flex-row flex-col h-[90%] md:h-[75%] w-full border-[2px] border-white mx-5 lg:mx-48">
        <Link to="/" className="w-full">
          <div className="flex items-center md:items-top justify-center  md:h-full border-b-[1px] md:border-b-[0px] border-r-[0px] md:border-r-[1px] border-r-dimWhite border-b-dimWhite ">
            <img className="sm:p-24 md:p-16 p-12" src={logo} />
          </div>
        </Link>

        <div className="overflow-auto flex flex-col p-3 items-center w-full h-full justify-center xs:justify-start md:my-10 text-center">
          <div className={`${styles.heading2} text-white`}>Zaloguj się!</div>
          <form onSubmit={handleSubmit} className="flex flex-col w-[75%]">
            <input
              type="email"
              value={email}
              id="email"
              name="email"
              title="Wprowadź email :)"
              className={`${styles.paragraph} text-black bg-dark border-[1px] text-left pl-2 mt-3 border-dimWhite w-[100%] hover:bg-black hover:text-white focus:text-white focus:bg-black`}
              placeholder="Email:"
              maxLength={100}
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              value={password}
              id="password"
              name="password"
              title="Wprowadź hasło :)"
              className={`${styles.paragraph} bg-dark border-[1px] text-left pl-2 mt-3 border-dimWhite w-[100%] hover:bg-black text-black hover:text-white focus:text-white focus:bg-black`}
              placeholder="Hasło:"
              maxLength={250}
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button
              type="submit"
              className={`${styles.paragraph} p-5 mt-3 sm:min-w-[25%] min-w-[100%] text-dimWhite hover:text-white border-[1px] focus:border-white hover:border-white border-dimWhite w-[100%] hover:bg-black bg-black rounded-[15px] `}
            >
              Wyślij!
            </button>
            <div className={`${styles.paragraph} text-green-600`}>
              {message ? <p>{message}</p> : null}
            </div>
            <div className={`${styles.paragraph} text-red`}>
              {errorMessage ? <p>{errorMessage}</p> : null}
            </div>
          </form>
          <Link
            to="/register"
            className={`${styles.paragraph} my-1 cursor-pointer opacity-50 text-dimWhite hover:text-white`}
          >
            Nie masz konta?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
