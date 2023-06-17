import { useEffect, useState } from "react";
import Button from "./Button";
import ShowUserInfo from "./ShowUserInfo";
import { styles } from "../style";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { urlUsers } from "../endpoints";
import axios from "axios";
import { useAuth } from "./AuthContext";

const ShowUsers = (prop) => {
  
  const button = prop.button;
  const navigator = useNavigate();

  const handleRow = (idUser) =>{
    navigator(`/home/admin-panel/users/` + idUser);
  }

  const { getResJsonToken } = useAuth();

  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    button(true);
    axios
      .get(urlUsers, {
        headers: {
          Authorization: `Bearer ${getResJsonToken()}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        setUsers(result.data);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <>
      {!loading && (
        <>
          <Link to="/home/admin-panel">
            <Button
              onClick={() => button(false)}
              text="Powrót"
              padding="p-1"
              margin="mt-4 mx-4"
              color="border-dimWhite hover:border-white  text-dimWhite hover:text-white"
            />
          </Link>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-1 mt-2 overflow-auto scrollbar-hide">
            <div className="sticky top-0 bg-neutral-800 dark:bg-gray-700">
              <table className="text-base text-center text-gray-500 text-gray-400 w-full overflow-hidden">
                <thead className="text-lg text-white uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      <div className="w-[80px]">Id</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="w-[80px]">Imie</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="w-[100px]">Nazwisko</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="w-[100px]">Uprawnienia</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="w-[200px]">Email</div>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <table className="text-base text-center text-gray-500 text-gray-400 w-full overflow-hidden">
              <tbody className="bg-neutral-700">
                {users &&
                  users.map((user) => (
                    <tr
                      scope="row"
                      className="border-b hover:bg-neutral-900 hover:cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-white"
                      onClick={() => handleRow(user.id)}
                      key={user.id}
                    >
                      <td
                        scope="row"
                        className="px-6 py-3 font-medium whitespace-nowrap text-white"
                      >
                          <div className="w-[80px]">{user.id}</div>
                        
                      </td>
                      <td className="px-6 py-3">
                        <Link to={"/home/admin-panel/users/" + user.id}>
                          <div className="w-[80px]">{user.name}</div>
                        </Link>
                      </td>
                      <td className="px-6 py-3">
                        <Link to={"/home/admin-panel/users/" + user.id}>
                          <div className="w-[100px]">{user.surname}</div>
                        </Link>
                      </td>
                      <td className="px-6 py-3">
                        <Link to={"/home/admin-panel/users/" + user.id}>
                          <div className="w-[100px]">{user.permission}</div>
                        </Link>
                      </td>
                      <td className="px-6 py-3">
                        <Link to={"/home/admin-panel/users/" + user.id}>
                          <div className="w-[200px]">{user.email}</div>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {loading && (
        <div
          className={`${styles.paragraph} my-48 xs:my-auto items-center justify-center xs:justify-start text-center text-dimWhite`}
        >
          Trwa pobieranie danych...
        </div>
      )}
    </>
  );
};

export default ShowUsers;
