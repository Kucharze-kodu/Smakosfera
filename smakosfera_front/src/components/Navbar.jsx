import { logo } from "../assets";

const Navbar = () => {
  return (
    <nav className="top-0 ">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center">
            <div className="m-5 h-[25%] sm:w-[20%] w-[75%]">
                <img src={logo} />
            </div>
        </div>
    </nav>
    
  );
};

export default Navbar;
