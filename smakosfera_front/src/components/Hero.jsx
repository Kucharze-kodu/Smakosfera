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
        <Link to="/login">
          <Button text="Zaloguj się!" padding="p-4" margin="mx-2" color="text-red border-red hover:border-orange-600"/>
        </Link>
        <Link to="/register">
          <Button text="Zarejestruj się!" padding="p-4" margin="mx-2" color="text-red border-red hover:border-orange-600"/>
        </Link>
      </div>
      <Link to="/home" className={`${styles.paragraph} text-dimWhite hover:text-white my-1 opacity-60`}>
        Wejdź na stronę!
      </Link>
    </div>
  );
};

export default Hero;
