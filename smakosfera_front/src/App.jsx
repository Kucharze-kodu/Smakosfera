import axios from "axios";
import { useEffect } from "react";
import { urlWeather } from "./endpoints";
import { LandingPage, PageNotFound, RegisterForm, LoginForm } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  useEffect(() => {
    axios.get(urlWeather).then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="RegisterForm" element={<RegisterForm />} />
        <Route path="LoginForm" element={<LoginForm />} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
};

export default App;
