import { useParams } from "react-router-dom";
import { styles } from "../style";

const RecipeDetails = () => {
    const { recipeId } = useParams();

    return (
        <div className={styles.paragraph}> Strona dla przepisu o ID: {recipeId}</div>
    )
}

export default RecipeDetails;