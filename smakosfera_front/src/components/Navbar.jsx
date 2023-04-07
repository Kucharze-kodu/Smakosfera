import { logo } from "../assets";

const Navbar = () => {
  return (
    <div>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center">
            <div className="m-5 h-[25%] sm:w-[50%] md:w-[20%] w-[75%]">
                <img src={logo} />
            </div>
        </div>
    </div>
    
  );
};

export default Navbar;
