import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { urlNotAcceptedRecipeInfo } from "../endpoints";
import { urlAcceptRecipe } from "../endpoints";
import { urlRecipes } from "../endpoints";
import { styles } from "../style";
import { useAuth } from "./AuthContext";
import { cooking_book } from "../assets";
import { Link } from "react-router-dom";
import Button from "./Button";

const ShowNotAcceptedRecipeInfo = (prop) => {
  const button = prop.button;
  const navigate = useNavigate();
  const { getResJsonToken } = useAuth();

  const { recipeId } = useParams();
  const urlGetRecipe = urlNotAcceptedRecipeInfo + "/" + recipeId;
  const urlVerifyRecipe = urlAcceptRecipe + "/" + recipeId;
  const urlDeleteRecipe = urlRecipes + "/" + recipeId;

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    button(true);
    axios
      .get(urlGetRecipe, {
        headers: {
          Authorization: `Bearer ${getResJsonToken()}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setRecipe(response.data);
        setIsPending(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const Accept = () => {
    console.log(urlVerifyRecipe);
    console.log(recipeId);
    axios
      .put(urlVerifyRecipe, null, {
        headers: {
          Authorization: `Bearer ${getResJsonToken()}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        navigate("/home/admin-panel/recipes");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const Delete = () => {
    fetch(urlDeleteRecipe, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getResJsonToken()}`,
        "Content-Type": "application/json",
      },
    }).then(() => {
      navigate("/home/admin-panel/recipes");
    });
  };

  return (
    <>
      {recipe && (
        <>
          
          <div className="recipe_details flex flex-col overflow-auto xs:pb-0 pb-20">
          <Link to="/home/admin-panel/recipes">
            <Button
              text="Powrót"
              padding="p-1"
              margin="mt-4 mx-4"
              color="border-dimWhite hover:border-white  text-dimWhite hover:text-white"
            />
          </Link>
            <div className="flex flex-col text-center items-center ">
              <div className="pt-5">
                <img src={cooking_book} alt="Przepis" />
              </div>
              <div className="m-5">
                <div className={`${styles.heading3} text-white`}>
                  {recipe.name}
                </div>
                <div className={`${styles.paragraph} text-dimWhite`}>
                  {recipe.description}
                </div>
                <div className={`${styles.paragraph} text-dimWhite my-5`}>
                  Czas przygotowania: <u>{recipe.preparationTime} minut!</u>
                </div>

                <div
                  className={`${styles.paragraph} xs:m-5 text-center xs:text-left text-dimWhite mb-5`}
                >
                  <div className={`${styles.heading3} text-white `}>
                    Składniki:
                  </div>
                  <ul className="list-disc list-inside ">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.name}: {ingredient.amount} {ingredient.unit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5 max-w-full">
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
                  onClick={() => Accept()}
                  text="Zatwierdź"
                  padding="p-1"
                  margin="mt-4 mx-4"
                  color="border-green outline outline-offset-0
                  hover:bg-green outline-green-500  text-green-700  font-medium hover:bg-green-700
                  hover:text-black
                  hover:border-black hover:outline-green  rounded-lg"
                />
              </div>
          </div>
          
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

export default ShowNotAcceptedRecipeInfo;
