import { styles } from "../style";
import axios from "axios";
import { urlFavoriteRecipes } from "../endpoints";
import { useEffect, useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { cooking_book } from "../assets";
import ScrollAnimation from "react-animate-on-scroll";
import { useAuth } from "./AuthContext";
import { BsHeartFill, BsHeart } from "react-icons/bs";

const Favorites = () => {
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState(8);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleShowMore = () => {
    setDisplayedRecipes((prevCount) => prevCount + 8);
  };

  // Check if user is logged in
  const { isLoggedIn } = useAuth();
  const { getResJsonToken } = useAuth();

  // GET recipes
  useEffect(() => {
    axios
      .get(urlFavoriteRecipes, {
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



  return (
    <div className="overflow-auto">
      {/* Searchbar */}
      <div className={`${styles.paragraph} text-gray hover:text-black p-2 `}>
        <form>
          <div className={`relative `}>
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
              className="rounded-lg w-full pr-[5.3rem] placeholder:text-gray  hover:text-black text-gray  pl-10 p-2 border-[1px] border-dimWhite hover:border-white"
              placeholder="Wyszukaj przepis..."
            />
            <button
              type="submit"
              className="hover:text-black text-gray absolute right-3 top-2 ring-0 border-0 hover:border-0 focus:border-0 outline-none hover:outline-none focus:outline-none"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Recipes section */}
      {isDataLoaded && (
        <ScrollAnimation animateIn="fadeIn" duration={1}>
          <div
            className={`flex flex-col h-full xs:grid xs:grid-cols-4 xs:gap-4 xs:mx-2 rounded-lg`}
          >
            {recipes
              .slice(0, isLoggedIn() ? displayedRecipes : 8)
              .map((recipe) => (
                <div
                  key={recipe.id}
                  className="recipe flex flex-col justify-between overflow-y-scroll border-y xs:border text-center py-4 border-dimWhite"
                >
                  <Link to={`/home/${recipe.id}`}>
                    <img
                      className="mx-auto px-2"
                      src={cooking_book}
                      alt="przepis"
                    />
                  </Link>
                  <h5
                    className={`${styles.heading3} break-words p-1 text-white`}
                  >
                    {recipe.name}
                  </h5>
                  <Link to={`/home/${recipe.id}`}>
                    <i>
                      <Button
                        text="Pokaż przepis!"
                        padding="p-1"
                        margin="mx-4"
                        color="border-dimWhite hover:border-white  text-dimWhite hover:text-white"
                      ></Button>
                    </i>
                  </Link>

                  <div className = {`break-words p-1 text-white text-white`}>Ilość polubień: {recipe.likeNumber}</div>
                </div>
              ))}
          </div>
        </ScrollAnimation>
      )}

      {isLoggedIn() == false && (
        <div
          className={`text-center p-5 ${styles.paragraph} text-dimWhite hover:text-white`}
        >
          <Link to="/login">
            Aby zobaczyć więcej przepisów musisz się zalogować...
          </Link>
        </div>
      )}

      {isLoggedIn() && (
        <div
          className={`text-center xs:p-5 pt-5 pb-32 ${styles.paragraph} text-dimWhite`}
        >
          {displayedRecipes >= recipes.length ? (
            <div>Koniec przepisów...</div>
          ) : (
            <div
              onClick={handleShowMore}
              className="cursor-pointer hover:text-white"
            >
              Wyświetl więcej przepisów...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;
