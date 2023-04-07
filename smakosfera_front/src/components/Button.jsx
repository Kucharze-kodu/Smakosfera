import PropTypes from "prop-types";
import { styles } from "../style";

const Button = ({ text }) => {
  return (
    <div
      type="button"
      className={`${styles.paragraph} rounded-[10px] text-red border-[2px] border-red hover:border-orange-600  mx-2 cursor-pointer p-6`}
    >
      {text}
    </div>
  );
};
Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
