
import { styles } from "../style";
import React, { useState,useEffect } from 'react';
import { urlAddRecipe } from "../endpoints";
import { urlIngredient } from "../endpoints";
import axios from 'axios';

const DodawaniePrzepisu = () => {
  
  const [Nazwa, setNazwa] = useState('');
  const [skladnik, setskladnik] = useState([{nazwa: '', ilosc: ''}]);
  const [trudnosc, setTrudnosc]= useState('');
  const [opis, setOpis]= useState('');
  const [czas, setCzas]= useState('');
  const [ingredientList, setIngredientList] = useState([]);

  const handleNazwa = (event) => {        //nazwa
    setNazwa(event.target.value);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async() => {
    try {
      const response = await axios.get(urlIngredient);
      setIngredientList(response.data);
      setskladnik([{ nazwa: '', ilosc: '' }]);
    } catch (error) {
      console.error('Błąd podczas pobierania składników:', error);
    }
  };

  const handleSkladnik = (event, index, key) => {
    const updatedskladnik = [...skladnik];
    updatedskladnik[index][key] = event.target.value;   // składkik i ilosc
    setskladnik(updatedskladnik);
  };

  const handleDodawanko = () => {
    setskladnik([...skladnik, { nazwa: '', ilosc: '' }]);         //dodane skladniki 
  };

  const handleTrudnosc = (event) => {
    setTrudnosc(event.target.value);

  };

  const handleOpis = (event) => {
    setOpis(event.target.value);

  };

  const handleCzas = (event) => {
    setCzas(event.target.value);

  };

 
  

  const handleSubmit = async(event) => {
    event.preventDefault();
    
    try{
      let res = await fetch(urlAddRecipe, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          /*name: Nazwa,
          description: opis,
          difficultyLevelId: 1,
          preparationTime: 5,                       
          skladnik: skladnik,
          communityRecipe: true,*/

          "name": "Przykładowy przepis",
          "description": "Opis przepisu",
          "difficultyLevelId": trudnosc,
          "preparationTime": 30,
          "communityRecipe": true,                                // PRZYKLADKOWE DANE 
          "skladniki": ["skladnik1", "skladnik2"]
      
        })
      });
      let resJson = await res.json();

      const currentDate = new Date();
      const expirationDate = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000));

      document.cookie = `resJson=${resJson}; expires=${expirationDate.toUTCString()}; path=/`
      
      if(res.status === 200){
        setNazwa('');
        setskladnik([{ nazwa: '', ilosc: '' }]);
        setCzas('');
        setOpis('');
        setTrudnosc('');}
      else{
        console.log("Błąd!");
      }
    }
    catch(err){
      console.log(err);
    }
    
  };

  return (
    <div className="overflow-auto flex flex-col p-3 items-center w-full h-full justify-center xs:justify-start md:my-10 text-center">
    <div className={`${styles.heading2 } text-white "` }>Dodaj Przepis </div>
    
    <form onSubmit={handleSubmit}>
      <label className="text-center">
        <input type="text" value={Nazwa} onChange={handleNazwa} className="w-100 px-4 py-2 mb-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500" placeholder="Nazwa przepisu:" />
      </label>

      

      <label>
      <h2>Opis przepisu:</h2>
      <textarea
        value={opis}
        onChange={handleOpis}
        className="w-full h-40 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        placeholder="Wprowadź opis przepisu..."
      />
      </label>
     
      <label>
      <h2 className="text-xl font-bold mb-2">Wybierz trudność przepisu:</h2>
      <select type = "number" value={trudnosc} onChange={handleTrudnosc} className="w-48 px-4 py-2 mb-10 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500">
        <option value="0">Wybierz trudność</option>
        <option value="1">Łatwe</option>
        <option value="2">Średnie</option>
        <option value="3">Trudne</option>
      </select>

      <input type="number" min="0" value={czas} onChange={handleCzas} className="w-48 px-4 py-2 mb-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500" placeholder="Czas przygotowania:" />

      </label>

      <label>
      {skladnik.map((ingredient, index) => (
        <div key={index}>
           <select className="w-48 px-4 py-2 mb-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
            value={ingredient.nazwa}
            onChange={(event) => handleSkladnik(event, index, 'nazwa')}
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
            onChange={(event) => handleSkladnik(event, index, 'ilosc')}
            className="w-48 px-4 py-2 mb-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
      ))}
      <button type="button" onClick={handleDodawanko} className={`${styles.paragraph} p-5 mt-3 sm:min-w-[25%] min-w-[100%] border-[1px] focus:border-white hover:border-white border-dimWhite w-[100%] hover:bg-black bg-black rounded-[15px] `}>
        Dodaj składnik
      </button>
    </label>
      
      <button type="submit" className={`${styles.paragraph} p-5 mt-3 sm:min-w-[25%] min-w-[100%] border-[1px] focus:border-white hover:border-white border-dimWhite w-[100%] hover:bg-black bg-black rounded-[15px] `}>Dodaj przepis</button>
    </form>
    </div>
  );
};

export default DodawaniePrzepisu;























































