import { useEffect, useState } from "react";
import { styles } from "../style";
import useFetch from "./useFetch";
import { urlUsers } from "../endpoints";
import Button from "./Button";
import ShowUsers from "./ShowUsers";
import { useAuth } from "./AuthContext";

const AdminPanel = () => {
  const { data: users, isPending} = useFetch(urlUsers);
  const { getResJsonPermission } = useAuth();

  const handleRow = () => {};

  const [buttonShowUsers, setButtonShowUsers] = useState(false);

  return (
    <>
      {getResJsonPermission() === "Admin" ? (
        <>
          {!buttonShowUsers && (
            <Button
              onClick={() => {
                setButtonShowUsers(true);
              }}
              text="Pokaż użytkowników"
              padding="p-1"
              margin="mt-4 mx-4"
              color="border-dimWhite hover:border-white  text-dimWhite hover:text-white"
            />
          )}
          {buttonShowUsers && (
            <ShowUsers users={users} button={setButtonShowUsers} isPending={isPending}/>
          )}
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
