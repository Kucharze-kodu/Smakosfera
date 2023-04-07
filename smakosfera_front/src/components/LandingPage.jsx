import Navbar from "./Navbar";
import Hero from "./Hero";

const LandingPage = () => {
  return (
    <div className="w-full h-full bg-fill bg-[url('./assets/background.jpg')]">
      <Navbar />
      <Hero />
    </div>
  );
};

export default LandingPage;
