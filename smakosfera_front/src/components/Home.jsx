import { Footer, Button } from "../components";
import { styles } from "../style";
import { logo, avatar } from "../assets";
import { BiHome, BiUser, BiHeartCircle, BiPlusCircle, BiLogOut } from "react-icons/bi";
import { Route, Routes, Link } from "react-router-dom";
import { Suspense, lazy } from "react";

const Recipes = lazy(() => import("./Recipes"))
const MyAccount = lazy(() => import("./MyAccount"))
const Favorites = lazy(() => import("./Favorites"))
const AddRecipe = lazy(() => import("./AddRecipe"))
const LoadingScreen = lazy(() => import("./LoadingScreen"))

const Home = () => {
  return (
    <div className={`${styles.background} py-5 px-5 overflow-auto`}>
      <div className="flex xs:h-[95%] h-[90%] ">
        <div className="flex xs:flex-row flex-col border-[2px] border-dimWhite">
          
          {/* Logout (only for phones)*/}
          <div
              className={`flex xs:hidden h-[0%] pt-2 pr-2 justify-end ${styles.heading} text-dimWhite`}
            >
                <BiLogOut />
            </div>

          {/* Logo (only for phones) */}
          <div className="xs:hidden flex justify-center h-[25%] border-b-[1px] border-b-dimWhite">
              <img src={logo} className="h-[100%] p-5" />
          </div>
          {/* Sidebar */}
          <div className="hidden xs:block w-[20%] border-r-[1px] border-r-dimWhite">
              <img src={logo} className="p-5 border-b-[1px] border-b-dimWhite" />
            <img src={avatar} className="w-[75%] mx-auto" />
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
          </div>
          <div className="flex flex-col xs:w-[80%] overflow-y-scroll">
            {/* Logout */}
            <div
              className={`xs:flex hidden h-[10%] p-5 ${styles.paragraph} justify-end items-center border-b-[1px] border-b-dimWhite`}
            >
              Wyloguj się...
            </div>

            <Routes>
              <Route path="/" element={<Suspense fallback={<LoadingScreen />}> <Recipes /> </Suspense>}></Route>
              <Route path="my-account" element={<Suspense fallback={<LoadingScreen />}> <MyAccount /> </Suspense>}></Route>
              <Route path="favorites" element={<Suspense fallback={<LoadingScreen />}> <Favorites /> </Suspense>}></Route>
              <Route path="add-recipe" element={<Suspense fallback={<LoadingScreen />}> <AddRecipe /> </Suspense>}></Route>
            </Routes>
          </div>
        </div>
      </div>

      {/* Bottom navbar (only for phones) */}
      <div className={`${styles.heading} text-dimWhite xs:hidden h-[10%]`}>
        <div className="flex flex-row items-center justify-between border-[2px] p-2 border-dimWhite">
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

      {/* Footer */}
      <div className="hidden xs:flex xs:align-center xs:justify-center xs:h-[5%] pt-5">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
