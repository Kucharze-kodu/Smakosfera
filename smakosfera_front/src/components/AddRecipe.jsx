import { styles } from "../style";
import { useState, useEffect } from "react";
import { urlRecipes } from "../endpoints";
import { urlIngredient } from "../endpoints";
import axios from "axios";
import { useAuth } from "./AuthContext";
import Select from 'react-select';




const DodawaniePrzepisu = () => {
  const [Nazwa, setNazwa] = useState("");
  const [skladnik, setskladnik] = useState([{ nazwa: "", ilosc: "", jednostka: "" }]);
  const [trudnosc, setTrudnosc] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [opis, setOpis] = useState("");
  const [czas, setCzas] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [blad, setblad] = useState(false);

  // Check if user is logged in
  const {isLoggedIn} = useAuth();

  const {getResJsonToken} = useAuth();

  const handleNazwa = (event) => {
    //nazwa
    setNazwa(event.target.value);
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
      setskladnik([{ nazwa: "", ilosc: "" }]);
    } catch (error) {
      console.error("Błąd podczas pobierania składników:", error);
    }
  };

  const handleSkladnik = (event, index, key) => {
    const updatedskladnik = [...skladnik];
    updatedskladnik[index][key] = event.target.value; // składkik i ilosc
    setskladnik(updatedskladnik);
  };

  const handleDodawanko = () => {
    setskladnik([...skladnik, { nazwa: "", ilosc: "", jednostka: "" }]); //dodane skladniki
  };

  const handleTrudnosc = (event) => {
    setTrudnosc(event.target.value);
  };

  const options = [
    { value: 1, label: 'Vegetarian' },
    { value: 2, label: 'Vegan' },
    { value: 3, label: 'Meat' },
    { value: 4, label: 'Fast food' },
    { value: 5, label: 'Inne' },
   
  ];

  const handleTypeSelect = (selectedOptions) => {
    setSelectedTypes(selectedOptions.map((option) => option.value));
  };

  const handleOpis = (event) => {
    setOpis(event.target.value);
  };

  const handleCzas = (event) => {
    setCzas(event.target.value);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let res = await fetch(urlRecipes, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${getResJsonToken()}`
          

        },
        body: JSON.stringify({
         
          name: Nazwa,
          description: opis,
          difficultyLevelId: trudnosc,
          preparationTime: czas,
          types: selectedTypes.map((type,name) => ({ typeId: type ,name:"" })),
          ingredients: skladnik.map(({ nazwa, ilosc, jednostka }) => ({
            name: nazwa,
            amount: ilosc,
            unit: jednostka
          }))
        })
      });

      let resJson = await res.json();
      document.cookie = `resJson=${resJson}; expires=${expirationDate.toUTCString()}; path=/`;

      if (res.status === 200 ) {
        setNazwa("");
        setskladnik([{ nazwa: "", ilosc: "", jednostka: "" }]);
        setCzas("");
        setOpis("");
        setTrudnosc("");
        setTyp("");
      } 
      else if (res.status === 201)
      {
        setNazwa("");
        setskladnik([{ nazwa: "", ilosc: "", jednostka: "" }]);
        setCzas("");
        setOpis("");
        setTrudnosc("");
        setTyp("");
      }
      else {
        console.log("Błąd!");
      }
        const currentDate = new Date();
        const expirationDate = new Date(
        currentDate.getTime() + 24 * 60 * 60 * 1000
      );
      
    } catch (err) {
      if (err instanceof SyntaxError && err.message.includes('Unexpected end of JSON input')) 
          {
          console.log('Pominięto błąd parsowania JSON');
          setNazwa("");
          setskladnik([{ nazwa: "", ilosc: "", jednostka: "" }]);
          setCzas("");
          setOpis("");
          setTrudnosc("");
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

  return (
    <div className="add_recipe overflow-y-scroll px-4 flex flex-col pb-10  items-center w-full h-full justify-center xs:justify-start text-center">
      {isLoggedIn() ? (
        <div>
          <div className={`${styles.heading2} xs:my-0 my-4 text-white `}>
            Dodaj Przepis
          </div>
          <form onSubmit={handleSubmit}>
            <label className="text-center">
              <input
                type="text"
                value={Nazwa}
                onChange={handleNazwa}
                className="w-full px-4 py-2 -++ rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Nazwa przepisu:"
              />
            </label>

            <label>
              <div className={`${styles.paragraph} my-2 text-dimWhite`}>
                Opis przepisu:
              </div>
              <textarea
                value={opis}
                onChange={handleOpis}
                className="w-full h-40 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Wprowadź opis przepisu..."
              />
            </label>

            <div>
              <div className={`${styles.paragraph} my-2 text-dimWhite`}>
                Wybierz atrybuty przepisu:
              </div>
              <select
                type="number"
                value={trudnosc}
                onChange={handleTrudnosc}
                className="xs:w-48 w-full px-4 py-2 mx-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value={0}>Wybierz trudność</option>
                <option value={1}>Łatwe</option>
                <option value={2}>Średnie</option>
                <option value={3}>Trudne</option>
              </select>
              
              

              <input
                type="number"
                min="0"
                value={czas}
                onChange={handleCzas}
                className="xs:w-48 w-full xs:mt-0 mt-2 px-4 py-2 mx-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Czas przygotowania:"
              />
              
            </div>
            <div>
            <Select
              isMulti
              placeholder="Typy:"
              className="w-full px-4 py-2 -++ rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              options={options}
              value={selectedTypes.map((type) => options.find((option) => option.value === type))}
              getOptionLabel={(option) => option.label} 
              onChange={handleTypeSelect}
            />
            </div>
            

            <div className={`${styles.paragraph} my-2 text-dimWhite`}>
              Wybierz składniki:
            </div>

            <div>
              {skladnik.map((ingredient, index) => (
                <div key={index}>
                  <select
                    className="xs:w-48 w-full px-4 py-2 xs:mb-0 mb-2 mx-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    value={ingredient.nazwa}
                    onChange={(event) => handleSkladnik(event, index, "nazwa")}
                  >
                    <option value="">Wybierz składnik</option>
                    {ingredientList.map((option) => (
                      <option key={option.id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>

                  <input
                    placeholder="Ilosc:"
                    type="number"
                    min="0"
                    value={ingredient.ilosc}
                    onChange={(event) => handleSkladnik(event, index, "ilosc")}
                    className="xs:w-48 w-full px-4 py-2 xs:mb-0  mx-1 mb-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                  />

                <select
                value={ingredient.jednostka}
                onChange={(event) => handleSkladnik(event, index, "jednostka")}
                className="xs:w-48 w-full px-4 py-2 mx-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Wybierz jendostke</option>
                <option value="sztuk">Sztuki</option>
                <option value="gramów">Gramy</option>
                <option value="łyżeczki">Łyżeczki</option>
                <option value="mililitrów">Mililitrów</option>
              </select>
                </div>
              ))}
              <button
                type="button"
                onClick={handleDodawanko}
                className={`${styles.paragraph} text-dimWhite hover:text-white- p-5 mt-3 sm:min-w-[25%] min-w-[100%] border-[1px] focus:border-white hover:border-white border-dimWhite w-[100%] hover:bg-black bg-black rounded-md `}
              >
                Dodaj składnik
              </button>
            </div>

            <button
              type="submit"
              className={`${styles.paragraph} text-dimWhite hover:text-white p-5 xs:mb-0 mb-20 mt-3 sm:min-w-[25%] min-w-[100%] border-[1px] focus:border-white hover:border-white border-dimWhite w-[100%] hover:bg-black bg-black rounded-md `}
            >
              Dodaj przepis
            </button>
          </form>
          <div className={`${styles.heading5} xs:my-0 my-4 text-white `}>
            {success ? <p>Dodano Przepis!</p> : null}
            {blad ? <p>Coś poszło nie tak </p> : null}
          </div>
        </div>
      ) : (
        <div className={`${styles.paragraph} my-48 xs:my-auto text-dimWhite`}>
          Nie masz uprawnień do wyświetlania tej strony!
        </div>
      )}
    </div>
  );
};

export default DodawaniePrzepisu;
