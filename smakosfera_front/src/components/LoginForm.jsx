import { styles } from "../style";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import  useForm  from '../hooks/useForm';
import { saveAs } from 'file-saver';

const getFreshModel = () =>({
  email:'',
  password:''
})

const LoginForm = () => {
  
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange
  } = useForm(getFreshModel);
  
  const handleSubmit= e=>{
    e.preventDefault();
    if(validate()){
      console.log(values);
      handleSave();
    }
  }

  const handleSave = () => {
    const jsonStr = JSON.stringify(values, null, 2);

    const blob = new Blob([jsonStr], { type: 'application/json' });

    saveAs(blob, 'data.json'); 
  };

  const validate = () =>{
    let temp = {}
    temp.email = (/\S+@\S+\.\S+/).test(values.email)?"":"Emai nie jest poprawny."
    temp.password = values.passward!=""?"":"Pole wymagane."
    setErrors(temp)
    return Object.values(temp).every(x => x == "")
  }

  return (
    <div className={`${styles.background} flex flex-row items-center`}>
      <div className="flex md:flex-row flex-col h-[90%] md:h-[75%] w-full border-[2px] border-white mx-5 lg:mx-48">
        <Link to="/" className="w-full">
          <div className="flex items-center md:items-top justify-center  md:h-full border-b-[1px] md:border-b-[0px] border-r-[0px] md:border-r-[1px] border-r-dimWhite border-b-dimWhite ">
            <img className="sm:p-24 md:p-16 p-12" src={logo} />
          </div>
        </Link>

        <div className="overflow-auto flex flex-col p-3 items-center w-full h-full justify-center xs:justify-start md:my-10 text-center">
          <div className={`${styles.heading2}`}>Zaloguj się!</div>
          <form className="flex flex-col w-[75%]" onSubmit={handleSubmit}>
            <input
              type="text"
              id="email"
              name="email"
              title=""
              value={values.email}
              onChange={handleInputChange}
              className={`${styles.paragraph} bg-dark border-[1px] text-left pl-2 mt-3 border-dimWhite w-[100%] hover:bg-black focus:bg-black`}
              placeholder="Email:"
              maxLength={100}
              required
              
            ></input>
            <input
              type="password"
              id="password"
              name="password"
              title=""
              value={values.password}
              onChange={handleInputChange}
              className={`${styles.paragraph} bg-dark border-[1px] text-left pl-2 mt-3 border-dimWhite w-[100%] hover:bg-black ] focus:bg-black`}
              placeholder="Hasło:"
              maxLength={250}
              required
            ></input>
            <button
              type="submit"
              className={`${styles.paragraph} p-5 mt-3 sm:min-w-[25%] min-w-[100%] border-[1px] focus:border-white hover:border-white border-dimWhite w-[100%] hover:bg-black bg-black rounded-[15px] `}
            >
              Wyślij!
            </button>
          </form>
          <Link
            to="/register"
            className={`${styles.paragraph} my-1 cursor-pointer opacity-50`}
          >
            Nie masz konta?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
