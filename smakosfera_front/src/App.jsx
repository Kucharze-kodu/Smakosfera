import axios from "axios";
import { useEffect } from "react";
import { urlWeather } from "./endpoints";

const App = () => {
  useEffect(() => {
    axios.get(urlWeather).then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      <h1>elo</h1>
      <p>Communcationg with ASP.NET Core</p>
    </div>
  );
};

export default App;
