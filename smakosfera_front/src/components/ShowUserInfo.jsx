import Button from "./Button";
import { urlUsers } from "../endpoints";
import useFetch from "./useFetch";
import { styles } from "../style";
import { avatar } from "../assets";
import { useAuth } from "./AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";

const ShowUserInfo = (prop) => {
  const button = prop.button;
  const { idUser } = useParams();
  const url = urlUsers + "/" + idUser;
  const { getResJsonToken } = useAuth();
  const { data: user, isPending } = useFetch(url);
  const navigate = useNavigate();

  const Delete = () =>{
    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getResJsonToken()}`,
        "Content-Type": "application/json",
      }
    }).then(() => {
      navigate("/home/admin-panel/users");
    })
  }

  return (
    <>
      {!isPending && (
        <>
          <Link to="/home/admin-panel/users">
            <Button
              onClick={() => {}}
              text="Powrót"
              padding="p-1"
              margin="mt-4 mx-4"
              color="border-dimWhite hover:border-white  text-dimWhite hover:text-white"
            />
          </Link>

          {user && (
            <>
              <div className="grid grid-cols-2 gap-4 max-w-3xl">
                <div className="flex items-center justify-center">
                  <img src={avatar} className="w-full" alt="Avatar" />
                </div>
                <div className="flex flex-col justify-start">
                  <div className="text-white p-2 text-xl pt-10 text-left">
                    <span className="text-white mr-2 font-bold">Id:</span>
                    {user.id}
                  </div>
                  <div className="text-white p-2 text-xl text-left">
                    <span className="text-white mr-2 font-bold">Imie:</span>
                    {user.name}
                  </div>
                  <div className="text-white p-2 text-xl text-left">
                    <span className="text-white mr-2 font-bold">Nazwisko:</span>
                    {user.surname}
                  </div>
                  <div className="text-white p-2 text-xl text-left">
                    <span className="text-white mr-2 font-bold">Email:</span>
                    {user.email}
                  </div>
                  <div className="text-white p-2 text-xl text-left">
                    <span className="text-white mr-2 font-bold">
                      Subskrypcja:
                    </span>
                    {String(user.subscription)}
                  </div>
                  <div className="text-white p-2 text-xl text-left">
                    <span className="text-white mr-2 font-bold">
                      Zweryfikowany:
                    </span>
                    {user.verifiedAt}
                  </div>
                  <div className="text-white p-2 text-xl text-left">
                    <span className="text-white mr-2 font-bold">
                      Uprawnienia:
                    </span>
                    {user.permission}
                  </div>
                  <div className="text-white p-2 text-xl text-left">
                    <span className="text-white mr-2 font-bold">Ban:</span>
                    {String(user.banTime)}
                  </div>
                  <div className="text-white p-2 text-xl text-left">
                    <span className="text-white mr-2 font-bold">Avatar:</span>
                    {user.avatarFileName}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 max-w-full">
                <Button
                  onClick={() => Delete()}
                  text="Usuń"
                  padding="p-1"
                  margin="mt-4 mx-4"
                  color="border-red outline outline-offset-0
                  hover:bg-red outline-red-500  text-red  font-medium hover:bg-red
                  hover:text-black
                  hover:border-black hover:outline-red  rounded-lg"
                />
                <Button
                  onClick={() => Ban()}
                  text="Zbanuj"
                  padding="p-1"
                  margin="mt-4 mx-4"
                  color="border-green outline outline-offset-0
                  hover:bg-green outline-green-500  text-green-700  font-medium hover:bg-green-700
                  hover:text-black
                  hover:border-black hover:outline-green  rounded-lg"
                />
                <Button
                  onClick={() => Ban()}
                  text="Zmień uprawnienia"
                  padding="p-1"
                  margin="mt-4 mx-4"
                  color="border-purple outline outline-offset-0
                  hover:bg-purple outline-purple-500  text-purple-700  font-medium hover:bg-purple-700
                  hover:text-black
                  hover:border-black hover:outline-purple  rounded-lg"
                />
              </div>
            </>
          )}
        </>
      )}
      {isPending && (
        <div
          className={`${styles.paragraph} my-48 xs:my-auto items-center justify-center xs:justify-start text-center text-dimWhite`}
        >
          Trwa pobieranie danych...
        </div>
      )}
    </>
  );
};

export default ShowUserInfo;
