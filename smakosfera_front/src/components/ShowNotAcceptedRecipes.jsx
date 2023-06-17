import { useEffect, useState } from "react";
import { urlNotAcceptedRecipes } from "../endpoints";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import Button from "./Button";
import { styles } from "../style";
import ScrollAnimation from "react-animate-on-scroll";
import { cooking_book } from "../assets";

const ShowNotAcceptedRecipes = (prop) => {
  const button = prop.button;
  const { getResJsonToken } = useAuth();

  const [displayedRecipes, setDisplayedRecipes] = useState(8);

  const [recipes, setRecipes] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const handleShowMore = () => {
    setDisplayedRecipes((prevCount) => prevCount + 8);
  };

  const handleButton = () => {
    setIsDataLoaded(false);
    button(false);    
  }

  useEffect(() => {
    
    button(true);
    axios
      .get(urlNotAcceptedRecipes, {
        headers: {
          Authorization: `Bearer ${getResJsonToken()}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setRecipes(response.data);
        setIsDataLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
          <div className="overflow-auto">
            <Link to="/home/admin-panel">
              <Button
                onClick={() => handleButton()}
                text="Powrót"
                padding="p-1"
                margin="mt-4 mx-4 mb-4"
                color="border-dimWhite hover:border-white  text-dimWhite hover:text-white"
              />
            </Link>

            {/* Recipe section */}
            {isDataLoaded && (
                  <div
                    className={`flex flex-col xs:grid xs:grid-cols-4 xs:gap-4 xs:mx-2 rounded-lg`}
                  >
                    {recipes.slice(0, displayedRecipes).map((recipe) => (
                      <div
                        key={recipe.id}
                        className="recipe flex flex-col justify-between overflow-y-scroll border-y xs:border text-center py-4 border-dimWhite"
                      >
                        <Link to={`${recipe.id}`}>
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
                        <Link to={`${recipe.id}`}>
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
            )}

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
          </div>
      
      {!isDataLoaded && (
        <div
          className={`${styles.paragraph} my-48 xs:my-auto items-center justify-center xs:justify-start text-center text-dimWhite`}
        >
          Trwa pobieranie danych...
        </div>
      )}
    </>
  );
};

export default ShowNotAcceptedRecipes;
