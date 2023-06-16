import { useState } from "react";
import { styles } from "../style";
import Button from "./Button";
import ShowUsers from "./ShowUsers";
import { useAuth } from "./AuthContext";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import LoadingScreen from "./LoadingScreen";
import ShowUserInfo from "./ShowUserInfo";

const AdminPanel = () => {
  const { getResJsonPermission } = useAuth();

  const [hideButton, setHideButton] = useState(false);

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
          </Link>)}
          <Routes>
            <Route
              path="users"
              element={
                <Suspense fallback={<LoadingScreen />}>
                  {" "}
                  <ShowUsers
                    button={setHideButton}
                  />{" "}
                </Suspense>
              }
            ></Route>
            <Route
              path="users/:idUser"
              element={
                <Suspense fallback={<LoadingScreen />}>
                  {" "}
                  <ShowUserInfo
                    button={setHideButton}
                  />{" "}
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
