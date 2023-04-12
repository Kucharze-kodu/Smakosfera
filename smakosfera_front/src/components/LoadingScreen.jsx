import Logo from "./Logo";
import { styles } from "../style";

const LoadingScreen = () => {
  return (
    <div className={`${styles.background}`}>
      <Logo />
      <div
        className={`${styles.heading} text-center p-16 sm:p-28`}
      >
        Ładowanie strony...
      </div>
    </div>
  );
};

export default LoadingScreen;
