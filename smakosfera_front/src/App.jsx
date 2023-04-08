import axios from "axios";
import { useEffect, lazy } from "react";
import { urlWeather } from "./endpoints";
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

// lazyLoading, dynamiczne ładowanie komponentów tylko wtedy, gdy są potrzebne
const LandingPage = lazy(() => import("./components/LandingPage"))
const LoginForm = lazy(() => import("./components/LoginForm"))
const RegisterForm = lazy(() => import("./components/RegisterForm"))
const LoadingScreen = lazy(() => import("./components/LoadingScreen"))
const PageNotFound = lazy(() => import("./components/PageNotFound"))
const Home = lazy(() => import("./components/Home"))


const App = () => {
  // fetchowanie z backendu
  useEffect(() => {
    axios.get(urlWeather).then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={<LoadingScreen />}><LandingPage /></Suspense>} />
      <Route path="register" element={<Suspense fallback={<LoadingScreen />}><RegisterForm /></Suspense>} />
      <Route path="login" element={<Suspense fallback={<LoadingScreen />}><LoginForm /></Suspense>} />
      <Route path="home" element={<Suspense fallback={<LoadingScreen />}> <Home /> </Suspense>}>  </Route>
      <Route path="*" element={<Suspense fallback={<LoadingScreen />}> <PageNotFound /> </Suspense>}>  </Route>
    </Routes>
  );
};

export default App;
