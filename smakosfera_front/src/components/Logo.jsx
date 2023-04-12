import { logo } from "../assets";

const Logo = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center">
      <div className="p-5 h-[25%] w-[75%] sm:w-[50%] md:w-[20%]">
        <img src={logo} />
      </div>
    </div>
  );
};

export default Logo;
