import { styles } from "../style";
import { useState, useEffect } from "react";
import { urlAddIngredient } from "../endpoints";
import { urlIngredient } from "../endpoints";
import axios from "axios";
import { useAuth } from "./AuthContext";

const AddIngredient = () => {

    const [nazwa,setNazwa] = useState("");
    const [success, setSuccess] = useState(false);
    const [blad, setblad] = useState(false);
    const [ingredientList, setIngredientList] = useState([]);

    const {isLoggedIn} = useAuth();
    const {getResJsonToken} = useAuth();

    const handleSkladnik = (event) =>{
        setNazwa(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
       try {
          let res = await fetch(urlAddIngredient, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:`Bearer ${getResJsonToken()}`
              
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
          
        } 
        catch (err) {
          if (err instanceof SyntaxError && err.message.includes('Unexpected end of JSON input')) 
          {
            console.log('Pominięto błąd parsowania JSON');
          setNazwa("");
          setSuccess(true);
          setblad(false)
          console.log(err);
          }
          else
          {
            console.log(err);
            setblad(true);
            setSuccess(false)
          }
 
      }
    };

    useEffect(() => {
      fetchIngredients();
    }, []);
  
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(urlIngredient,{
          headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${getResJsonToken()}`
            
  
          }});
        setIngredientList(response.data);
      } catch (error) {
        console.error("Błąd podczas pobierania składników:", error);
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
          <div className={`${styles.heading5} xs:my-0 my-4 text-white `}>
            {success ? <p>Dodano składnik!</p> : null}
            {blad ? <p>Coś poszło nie tak </p> : null}
          </div>
          <div className="container mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Lista już dodanych składników :</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Nazwa</th>
          </tr>
        </thead>
        <tbody>
          {ingredientList.map((ingredient) => (
            <tr key={ingredient.id}>
              <td className="border p-2">{ingredient.name}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>

        
          
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
