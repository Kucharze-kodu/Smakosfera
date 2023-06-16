import { Footer, Button } from "../components";
import { styles } from "../style";
import axios from "axios";
import { urlRecipes } from "../endpoints";
import { logo, avatar } from "../assets";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

import {
  BiHome,
  BiUser,
  BiHeartCircle,
  BiPlusCircle,
  BiLogOut,
} from "react-icons/bi";
import { GiPerspectiveDiceFive } from "react-icons/gi";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { Suspense, lazy } from "react";

const Recipes = lazy(() => import("./Recipes"));
const MyAccount = lazy(() => import("./MyAccount"));
const Favorites = lazy(() => import("./Favorites"));
const AddRecipe = lazy(() => import("./AddRecipe"));
const LoadingScreen = lazy(() => import("./LoadingScreen"));
const RecipeDetails = lazy(() => import("./RecipeDetails"));
const AddIngredient = lazy(() => import("./AddIngredient"));
const Newsletter = lazy(() => import("./Newsletter"));
const AdminPanel = lazy(() => import("./AdminPanel"));

const Home = () => {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Check if user is logged in
  const { isLoggedIn } = useAuth();
  const { handleLogout } = useAuth();
  const { getResJsonName } = useAuth();
  const { getResJsonToken } = useAuth();
  const { getResJsonPermission } = useAuth();

  // GET recipes
  useEffect(() => {
    axios
      .get(urlRecipes, {
        headers: {
          Authorization: `Bearer ${getResJsonToken()}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setRecipes(response.data);
        setIsDataLoaded(true);
      });
  }, []);

  // Create an array of recipe IDs
  const recipeIds = recipes.map((recipe) => recipe.id);
  const handleRandomRecipe = () => {
    // Implement logic to retrieve a random recipe ID
    const randomRecipeId = getRandomRecipeId();
    // Navigate to the random recipe details page
    navigate(`/home/${randomRecipeId}`);
  };

  const getRandomRecipeId = () => {
    const randomIndex = Math.floor(Math.random() * recipeIds.length);
    return recipeIds[randomIndex];
  };

  return (
    <div className={`${styles.background} p-1 xs:p-5 overflow-auto`}>
      <div className="flex xs:flex-row flex-col xs:h-[95%] h-[90%]">
        <div className="flex xs:flex-row flex-col xs:border-[2px] xs:border-dimWhite">
          {/* Logout (only for phones)*/}
          {isLoggedIn() && (
            <div
              className={`z-0 flex xs:hidden h-[0%] pt-2 pr-2 justify-end ${styles.heading} text-dimWhite`}
              onClick={handleLogout}
            >
              <BiLogOut />
            </div>
          )}

          {/* Logo (only for phones) */}
          <div className="z-1 xs:hidden flex justify-center xs:h-[25%] h-[20%] border-b-[1px] border-b-dimWhite">
            <img src={logo} className="h-[100%] p-5" alt="Logo" />
          </div>
          {/* Sidebar */}
          <div className="sidebar pb-5 hidden xs:block overflow-y-scroll w-[20%] border-r-[1px] border-r-dimWhite">
            <img
              src={logo}
              className="p-5 border-b-[1px] border-b-dimWhite"
              alt="Logo"
            />
            <img src={avatar} className="w-[75%] mx-auto" alt="Avatar" />
            <div className="sidebar-links">
              <Link to="/home">
                <Button
                  text="Strona główna"
                  padding="p-1"
                  margin="mb-4 mx-4"
                  color="border-dimWhite hover:border-white text-dimWhite hover:text-white"
                />
              </Link>
              <Link to="/home/my-account">
                <Button
                  text="Moje konto"
                  padding="p-1"
                  margin="my-4 mx-4"
                  color="border-dimWhite hover:border-white  text-dimWhite hover:text-white"
                />
              </Link>
              <Link to="/home/favorites">
                <Button
                  text="Ulubione"
                  padding="p-1"
                  margin="my-4 mx-4"
                  color="border-dimWhite hover:border-white  text-dimWhite hover:text-white"
                />
              </Link>
              <Link to="/home/add-recipe">
                <Button
                  text="Dodaj nowy przepis"
                  padding="p-1"
                  margin="mt-4 mx-4"
                  color="border-dimWhite hover:border-white  text-dimWhite hover:text-white"
                />
              </Link>
              <div onClick={handleRandomRecipe}>
                {isLoggedIn() && (
                  <Button
                    text="Losuj przepis"
                    padding="p-1"
                    margin="mt-4 mx-4"
                    color="border-dimWhite hover:border-white  text-dimWhite hover:text-white"
                  />
                )}
              </div>
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
              <Link to="/home/newsletter">
                <Button
                  text="Zapisz do newslettera"
                  padding="p-1"
                  margin="mt-4 mx-4"
                  color="border-dimWhite hover:border-white  text-dimWhite hover:text-white"
                />
              </Link>
              { getResJsonPermission() === 'Admin' && <Link to="/home/admin-panel">
                <Button
                  text= "Panel admina"
                  padding="p-1"
                  margin="mt-4 mx-4"
                  color="border-dimWhite hover:border-white  text-dimWhite hover:text-white"
                />
              </Link>}
            </div>
          </div>
          <div className="flex flex-col xs:w-full">
            {/* Logout */}
            <div
              className={`xs:flex hidden h-[10%] p-5 ${styles.paragraph} justify-between items-center border-b-[1px] border-b-dimWhite`}
            >
              <div className={`${styles.heading3}`}>
                {isLoggedIn() ? (
                  <>
                    Witaj{" "}
                    <span className=" text-red underline underline-offset-4">
                      {getResJsonName()}!
                    </span>
                  </>
                ) : (
                  <>Witamy!</>
                )}
              </div>
              <div className="text-right w-full">
                {isLoggedIn() && (
                  <a
                    onClick={handleLogout}
                    className="text-center cursor-pointer text-dimWhite hover:text-white"
                  >
                    Wyloguj się...
                  </a>
                )}
              </div>
            </div>

            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<LoadingScreen />}>
                    {" "}
                    <Recipes
                      recipes={recipes}
                      isDataLoaded={isDataLoaded}
                    />{" "}
                  </Suspense>
                }
              ></Route>
              <Route
                path=":recipeId"
                element={
                  <Suspense fallback={<LoadingScreen />}>
                    {" "}
                    <RecipeDetails recipes={recipes} />{" "}
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
                    <AddIngredient />{" "}
                  </Suspense>
                }
              ></Route>
              <Route
                path="newsletter"
                element={
                  <Suspense fallback={<LoadingScreen />}>
                    {" "}
                    <Newsletter />{" "}
                  </Suspense>
                }
              ></Route>
              <Route
                path="admin-panel"
                element={
                  <Suspense fallback={<LoadingScreen />}>
                    {" "}
                    <AdminPanel />{" "}
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
          className={`${styles.heading} w-full fixed bottom-0 bg-black text-white xs:hidden h-[10%]`}
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
            <div onClick={handleRandomRecipe}>
              <GiPerspectiveDiceFive />
            </div>
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
