import { styles } from "../style";
import { Link } from "react-router-dom";
import { logo } from "../assets";

const RegisterForm = () => {
  return (
    <div className="w-full h-full flex flex-row items-center bg-fill bg-[url('./assets/background.jpg')]">
      <div className="flex md:flex-row flex-col h-[90%] md:h-[75%] w-full border-[2px] border-[white] mx-5 lg:mx-48">
        <Link to="/" className="w-full h-full">
          <div className="w-full h-full flex items-center md:items-top justify-center  md:h-full border-b-[1px] md:border-b-[0px] border-r-[0px] md:border-r-[1px] border-r-[dimWhite] border-b-[dimWhite] ">
            <img className="h-[80%] md:h-[40%] p-5 " src={logo} />
          </div>
        </Link>
        <div className="flex flex-col p-3 items-center w-full h-full justify-top md:my-10 text-center">
          <div className={`${styles.heading2}`}>Zarejestruj się!</div>
          <form className="flex flex-col w-[75%]">
            <div className="flex flex-row">
              <input
                type="text"
                id="name"
                name="surname"
                title="Wprowadź imie :)"
                className={`${styles.paragraph} bg-dark border-[1px] text-left pl-2 mr-1 mt-3 border-dimWhite w-[100%] hover:bg-black focus:bg-black`}
                placeholder="Imię:"
                maxLength={50}
                required
              ></input>
              <input
                type="text"
                id="name"
                name="surname"
                title="Wprowadź nazwisko :)"
                className={`${styles.paragraph} bg-dark border-[1px] text-left pl-2 ml-1 mt-3  border-dimWhite w-[100%] hover:bg-black focus:bg-black`}
                placeholder="Nazwisko:"
                maxLength={50}
                required
              ></input>
            </div>
            <input
              type="text"
              id="login"
              name="login"
              title="Wprowadź login :)"
              className={`${styles.paragraph} bg-dark border-[1px] text-left pl-2 mt-3 mt-2border-dimWhite w-[100%] hover:bg-black focus:bg-black`}
              placeholder="Login (nick):"
              maxLength={100}
              required
            ></input>
            <input
              type="password"
              id="password"
              name="password"
              title="Wprowadź hasło :)"
              className={`${styles.paragraph} bg-dark border-[1px] text-left pl-2 mt-3 border-dimWhite w-[100%] hover:bg-black ] focus:bg-black`}
              placeholder="Hasło:"
              maxLength={250}
              required
            ></input>
            <input
              type="email"
              id="email"
              name="email"
              title="Wprowadź email :)"
              className={`${styles.paragraph} bg-dark border-[1px] text-left pl-2 mt-3 border-dimWhite w-[100%] hover:bg-black focus:bg-black`}
              placeholder="Email:"
              maxLength={250}
              required
            ></input>
            <button
              type="submit"
              className={`${styles.paragraph} p-5 mt-3 sm:min-w-[25%] min-w-[100%] border-[1px] focus:border-white hover:border-white border-dimWhite w-[100%] hover:bg-black bg-black rounded-[15px] `}
            >
              Wyślij!
            </button>
          </form>
          <Link to="/LoginForm">
            <a className={`${styles.paragraph} my-1 cursor-pointer opacity-50`}>
              Masz już konto?
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
