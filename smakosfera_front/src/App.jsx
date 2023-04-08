import axios from "axios";
import { useEffect, lazy } from "react";
import { urlWeather } from "./endpoints";
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

// lazyLoading, dynamiczne ładowanie komponentów tylko wtedy, gdy są potrzebne
const LandingPage = lazy(() => wait(1000).then(() => import("./components/LandingPage")))
const LoginForm = lazy(() => wait(1000).then(() => import("./components/LoginForm")))
const RegisterForm = lazy(() => wait(1000).then(() => import("./components/RegisterForm")))
const LoadingScreen = lazy(() => import("./components/LoadingScreen"))
const PageNotFound = lazy(() => import("./components/PageNotFound"))

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
      <Route path="RegisterForm" element={<Suspense fallback={<LoadingScreen />}><RegisterForm /></Suspense>} />
      <Route path="LoginForm" element={<Suspense fallback={<LoadingScreen />}><LoginForm /></Suspense>} />
      <Route path="*" element={<Suspense fallback={<LoadingScreen />}> <PageNotFound /> </Suspense>}>  </Route>
    </Routes>
  );
};

// zasymulowanie opóźnienia internetowego podczas ładowania strony
function wait(time) {
  return new Promise (resolve => {
    setTimeout(resolve, time)
  })
}

export default App;
