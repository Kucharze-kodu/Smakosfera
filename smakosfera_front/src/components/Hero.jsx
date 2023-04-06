import { styles } from "../style";
import Button from "./Button";
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center text-center h-[50%]">
      <TypeAnimation 
        sequence ={[
          1000,
          'Witaj!',
          1500,
          'Szukasz wymarzonego przepisu?',
          3000,
          'U nas go znajdziesz!',
          3000,
          'Zapraszamy!'
        ]}
        speed = {50}
        deletionSpeed = {50}
        cursor = {false}
        className={`${styles.heading} my-12  text-white`}
      /> 
      <div className="flex flex-row">
        <Button text="Zaloguj się!" />
        <Button text="Zarejestruj się!" />
      </div>
      <a className={`${styles.paragraph} my-1 cursor-pointer opacity-50`}>Kontynuuj bez zalogowania</a>
    </div>
  );
};

export default Hero;
