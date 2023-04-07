import Button from "./Button";
import { logo } from "../assets";
import { styles } from "../style";

const RegisterForm = () => {
  return (
    <div className="flex ss:flex-row flex-col h-[75%] w-full border-[2px] border-[white] mx-5 lg:mx-48">
      <div className="flex items-center justify-center w-full h-[40%] ss:h-full border-b-[1px] ss:border-b-[0px] border-r-[0px] ss:border-r-[1px] border-r-[dimWhite] border-b-[dimWhite] ">
        <img className="h-[60%] ss:h-[25%] " src={logo} />
      </div>
      <div className="flex flex-col justify-top my-5 ss:my-10 p-2 items-center w-full h-full text-center">
        <div className={`${styles.heading2}`}>Zarejestruj się!</div>
        <div className={`${styles.paragraph}`}>Wprowadź swoje dane</div>
        <form className="flex flex-col my-5">
          <input type="text"
                 id="name"
                 title="Wprowadź imie"
                 className="bg-dark text-dimwhite border-[2px] border-dimWhite w-[50%]"
                 required focus:ring-0 
          ></input>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
