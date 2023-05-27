import { styles, layout } from "../style";
import axios from "axios";
import { urlRecipes } from "../endpoints";
import { useEffect, useState } from "react";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  // displaying recipes
  useEffect(() => {
    axios.get(urlRecipes).then((response) => {
      console.log(response.data)
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
      <div className={`${layout.sectionImg} ${styles.paragraph} `}>
        {recipes.map((recipe) => (
          <div key={recipe.name}>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Recipes;
