import Logo from "./Logo";
import { styles } from "../style";
import { Link } from "react-router-dom";

const Logout = () => {
  return (
    <div className={`${styles.background} `}>
      <Logo />
      <div
        className={`${styles.heading}  text-white text-center py-16 sm:py-28`}
      >
        Zostałeś wylogowany!
        <div className={`${styles.paragraph} my-2`}>
          <Link to="/" className="text-dimWhite hover:text-white">Wróc do strony głównej</Link>
        </div>
      </div>
    </div>
  );
};

export default Logout;
