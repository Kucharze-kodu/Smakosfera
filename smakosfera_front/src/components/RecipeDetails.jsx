import { useParams } from "react-router-dom";
import { styles } from "../style";

const RecipeDetails = ({recipes}) => {
    // extract id of recipe from the URL
    const { recipeId } = useParams();

    // find a recipe with id...
    const recipe = recipes.find((recipe) => recipe.id === parseInt(recipeId))
    if(!recipe){
        return <div className={`${styles.paragraph} mx-auto m-28 text-dimWhite`}> Nie znaleziono przepisu o id: {recipeId}... </div>
    }

    return (
        <div className=""> 
            <div className={`${styles.heading2} text-white`}>{recipe.name}</div>
            <div className={`${styles.paragraph} text-dimWhite`}>{recipe.description}</div>
        </div>
    )
}

export default RecipeDetails;