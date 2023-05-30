import Logo from "./Logo";
import { styles } from "../style";
import { Link } from "react-router-dom";

const Logout = () => {
  return (
    <div className={`${styles.background} `}>
      <Logo />
      <div
        className={`${styles.heading} text-center p-16 sm:p-28`}
      >
        Zostałeś wylogowany!
        <div className={`${styles.paragraph} my-2`}>
          <Link to="/" className="hover:text-gray-400">Wróc do strony głównej</Link>
        </div>
      </div>
    </div>
  );
};

export default Logout;
