import { styles } from "../style";
<<<<<<< Updated upstream

const Recipes = () => {
=======
import { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { cooking_book } from "../assets";
import ScrollAnimation from "react-animate-on-scroll";
import { useAuth } from "./AuthContext";

const Recipes = ({ recipes, isDataLoaded }) => {
  const [displayedRecipes, setDisplayedRecipes] = useState(8);

  const handleShowMore = () => {
    setDisplayedRecipes((prevCount) => prevCount + 8);
  };

  // Check if user is logged in
  const { isLoggedIn } = useAuth();

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      <div className={`${styles.paragraph} p-2 `}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        tincidunt, lorem sit amet pulvinar vehicula, risus libero aliquet nisi,
        in finibus arcu sapien non mi. Etiamonsequat tempus dui,Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Pellentesque tincidunt,
        lorem sit amet pulvinar vehicula, risus libero aliquet nisi, in finibus
        arcu sapien non mi. Etiam consequat tempus dui, viverra rhoncus dui
        ornare id. Al consequat tempus dui,Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Pellentesque tincidunt, lorem sit amet
        pulvinar vehicula, risus libero aliquet nisi, in finibus arcu sapien non
        mi. Etiam consequat tempus dui, viverra rhoncus dui ornare id. Aliquam
        ut fringilla justo. Aenean lobortis urna eget sapien fringilla dapibus.
        Integer non velit vel magna imperdiet posuere a vitae mi. Morbi pharetra
        auctor auctor. Proin ligula lorem, eleifend quis vehicula vitae, pretium
        ac libero. Phasellus at dui orci. Sed sollicitudin aliquet rhoncus. Sed
        sed ultrices diam, id feugiat nisl. Suspendisse tempor orci viverra
        dolor tempor, ut ornare purus eleifend. Vestibulum cursus ornare magna,
        eu lobortis felis imperdiet in. Curabitur finibus ornare volutpat.
        Quisque pharetra bibendum ex, quis convallis purus sollicitudin eget.
        Etiam condimentum libero quis nunc dignissim vestibulum. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Maecenas lectus dui, consequat nec lacus sed, maximus fermentum
        arcu. Vestibulum id pharetra massa. Sed eros nunc, aliquet et dignissim
        varius, molestie vel lacus. viverra rhoncus dui ornare id. Aliquam ut
        fringilla justo. Aenean lobortis urna eget sapien fringilla dapibus.
        Integer non velit vel magna imperdiet posuere a vitae mi. Morbi pharetra
        auctor auctor. Proin ligula lorem, eleifend quis vehicula vitae, pretium
        ac libero. Phasellus at dui orci. Sed sollicitudin aliquet rhoncus. Sed
        sed ultrices diam, id feugiat nisl. Suspendisse tempor orci viverra
        dolor tempor, ut ornare purus eleifend. Vestibulum cursus ornare magna,
        eu lobortis felis imperdiet in. Curabitur finibus ornare volutpat.
        Quisque pharetra bibendum ex, quis convallis purus sollicitudin eget.
        Etiam condimentum libero quis nunc dignissim vestibulum. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Maecenas lectus dui, consequat nec lacus sed, maximus fermentum
        arcu. Vestibulum id pharetra massa. Sed eros nunc, aliquet et dignissim
        varius, molestie vel lacus.
      </div>
    </>
=======
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
                  className="recipe flex flex-col justify-between overflow-y-scroll border-y xs:border text-center py-2 border-dimWhite"
                >
                  <Link to={`/home/${recipe.id}`}>
                    <img
                      className="mx-auto xs:my-0 my-2"
                      src={cooking_book}
                      alt="przepis"
                    />
                  </Link>

                  <div
                    className={`${styles.heading3} break-words px-2 text-white`}
                  >
                    {recipe.name}
                  </div>
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
>>>>>>> Stashed changes
  );
};

export default Recipes;
