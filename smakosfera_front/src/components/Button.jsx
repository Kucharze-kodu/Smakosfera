import PropTypes from "prop-types";

const Button = ({ text }) => {
  return (
    <div
      type="button"
      className="rounded-[10px] hover:border-orange-600 text-red border-red border-[2px] mx-2 border-solid cursor-pointer z-[1] p-6 font-poppins text-[18px] button-red"
    >
      {text}
    </div>
  );
};
Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
