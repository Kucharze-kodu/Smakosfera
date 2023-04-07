import Navbar from "./Navbar";
import { styles } from "../style";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-full flex flex-col h-full bg-fill bg-[url('./assets/background.jpg')]">
      <Navbar />
      <div
        className={`${styles.heading} text-center h-full w-full p-16 sm:p-28`}
      >
        Error 404 - nie znaleziono strony
        <div className={`${styles.paragraph} my-8`}>
          <Link to="/" className="hover:text-gray-400">Wróc do strony głównej</Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
