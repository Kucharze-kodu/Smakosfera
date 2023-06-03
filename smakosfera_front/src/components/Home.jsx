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
import { Route, Routes, Link } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useAuth } from "./AuthContext";

const Recipes = lazy(() => import("./Recipes"));
const MyAccount = lazy(() => import("./MyAccount"));
const Favorites = lazy(() => import("./Favorites"));
const AddRecipe = lazy(() => import("./AddRecipe"));
const LoadingScreen = lazy(() => import("./LoadingScreen"));
const AddIngredniet = lazy(() => import("./AddIngredient"));

const Home = () => {
  // Check if user is logged in
  const {isLoggedIn} = useAuth();
  const {handleLogout} = useAuth();
  const {getResJsonName} = useAuth();

  return (
    <div
      className={`${styles.background} xs:py-5 xs:px-5 overflow-y-scroll xs:overflow-hidden`}
    >
      <div className="flex xs:h-[95%] h-full">
        <div className=" flex xs:flex-row flex-col xs:border-[2px] border-dimWhite">
          {/* Logout (only for phones)*/}
          {isLoggedIn() && (
            <div
              onClick={handleLogout}
              className={`z-0 flex xs:hidden h-[0%] pt-2 pr-2 justify-end ${styles.heading} text-dimWhite`}
            >
              <BiLogOut />
            </div>
          )}

          {/* Logo (only for phones) */}
          <div className="z-1 xs:hidden flex justify-center h-[25%] border-b-[1px] border-b-dimWhite">
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
                className="p-5 top-0 sticky border-b-[1px] border-b-dimWhite"
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
            <Link to="/home/add-ingredient">
              {isLoggedIn() && (
                <Button
                  text="Dodaj nowy składnik"
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
                      {getResJsonName()}!
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
              <Route
                path="add-ingredient"
                element={
                  <Suspense fallback={<LoadingScreen />}>
                    {" "}
                    <AddIngredniet />{" "}
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
          className={`${styles.heading} fixed bottom-0 bg-black text-white xs:hidden h-[10%]`}
        >
          <div className="flex flex-row items-center justify-between h-full px-5">
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
