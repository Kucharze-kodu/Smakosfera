import axios from "axios";
import { useEffect } from "react";
import { urlWeather } from "./endpoints";
import { Navbar, Hero } from "./components";
import { background } from "./assets";

const App = () => {
  useEffect(() => {
    axios.get(urlWeather).then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <div className="w-full h-full bg-fill bg-[url('./assets/background.jpg')]">
      <Navbar />
      <Hero />
    </div>
  );
};

export default App;
