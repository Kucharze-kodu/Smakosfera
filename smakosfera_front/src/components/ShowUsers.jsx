import Button from "./Button";

const ShowUsers = (prop) => {
  const users = prop.users;
  const button = prop.button;
  const loading = prop.isPending;

  return (
    <>
      {!loading && (
        <>
          <Button
            onClick={() => button()}
            text="Powrót"
            padding="p-1"
            margin="mt-4 mx-4"
            color="border-dimWhite hover:border-white  text-dimWhite hover:text-white"
          />
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
                        <div className="w-[80px]">{user.name}</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="w-[100px]">{user.surname}</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="w-[100px]">{user.permission}</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="w-[200px]">{user.email}</div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default ShowUsers;
