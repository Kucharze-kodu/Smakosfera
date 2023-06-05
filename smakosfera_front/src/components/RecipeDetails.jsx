import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { styles } from "../style";
import { avatar, cooking_book } from "../assets";
import axios from "axios";
import { useAuth } from "./AuthContext";
import Button from "./Button";

const RecipeDetails = ({ recipes }) => {
  // extract id of recipe from the URL
  const { recipeId } = useParams();
  const urlComments = `https://localhost:7000/api/comment/recipes/${recipeId}`;
  const urlAddComment = `https://localhost:7000/api/comment`;

  const { getResJsonName } = useAuth();
  const { getResJsonId } = useAuth();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // find a recipe with id...
  const recipe = recipes.find((recipe) => recipe.id === parseInt(recipeId));

  // GET comments
  useEffect(() => {
    axios
      .get(urlComments)
      .then((response) => {
        setComments(response.data);
      })
      .catch((er) => {
        console.log("Błąd przy pobieraniu komentarzy: ", er);
      });
  }, [recipeId]);

  // Function to handle comment input change
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // Function to handle comment submission
  const handleCommentSubmit = () => {
    // Create a new comment object
    const newCommentObj = {
      content: newComment,
      userId: getResJsonId(),
      recipeId: recipeId,
      commentBossId: null
    };

    // POST comment
    axios
      .post(urlAddComment, newCommentObj)
      .then((response) => {
        // Refresh comments after successful submission
        axios
          .get(urlComments)
          .then((response) => {
            setComments(response.data);
            setNewComment(""); // Clear the comment input field
            console.log("Komentarz został dodany."); // Show success notification
          })
          .catch((er) => {
            console.log("Błąd przy pobieraniu komentarzy: ", er);
          });
      })
      .catch((er) => {
        console.log("Błąd przy dodawaniu komentarza: ", er);
      });
  };

  if (!recipe) {
    return (
      <div className={`${styles.paragraph} mx-auto m-28 text-dimWhite`}>
        {" "}
        Nie znaleziono przepisu o id: {recipeId}...{" "}
      </div>
    );
  }

  return (
    <div className="recipe_details flex flex-col overflow-auto xs:pb-0 pb-20">
      <div className="flex xs:flex-row flex-col xs:items-start items-center ">
        <div className="m-5">
          <img src={cooking_book} alt="Przepis" />
        </div>
        <div className="m-5">
          <div className={`${styles.heading3} text-white`}>{recipe.name}</div>
          <div className={`${styles.paragraph} text-dimWhite`}>
            {recipe.description}
          </div>
        </div>
      </div>

      <div className="comments flex flex-col break-all p-2 w-full">
        {
          // Add Comment
          <div className="flex flex-row bg-black border-[1px] py-2 border-gray rounded-lg">
            <div className="">
              <img
                src={avatar}
                className="min-w-[100px] w-[100px]"
                alt="avatar"
                title="avatar"
              />
            </div>
            <div className="flex flex-col w-full px-2">
              <div className={`${styles.heading3} text-white pb-1`}>
                {getResJsonName()}
              </div>
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                maxLength={250}
                placeholder="Dodaj komentarz..."
                className={`${styles.paragraph} min-h-[100px] max-h-[] bg-white p-2 text-dark`}
              ></textarea>
              <div className="flex justify-end mt-2 pt-1">
                <Button
                  onClick={handleCommentSubmit}
                  text="Dodaj komentarz! "
                  padding="p-2"
                  margin=""
                  color="border-dimWhite hover:border-white text-dimWhite hover:text-white"
                ></Button>
              </div>
            </div>
          </div>
        }
        {
          // Show Comments
          comments.map((comment) => (
            <div
              key={comment.id}
              className="flex flex-row bg-black border-[1px] my-2 py-2 border-gray rounded-lg"
            >
              <div className="">
                <img
                  src={avatar}
                  className="min-w-[100px] w-[100px]"
                  alt="avatar"
                  title={comment.user}
                />
              </div>
              <div className="flex flex-col w-full px-2">
                <div className="flex xs:flex-row flex-col justify-between">
                  <div className={`${styles.heading3} text-white`}>
                    {comment.user} Nazwa użytkownika
                    
                  </div>
                  <div className={`${styles.paragraph2} text-dimWhite`}>
                    {comment.creationDate}
                  </div>
                </div>
                <div className={`${styles.paragraph} text-dimWhite`}>
                  {comment.content}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default RecipeDetails;
