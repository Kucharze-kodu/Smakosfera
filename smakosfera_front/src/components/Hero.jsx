import { styles } from "../style";
import Button from "./Button";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center text-center h-[50%]">
      <TypeAnimation
        sequence={[
          1000,
          "Witaj!",
          1500,
          "Szukasz wymarzonego przepisu?",
          3000,
          "U nas go znajdziesz!",
          3000,
          "Zapraszamy!",
        ]}
        speed={50}
        deletionSpeed={50}
        cursor={false}
        className={`${styles.heading} my-12 text-white`}
      />
      <div className="flex flex-row">
        <Link to="/LoginForm">
          <Button text="Zaloguj się!" />
        </Link>
        <Link to="/RegisterForm">
          <Button text="Zarejestruj się!" />
        </Link>
      </div>
      <Link to="/" className={`${styles.paragraph} hover:text-gray-400 my-1 opacity-60`}>
        Kontynuuj bez zalogowania
      </Link>
    </div>
  );
};

export default Hero;
