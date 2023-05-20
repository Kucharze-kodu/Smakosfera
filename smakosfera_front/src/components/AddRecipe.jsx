
import { styles } from "../style";
import React, { useState } from 'react';

const DodawaniePrzepisu = () => {
  
  const [Nazwa, setNazwa] = useState('');
  const [skladnik, setskladnik] = useState([{nazwa: '', ilosc: ''}]);
  

  const handleNazwa = (event) => {        //nazwa
    setNazwa(event.target.value);
  };

  const handleSkladnik = (event, index, key) => {
    const updatedskladnik = [...skladnik];
    updatedskladnik[index][key] = event.target.value;   // składkik i ilosc
    setskladnik(updatedskladnik);
  };

 
  const handleDodawanko = () => {
    setskladnik([...skladnik, { nazwa: '', ilosc: '' }]);         //dodane skladniki 
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Tu trzeba bekent

    // Zresetuj formularz
    setNazwa('');
    setskladnik([{ nazwa: '', ilosc: '' }]);
    
  };

  return (
    <div className="overflow-auto flex flex-col p-3 items-center w-full h-full justify-center xs:justify-start md:my-10 text-center Hover:text-black">
    <div className={`${styles.heading2 } hover:text-black"` }>Dodaj Przepis !!</div>
    
    <form onSubmit={handleSubmit}>
      <label className="overflow-auto flex flex-col p-3 items-center w-full h-full justify-center xs:justify-start md:my-1 text-center Hover:text-black">
        <input type="text" value={Nazwa} onChange={handleNazwa} placeholder="Nazwa przepisu:" />
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
            />

            <input
             placeholder="Ilosc:"
              type="text"
              value={ingredient.quantity}
              onChange={(event) => handleSkladnik(event, index,'ilosc')}
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
