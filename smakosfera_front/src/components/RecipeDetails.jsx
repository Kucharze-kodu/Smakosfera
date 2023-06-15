import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { styles } from "../style";
import { avatar, cooking_book } from "../assets";
import axios from "axios";
import { useAuth } from "./AuthContext";
import Button from "./Button";
import { urlComments, urlAddComment } from "../endpoints";

const RecipeDetails = ({ recipes }) => {
  // extract id of recipe from the URL
  const { recipeId } = useParams();
  const urlComment = urlComments + recipeId;

  const { getResJsonName } = useAuth();
  const { getResJsonId } = useAuth();
  const { getResJsonToken } = useAuth();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [lastCommentTime, setLastCommentTime] = useState(null);
  const [lastCommentCaption, setLastCommentCaption] = useState(null);
  const [showLastCommentCaption, setShowLastCommentCaption] = useState(true);

  // find a recipe with id...
  const recipe = recipes.find((recipe) => recipe.id === parseInt(recipeId));

  // GET comments
  useEffect(() => {
    axios
      .get(urlComment, {
        headers: {
          Authorization: `Bearer ${getResJsonToken()}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log("Błąd przy pobieraniu komentarzy: ", error);
      });
  }, [recipeId]);

  // Function to handle comment input change
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // Function to handle comment submission
  const handleCommentSubmit = () => {
    // Check if enough time has passed since the last comment was added (1 minute)
    if (lastCommentTime && Date.now() - lastCommentTime < 60000) {
      setLastCommentCaption(
        `Następny komentarz możesz dodać o: ${new Date(
          lastCommentTime + 60000
        ).toLocaleTimeString()}`
      );
      setShowLastCommentCaption(true);
      return;
    }

    // Create a new comment object
    const newCommentObj = {
      content: newComment,
      userId: getResJsonId(),
      recipeId: recipeId,
      commentBossId: null,
    };

    // POST comment
    axios
      .post(urlAddComment, newCommentObj, {
        headers: {
          Authorization: `Bearer ${getResJsonToken()}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Refresh comments after successful submission
        axios
          .get(urlComment, {
            headers: {
              Authorization: `Bearer ${getResJsonToken()}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setComments(response.data);
            setNewComment("");
            console.log("Komentarz został dodany.");
          })
          .catch((er) => {
            console.log("Błąd przy pobieraniu komentarzy: ", er);
          });
      })
      .catch((er) => {
        console.log("Błąd przy dodawaniu komentarza: ", er);
      });

    // Set the time of the last comment added to the current time
    setLastCommentTime(Date.now());
  };

  // Clear last comment caption after 5 seconds
  useEffect(() => {
    if (showLastCommentCaption) {
      const timeout = setTimeout(() => {
        setShowLastCommentCaption(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [showLastCommentCaption]);

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
              <div className={`${styles.heading3} text-white pb-1`}>Ty</div>
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                maxLength={250}
                placeholder="Dodaj komentarz..."
                className={`${styles.paragraph} min-h-[100px] bg-white p-2 text-dark`}
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
              <div className={`${styles.paragraph} xs:p-0 p-1 text-dimWhite`}>
                {showLastCommentCaption && lastCommentCaption}
              </div>
            </div>
          </div>
        }
        {
          // Show Comments
          comments.map((comment, index) => (
            <div
              key={index}
              className="flex flex-row bg-black border-[1px] my-2 py-2 border-gray rounded-lg"
            >
              <div className="">
                <img
                  src={avatar}
                  className="min-w-[100px] w-[100px]"
                  alt="avatar"
                  title={comment.userName}
                />
              </div>
              <div className="flex flex-col w-full px-2">
                <div className="flex xs:flex-row flex-col justify-between">
                  <div className={`${styles.heading3} text-white`}>
                    {comment.userName}
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
