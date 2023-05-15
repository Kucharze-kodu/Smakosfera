import Logo from "./Logo";
import Hero from "./Hero";
import { styles } from "../style";

const LandingPage = () => {
  return (
    <div className={`${styles.background}`}>
      <Logo />
      <Hero />
    </div>
  );
};

export default LandingPage;
