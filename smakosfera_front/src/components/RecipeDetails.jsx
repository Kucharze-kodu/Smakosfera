import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { styles } from "../style";
import { avatar, cooking_book } from "../assets";
import axios from "axios";
import { useAuth } from "./AuthContext";
import Button from "./Button";
import { API_URL } from "../endpoints";
import { IconContext } from "react-icons";
import { BsHeartFill, BsFillStarFill } from "react-icons/bs";

const RecipeDetails = ({ recipes }) => {
  // extract id of recipe from the URL
  const { recipeId } = useParams();
  const urlComment = `${API_URL}/api/comment/recipes/${recipeId}`;
  const urlAddComment = `${API_URL}/api/comment`;
  const urlAddLike = `${API_URL}/api/like/${recipeId}`;
  const urlGetLikes = `${API_URL}/api/like/recipes/${recipeId}`;
  const urlRate = `${API_URL}/api/rate`;
  const urlAverageRate = `${API_URL}/api/rate/average/${recipeId}`
  const urlRemoveRate = `${API_URL}/api/rate/${recipeId}`;

  const { getResJsonName } = useAuth();
  const { getResJsonId } = useAuth();
  const { getResJsonToken } = useAuth();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [lastCommentTime, setLastCommentTime] = useState(null);
  const [lastCommentCaption, setLastCommentCaption] = useState(null);
  const [showLastCommentCaption, setShowLastCommentCaption] = useState(true);
  const [likeNumber, setLikeNumber] = useState(0);
  const [averageRate, setAverageRate] = useState("");
  const [userRate, setUserRate] = useState(0);

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

  // GET likes
  useEffect(() => {
    axios
      .get(urlGetLikes, {
        headers: {
          Authorization: `Bearer ${getResJsonToken()}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const likes = response.data;
        // Update the like number in the state
        setLikeNumber(likes);
      })
      .catch((error) => {
        console.log("Błąd przy pobieraniu liczby polubień: ", error);
      });
  }, [recipeId]);

    // GET average rate
    useEffect(() => {
      axios
        .get(urlAverageRate, {
          headers: {
            Authorization: `Bearer ${getResJsonToken()}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const rate = response.data.averageRating;
          // Update the average rate in the state
          setAverageRate(rate);
        })
        .catch((error) => {
          console.log("Błąd przy pobieraniu średniej oceny: ", error);
        });
    }, [recipeId]);
  
    // GET user rating
    useEffect(() => {
      axios
        .get(urlRate, {
          headers: {
            Authorization: `Bearer ${getResJsonToken()}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const rate = response.data.rating;
          // Update the user rate in the state
          setUserRate(rate);
        })
        .catch((error) => {
          console.log("Błąd przy pobieraniu oceny użytkownika: ", error);
        });
    }, [recipeId]);

  const handleRate = (newRate) => {

    let request;
    // check whether to set or delete rating
    if (newRate == userRate) {
      // DELETE rating
      request = axios
        .delete(urlRemoveRate, {
          headers: {
            Authorization: `Bearer ${getResJsonToken()}`,
            "Content-Type": "application/json",
          },
        })
    }
    else {
       // Create a new rate object
      const newRateObj = {
        recipeId: recipeId,
        rating: newRate,
      };
      // POST rating
      request = axios
        .post(urlRate, newRateObj, {
          headers: {
            Authorization: `Bearer ${getResJsonToken()}`,
            "Content-Type": "application/json",
          },
        })
    }

    // Update rating data regardless of used request
    request.then((response) => {
        const getRating = () => {
          axios.get(urlRate,{
            headers: {
              Authorization: `Bearer ${getResJsonToken()}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            const rate = response.data.rating;
            setUserRate(rate);
          })
          .catch((error) => {
            console.log("Błąd przy pobieraniu oceny użytkownika: ", error);
          });
        };
        // update user rating
        getRating();
        const getAverageRating = () => {
          axios.get(urlAverageRate, {
            headers: {
              Authorization: `Bearer ${getResJsonToken()}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            const rate = response.data.averageRating;
            setAverageRate(rate);
          })
          .catch((error) => {
            console.log("Błąd przy pobieraniu średniej oceny użytkownika: ", error);
          });
        };
        // update average rating
        getAverageRating();
      })
      .catch((error) => {
        console.log("Błąd przy dodaniu oceny: ", error);
      });
  }



  // Function to handle adding a like
  const handleLike = () => {
    // PUT like
    axios
      .put(
        urlAddLike,
        {},
        {
          headers: {
            Authorization: `Bearer ${getResJsonToken()}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setLikeNumber(response.data);
        // GET likes
        const getLikes = () => {
          axios
            .get(urlGetLikes, {
              headers: {
                Authorization: `Bearer ${getResJsonToken()}`,
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              const likes = response.data;
              // Update the like number in the state
              setLikeNumber(likes);
            })
            .catch((error) => {
              console.log("Błąd przy pobieraniu liczby polubień: ", error);
            });
        };

        // Call getLikes after successful like addition
        getLikes();
      })
      .catch((er) => {
        console.log("Błąd przy dodaniu polubienia: ", er);
      });
  };


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

  // Function to return appropriate rating symbol color based on given rating
  const handleRatingSymbol = (rating) => {
    if(rating > userRate) {
      return "white";
    }
    else {
      return "gold";
    }
  }

  const displayAverageRating = () => {
    if (averageRate == "0.0") {
      return "Brak ocen";
    } else {
      return `Średnia ocena: ${averageRate}`;
    }
  }


  return (
    <div className="recipe_details flex flex-col overflow-auto xs:pb-0 pb-20">
      <div className="flex flex-col text-center items-center ">
        <div className="pt-5">
          <img src={cooking_book} alt="Przepis" />
        </div>
        <div className="m-5">
          <div className={`${styles.heading3} text-white`}>{recipe.name}</div>
          <div className={`${styles.paragraph} text-dimWhite`}>
            {recipe.description}
          </div>
          <div className={`${styles.paragraph} text-dimWhite my-5`}>
            Czas przygotowania: <u>{recipe.preparationTime} minut!</u>
          </div>

          <div
            className={`${styles.paragraph} xs:m-5 text-center xs:text-left text-dimWhite mb-5`}
          >
            <div className={`${styles.heading3} text-white `}>Składniki:</div>
            <ul className="list-disc list-inside ">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.name}: {ingredient.amount} {ingredient.unit}
                </li>
              ))}
            </ul>
          </div>

          <div
            onClick={handleLike}
            className={`${styles.heading3}  border-2 border-dimWhite hover:border-white rounded-lg p-2  text-dimWhite hover:text-white cursor-pointer`}
          >
            <div
              className={`${styles.paragraph2} p-3 text-red flex flex-row justify-center items-end`}
            >
              <div className="text-[24px]">
                <BsHeartFill />
              </div>
              <div className={`text-[24px] px-2`}>{likeNumber.length}</div>
            </div>{" "}
          </div>
          <div className="flex px-2 justify-center">
            {[1, 2, 3, 4, 5].map((rating) => (
            <div
              onClick={() => handleRate(rating)}
              className={`${styles.heading} scale-50 no-border rounded-lg cursor-pointer`}
            >
              <IconContext.Provider value={{color: handleRatingSymbol(rating)}}>
                <BsFillStarFill />
              </IconContext.Provider>
            </div>
            ))}
          </div>
          <div className={`${styles.heading3} text-white`}>
            {displayAverageRating()}
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
