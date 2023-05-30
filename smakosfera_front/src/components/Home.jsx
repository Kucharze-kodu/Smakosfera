import { Footer, Button, RecipeDetails } from "../components";
import { styles } from "../style";
import { logo, avatar } from "../assets";
import {
  BiHome,
  BiUser,
  BiHeartCircle,
  BiPlusCircle,
  BiLogOut,
} from "react-icons/bi";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import useCookies from "react-cookie/cjs/useCookies";

const Recipes = lazy(() => import("./Recipes"));
const MyAccount = lazy(() => import("./MyAccount"));
const Favorites = lazy(() => import("./Favorites"));
const AddRecipe = lazy(() => import("./AddRecipe"));
const LoadingScreen = lazy(() => import("./LoadingScreen"));

const Home = () => {
  const navigate = useNavigate();

  const [resJsonName, setResJsonName] = useState(null);
  const [cookieName, setCookieName, removeCookieName] = useCookies([
    "resJson_name",
  ]);
  const [resJsonPermission, setResJsonPermission] = useState(null);
  const [cookiePermission, setCookiePermission, removeCookiePermission] =
    useCookies(["resJson_permission"]);

  useEffect(() => {
    // Read the value of resJson from cookies
    const storedResJsonName = cookieName.resJson_name;
    const storedResJsonPermission = cookiePermission.resJson_permission;
    if (storedResJsonName) {
      // If it exists, update the value in the context
      setResJsonName(storedResJsonName);
    }
    if (storedResJsonPermission) {
      setResJsonPermission(storedResJsonPermission);
    }
  }, []);

  const handleLogout = () => {
    // Remove the cookies and clear the context
    removeCookieName("resJson_name", { path: "/" });
    removeCookiePermission("resJson_permission", { path: "/" });
    setResJsonName(null);
    setResJsonPermission(null);
    navigate("/logout");
  };

  const isLoggedIn = () => {
    if (resJsonName != null && resJsonPermission != null) return true;
    else return false;
  };

  return (
    <div
      className={`${styles.background} xs:py-5 xs:px-5 overflow-y-scroll xs:overflow-hidden`}
    >
      <div className="flex xs:h-[95%] h-full">
        <div className="flex xs:flex-row flex-col xs:border-[2px] border-dimWhite">
          {/* Logout (only for phones)*/}
          {isLoggedIn() && (
            <div
              className={`flex xs:hidden h-[0%] pt-2 pr-2 justify-end ${styles.heading} text-dimWhite`}
            >
              <BiLogOut />
            </div>
          )}

          {/* Logo (only for phones) */}
          <div className="xs:hidden flex justify-center h-[25%] border-b-[1px] border-b-dimWhite">
            <Link to="/">
              <img src={logo} alt="logo" className="h-[100%] p-5" />
            </Link>
          </div>

          {/* Sidebar */}
          <div className="sidebar hidden xs:block overflow-y-scroll pb-2 w-[20%] border-r-[1px] border-r-dimWhite">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="p-5 top-0 sticky bg-black border-b-[1px] border-b-dimWhite"
              />
            </Link>
            <img src={avatar} alt="avatar" className="w-[65%] mx-auto" />
            <Link to="/home">
              <Button
                text="Strona główna"
                padding="p-1"
                margin="mb-4 mx-4"
                color="border-dimWhite hover:border-white text-dimWhite hover:text-white"
              />
            </Link>
            <Link to="/home/my-account">
              {isLoggedIn() && (
                <Button
                  text="Moje konto"
                  padding="p-1"
                  margin="my-4 mx-4"
                  color="border-dimWhite hover:border-white  text-dimWhite hover:text-white"
                />
              )}
            </Link>
            <Link to="/home/favorites">
              {isLoggedIn() && (
                <Button
                  text="Ulubione"
                  padding="p-1"
                  margin="my-4 mx-4"
                  color="border-dimWhite hover:border-white  text-dimWhite hover:text-white"
                />
              )}
            </Link>
            <Link to="/home/add-recipe">
              {isLoggedIn() && (
                <Button
                  text="Dodaj nowy przepis"
                  padding="p-1"
                  margin="mt-4 mx-4"
                  color="border-dimWhite hover:border-white  text-dimWhite hover:text-white"
                />
              )}
            </Link>
          </div>
          <div className="flex flex-col xs:w-[80%] ">
            {/* Logout */}
            <div
              className={`xs:flex justify-between hidden h-[10%] pl-5 ${styles.paragraph} justify-end items-center border-b-[1px] border-b-dimWhite`}
            >
              <div className={`${styles.heading3}`}>
                {isLoggedIn() && (
                  <>
                    Witaj{" "}
                    <span className=" text-red underline underline-offset-4">
                      {resJsonName}!
                    </span>
                  </>
                )}
                {isLoggedIn() == false && <>Witamy!</>}
              </div>
              {isLoggedIn() && (
                <a
                  onClick={handleLogout}
                  className="text-center cursor-pointer text-dimWhite hover:text-white"
                >
                  Wyloguj się...
                </a>
              )}
            </div>

            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<LoadingScreen />}>
                    {" "}
                    <Recipes />{" "}
                  </Suspense>
                }
              ></Route>
              <Route
                path=":recipeId"
                element={
                  <Suspense fallback={<LoadingScreen />}>
                    {" "}
                    <RecipeDetails />{" "}
                  </Suspense>
                }
              ></Route>
              <Route
                path="my-account"
                element={
                  <Suspense fallback={<LoadingScreen />}>
                    {" "}
                    <MyAccount />{" "}
                  </Suspense>
                }
              ></Route>
              <Route
                path="favorites"
                element={
                  <Suspense fallback={<LoadingScreen />}>
                    {" "}
                    <Favorites />{" "}
                  </Suspense>
                }
              ></Route>
              <Route
                path="add-recipe"
                element={
                  <Suspense fallback={<LoadingScreen />}>
                    {" "}
                    <AddRecipe />{" "}
                  </Suspense>
                }
              ></Route>
            </Routes>
          </div>
        </div>
      </div>

      {/* Bottom navbar (only for phones) */}
      {isLoggedIn() && (
        <div
          className={`${styles.heading} fixed bottom-0 bg-black text-dimWhite xs:hidden h-[10%]`}
        >
          <div className="flex flex-row items-center justify-between border-[2px] h-full px-5 border-dimWhite">
            <Link to="/home">
              <BiHome />
            </Link>
            <Link to="/home/my-account">
              <BiUser />
            </Link>
            <Link to="/home/favorites">
              <BiHeartCircle />
            </Link>
            <Link to="/home/add-recipe">
              <BiPlusCircle />
            </Link>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="hidden xs:flex xs:align-center xs:justify-center xs:h-[5%] pt-5">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
