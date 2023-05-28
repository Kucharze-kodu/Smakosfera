import { styles } from "../style";
import axios from "axios";
import { urlRecipes } from "../endpoints";
import { useEffect, useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { cooking_book } from "../assets";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  // displaying recipes
  useEffect(() => {
    axios.get(urlRecipes).then((response) => {
      console.log(response.data);
      setRecipes(response.data);
    });
  }, []);

  return (
    <>
      {/* Searchbar */}
      <div className={`${styles.paragraph} p-2 border-b-[1px]`}>
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
              className="rounded-lg w-full pr-[5.3rem] pl-10 p-2 border-[1px] border-dimWhite hover:border-white"
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
      {/* Recipes section */}
      <div className={`flex flex-col xs:grid xs:grid-cols-4 xs:gap-4 m-2 rounded-lg`}>
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe overflow-y-scroll border text-center p-2 border-dimWhite">
            <Link to={`/home/${recipe.id}`}>
              <img className="mx-auto" src={cooking_book} alt="przepis" />
            </Link>
            <div className="">
              <h5 className={`${styles.heading3} text-white`}>{recipe.name}</h5>
              <Link to={`/home/${recipe.id}`}>
                <i>
                <Button 
                  text="Pokaż przepis!"
                  padding="p-1"
                  margin="my-2 mx-4"
                  color="border-dimWhite hover:border-white  text-dimWhite hover:text-white"
                ></Button>
                </i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Recipes;
