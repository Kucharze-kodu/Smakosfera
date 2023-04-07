import axios from "axios";
import { useEffect } from "react";
import { urlWeather } from "./endpoints";
import { Navbar, Hero, RegisterForm } from "./components";

const App = () => {
  useEffect(() => {
    axios.get(urlWeather).then((response) => {
      console.log(response.data);
    });
  }, []);


  {/*<div className="w-full h-full bg-fill bg-[url('./assets/background.jpg')]">
      <Navbar />
      <Hero />
  </div>*/}

  return (
    <div className="w-full h-full flex flex-row items-center bg-fill bg-[url('./assets/background.jpg')]">
      <RegisterForm />
    </div>
    
  );
};

export default App;
