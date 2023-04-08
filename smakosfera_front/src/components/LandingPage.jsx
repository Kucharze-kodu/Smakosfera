import Navbar from "./Logo";
import Hero from "./Hero";
import { styles } from "../style";

const LandingPage = () => {
  return (
    <div className={`${styles.background}`}>
      <Navbar />
      <Hero />
    </div>
  );
};

export default LandingPage;
