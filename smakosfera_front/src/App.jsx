import axios from "axios";
import { useEffect } from "react";
import React from "react";

const App = () => {
  useEffect(() => {
    axios.get("https://localhost:7031/WeatherForecast").then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <div className="">
      <h1>elo</h1>
      <p>Communcationg with ASP.NET Core</p>
    </div>
  );
};

export default App;
