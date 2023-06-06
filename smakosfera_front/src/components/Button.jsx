import PropTypes from "prop-types";
import { styles } from "../style";

const Button = ({ text, padding, margin, color, onClick }) => {
  return (
    <div
      type="button"
      onClick={onClick}
      className={`${styles.paragraph} ${padding} ${margin} ${color} text-center rounded-lg border-[2px]  cursor-pointer `}
    >
      {text}
    </div>
  );
};
Button.propTypes = {
  text: PropTypes.string.isRequired,
  padding: PropTypes.string.isRequired,
  margin: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Button;
