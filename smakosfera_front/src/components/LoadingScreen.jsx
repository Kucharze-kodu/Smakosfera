import Navbar from "./Navbar";
import { styles } from "../style";

const LoadingScreen = () => {
  return (
    <div className="overflow-auto w-full flex flex-col h-full bg-fill bg-[url('./assets/background.jpg')]">
      <Navbar />
      <div
        className={`${styles.heading} text-center h-full w-full p-16 sm:p-28`}
      >
        Ładowanie strony...
      </div>
    </div>
  );
};

export default LoadingScreen;
