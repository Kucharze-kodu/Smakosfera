import { styles } from "../style";
import { useState, useEffect } from "react";
//import { urlAddIngredient } from "../endpoints";
import { useAuth } from "./AuthContext";

const AddIngredient = () => {

    const [nazwa,setNazwa] = useState("");

    const {isLoggedIn} = useAuth();

    const handleSkladnik = (event) =>{
        setNazwa(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
       try {
          let res = await fetch('https://localhost:7000/api/ingredient', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              //"Authorization":"Bearer ${token}"
              
            },
            body: JSON.stringify({

              name: nazwa

            }),
          });
          let resJson = await res.json();
    
          const currentDate = new Date();
          const expirationDate = new Date(
            currentDate.getTime() + 24 * 60 * 60 * 1000
          );
    
          document.cookie = `resJson=${resJson}; expires=${expirationDate.toUTCString()}; path=/`;
    
          if (res.ok) {
            setNazwa("");
          } else {
            console.log("Błąd!");
            setNazwa("");
          }
        } catch (err) {
          console.log(err);
        }
      };


 return (
    <div className="add_recipe overflow-y-scroll px-4 flex flex-col pb-10  items-center w-full h-full justify-center xs:justify-start text-center">
      {isLoggedIn() ? (
        <div>
          <div className={`${styles.heading2} xs:my-0 my-4 text-white `}>
            Dodaj Składnik
          </div>
          <form onSubmit={handleSubmit}>
            <label className="text-center">
              <input
                type="text"
                value={nazwa}
                onChange={handleSkladnik}
                className="w-full px-4 py-2 -++ rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Nazwa składnika:"  
              />
            </label>
            <button
              type="submit"
              className={`${styles.paragraph} text-dimWhite hover:text-white p-5 xs:mb-0 mb-20 mt-3 sm:min-w-[25%] min-w-[100%] border-[1px] focus:border-white hover:border-white border-dimWhite w-[100%] hover:bg-black bg-black rounded-md `}
            >
              Dodaj Składnik
            </button>
          </form>
        </div>
      ) : 
      (
        <div className={`${styles.paragraph} my-48 xs:my-auto text-dimWhite`}>
          Nie masz uprawnień do wyświetlania tej strony!
        </div>
      )}
    </div>
  );
};

export default AddIngredient;
