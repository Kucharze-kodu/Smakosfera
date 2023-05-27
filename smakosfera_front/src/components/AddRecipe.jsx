
import { styles } from "../style";
import React, { useState } from 'react';
import { urlAddRecipe } from "../endpoints";
import { urlIngredient } from "../endpoints";

const DodawaniePrzepisu = () => {
  
  const [Nazwa, setNazwa] = useState('');
  const [skladnik, setskladnik] = useState([{nazwa: '', ilosc: ''}]);
  const [trudnosc, setTrudnosc]= useState('');
  const [opis, setOpis]= useState('');
  const [czas, setCzas]= useState('');

  const handleNazwa = (event) => {        //nazwa
    setNazwa(event.target.value);
  };

  const handleSkladnik = (event, index, key) => {
    const updatedskladnik = [...skladnik];
    updatedskladnik[index][key] = event.target.value;   // składkik i ilosc
    setskladnik(updatedskladnik);
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

 
  const handleDodawanko = () => {
    setskladnik([...skladnik, { nazwa: '', ilosc: '' }]);         //dodane skladniki 
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
          name: Nazwa,
          description: opis,
          difficulty: trudnosc,
          preparationTime: czas,
          skladnik: skladnik,
      
        }),
      });
      let resJson = await res.json();

      const currentDate = new Date();
      const expirationDate = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000));

      document.cookie = `resJson=${resJson}; expires=${expirationDate.toUTCString()}; path=/`
      
      if(res.status === 200){
        setNazwa('');
        setskladnik([{ nazwa: '', ilosc: '' }])}
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
      <select value={trudnosc} onChange={handleTrudnosc} className="w-48 px-4 py-2 mb-10 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500">
        <option value="">Wybierz trudność</option>
        <option value="latwe">Łatwe</option>
        <option value="srednie">Średnie</option>
        <option value="trudne">Trudne</option>
      </select>

      <input type="text" value={czas} onChange={handleCzas} className="w-48 px-4 py-2 mb-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500" placeholder="Czas przygotowania:" />

      </label>

      <label>
        {
        skladnik.map((ingredient, index) => (
          <div key={index}>
            <input
             placeholder="Składnik:"
              type="text"
              value={ingredient.nazwa}
              onChange={(event) => handleSkladnik(event, index,'nazwa')}
              className="w-48 px-4 py-2 mb-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
            />

            <input
             placeholder="Ilosc:"
              type="text"
              value={ingredient.quantity}
              onChange={(event) => handleSkladnik(event, index,'ilosc')}
              className="w-48 px-4 py-2 mb-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            
          </div>
        ))
        }
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






















































/*
const AddRecipe = () => {

    const[Nazwa,setNazwa] = useState("");
    const[Skladniki, setSkladniki] = useState([]);
    const[Nazwa_skladnika,setNazwa_skladnika ] = useState("");
    const[Ilosc,setIlosc] = useState("");

    const Submit = (xd) => 
    {
      xd.preventDefault();

      const przepisik = 
      {
        Nazwa_skladnika : Nazwa_skladnika,
        Ilosc: Ilosc
      };

      setSkladnik([skladniki, nowySkladnik]);
      setNazwa_skladnika("");
      setIlosc("");
    }
    return(

        <div className="overflow-auto flex flex-col p-3 items-center w-full h-full justify-center xs:justify-start md:my-10 text-center">
          <div className={`${styles.heading2}`}>Dodaj Przepis !!</div>
          <form onSubmit={Submit}>
          <label>
            Nazwa dania:
            <input
              type="text"
              className="rounded-lg w-full pr-[5.3rem] pl-10 p-2 border-[1px] border-dimWhite hover:border-white"
              value={Nazwa}
              onChange={(xd) => setNazwa(xd.target.value)}
            />
          </label>

          <label>
            Nazwa Skladnika:
            <input
              type="text"
              className="rounded-lg w-full pr-[5.3rem] pl-10 p-2 border-[1px] border-dimWhite hover:border-white"
              value={Nazwa_skladnika}
              onChange={(xd) => setNazwa_skladnika(xd.target.value)}
            />
          </label>

          <label>
            Ilosc Skladnika:
            <input
              type="text"
              className="rounded-lg w-full pr-[5.3rem] pl-10 p-2 border-[1px] border-dimWhite hover:border-white"
              value={Ilosc}
              onChange={(xd) => setIlosc(xd.target.value)}
            />
          </label>

          <button
              type="submit"
              className={`${styles.paragraph} p-5 mt-3 sm:min-w-[25%] min-w-[100%] border-[1px] focus:border-white hover:border-white border-dimWhite w-[100%] hover:bg-black bg-black rounded-[15px] `}>
            
              Wyślij!
           </button>
        </form>

       <h2>Lista składników:</h2>
        <p>Nazwa dania: {Nazwa}</p>

      <ul>
        {Skladniki.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name} - {ingredient.quantity}
          </li>
        ))}
      </ul>

        </div>

    )
};

export default AddRecipe;
*/
