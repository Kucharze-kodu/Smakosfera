import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

// lazyLoading, dynamiczne ładowanie komponentów tylko wtedy, gdy są potrzebne
const LandingPage = lazy(() => import("./components/LandingPage"))
const LoginForm = lazy(() => import("./components/LoginForm"))
const RegisterForm = lazy(() => import("./components/RegisterForm"))
const LoadingScreen = lazy(() => import("./components/LoadingScreen"))
const PageNotFound = lazy(() => import("./components/PageNotFound"))
const Home = lazy(() => import("./components/Home"))
const Logout = lazy(() => import("./components/Logout"))
const ResetPasswordForm = lazy(() => import("./components/ResetPasswordForm"))
const EmailResetPassword = lazy(() => import("./components/EmailResetPasswordForm"))
const ChangeEmailForm = lazy(() => import("./components/ChangeEmailForm"))
const ChangeNameForm = lazy(() => import("./components/ChangeNameForm"))
const ChangePasswordForm = lazy(() => import("./components/ChangePasswordForm"))

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={<LoadingScreen />}><LandingPage /></Suspense>} />
      <Route path="register" element={<Suspense fallback={<LoadingScreen />}><RegisterForm /></Suspense>} />
      <Route path="login" element={<Suspense fallback={<LoadingScreen />}> <LoginForm /> </Suspense>} />
      <Route path="home/*" element={<Suspense fallback={<LoadingScreen />}> <Home /> </Suspense>}>  </Route>
      <Route path="*" element={<Suspense fallback={<LoadingScreen />}> <PageNotFound /> </Suspense>}>  </Route>
      <Route path="logout" element={<Suspense fallback={<LoadingScreen />}> <Logout /> </Suspense>}>  </Route>
      <Route path="changename" element={<Suspense fallback={<LoadingScreen />}> <ChangeNameForm /> </Suspense>}>  </Route>      
      <Route path="changeemail" element={<Suspense fallback={<LoadingScreen />}> <ChangeEmailForm /> </Suspense>}>  </Route>      
      <Route path="emailresetpassword" element={<Suspense fallback={<LoadingScreen />}> <EmailResetPassword /> </Suspense>}>  </Route>
      <Route path="resetpassword/:token" element={<Suspense fallback={<LoadingScreen />}> <ResetPasswordForm /> </Suspense>}>  </Route>
      <Route path="changepassword" element={<Suspense fallback={<LoadingScreen />}> <ChangePasswordForm /> </Suspense>}>  </Route>
    </Routes>
  );
};

export default App;
