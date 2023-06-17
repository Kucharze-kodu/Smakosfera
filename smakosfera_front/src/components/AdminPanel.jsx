import { useEffect, useState } from "react";
import { styles } from "../style";
import Button from "./Button";
import ShowUsers from "./ShowUsers";
import { useAuth } from "./AuthContext";
import { Route, Routes, Link, useNavigate, useLocation } from "react-router-dom";
import { Suspense } from "react";
import LoadingScreen from "./LoadingScreen";
import ShowUserInfo from "./ShowUserInfo";
import ShowNotAcceptedRecipes from "./ShowNotAcceptedRecipes";
import ShowNotAcceptedRecipeInfo from "./ShowNotAcceptedRecipeInfo";

const AdminPanel = ({resetHideButton, setResetHideButton}) => {
  const location = useLocation();

  const { getResJsonPermission } = useAuth();

  const [hideButton, setHideButton] = useState(false);

  useEffect(()=>{
    if(resetHideButton){
      setHideButton(false);
      setResetHideButton(false);
    }
    
  }, [resetHideButton]);

  return (
    <>
      {getResJsonPermission() === "Admin" ? (
        <>
          {!hideButton && (
            <Link to="users">
              <Button
                onClick={() => setHideButton(true)}
                text="Pokaż użytkowników"
                padding="p-1"
                margin="mt-4 mx-4"
                color="border-dimWhite hover:border-white  text-dimWhite hover:text-white"
              />
            </Link>
          )}
          {!hideButton && (
            <Link to="recipes">
              <Button
                onClick={() => setHideButton(true)}
                text="Pokaż niezaakceptowane przepisy"
                padding="p-1"
                margin="mt-4 mx-4"
                color="border-dimWhite hover:border-white  text-dimWhite hover:text-white"
              />
            </Link>
          )}
          <Routes>
            <Route
              path="users"
              element={
                <Suspense fallback={<LoadingScreen />}>
                  {" "}
                  <ShowUsers button={setHideButton} />{" "}
                </Suspense>
              }
            ></Route>
            <Route
              path="users/:userId"
              element={
                <Suspense fallback={<LoadingScreen />}>
                  {" "}
                  <ShowUserInfo button={setHideButton} />{" "}
                </Suspense>
              }
            ></Route>
            <Route
              path="recipes"
              element={
                <Suspense fallback={<LoadingScreen />}>
                  {" "}
                  <ShowNotAcceptedRecipes
                    button={setHideButton}
                  />{" "}
                </Suspense>
              }
            ></Route>
            <Route
              path="recipes/:recipeId"
              element={
                <Suspense fallback={<LoadingScreen />}>
                  {" "}
                  <ShowNotAcceptedRecipeInfo button={setHideButton} />{" "}
                </Suspense>
              }
            ></Route>
          </Routes>
        </>
      ) : (
        <div
          className={`${styles.paragraph} my-48 xs:my-auto items-center justify-center xs:justify-start text-center text-dimWhite`}
        >
          Nie masz uprawnień do wyświetlania tej strony!
        </div>
      )}
    </>
  );
};

export default AdminPanel;
