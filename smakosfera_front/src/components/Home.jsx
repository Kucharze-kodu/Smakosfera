import Footer from "./Footer";
import { styles } from "../style";
import { logo, avatar } from "../assets";
import Button from "./Button";

const Home = () => {
  return (
    <div className={`${styles.background} overflow-auto`}>
      <div className="flex h-[95%] pt-5 px-5">
        <div className="flex border-[2px] border-dimWhite">
          {/* Sidebar */}
          <div className="w-[20%] border-r-[1px] border-r-dimWhite">
            <img src={logo} className="p-5 border-b-[1px] border-b-dimWhite" />
            <img src={avatar} className="w-[75%] mx-auto" />
            <Button
              text="Strona główna"
              padding="p-1"
              margin="mb-4 mx-4"
              color="border-white hover:border-dimWhite text-white"
            />
            <Button
              text="Moje konto"
              padding="p-1"
              margin="my-4 mx-4"
              color="border-white hover:border-dimWhite text-white"
            />
            <Button
              text="Ulubione"
              padding="p-1"
              margin="my-4 mx-4"
              color="border-white hover:border-dimWhite text-white"
            />
            <Button
              text="Dodaj nowy przepis"
              padding="p-1"
              margin="mt-4 mx-4"
              color="border-white hover:border-dimWhite text-white"
            />
          </div>
          <div className="flex flex-col w-[80%]">
            {/* Info, kto jest zalogowany */}
            <div
              className={`h-[10%] ${styles.paragraph} flex justify-end items-center pr-5 border-b-[1px] border-b-dimWhite`}
            >
              Jesteś zalogowany jako...
            </div>
            {/* Wyszukiwarka */}
            <div className={`${styles.paragraph} p-2 h-[10%] border-b-[1px]`}>
              <form>
                <div className={`relative`}>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="search"
                    name="search"
                    className="rounded-lg w-full pl-10 p-2 border-[1px] border-dimWhite hover:border-white"
                    placeholder="Wyszukaj przepis..."
                  />
                  <button
                    type="submit"
                    className="hover:text-white absolute right-3 top-2 ring-0 border-0 hover:border-0 focus:border-0 outline-none hover:outline-none focus:outline-none"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            {/* Przepisy */}
            <div className={`${styles.paragraph} h-[80%] `}>
              recipes
            </div>
          </div>
        </div>
      </div>

      <div className="h-[5%]">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
