import { useState } from "react";
import MyTextInput from "../../composants/MyTextInput";
import { motion } from "motion/react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoKey } from "react-icons/io5";
import {FaUser} from "react-icons/fa"
import { myAxios } from "../../axios/axios";
import axios from "axios";

type loginProps = {
  username: string;
  password: string
};

const defaultLoginData:loginProps = {
  username: "",
  password : ""
}

const loginUrl:string = "/utilisateurs/authentication/login";

export default function LoginPage() {

  const navigateTo = useNavigate();

  const [loginData, setLoginData] = useState<loginProps>(defaultLoginData);
  const [errorMessage, setErrorMessage] = useState<String>("");

  const handleLoginDataChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target;
    setLoginData(prev =>({
      ...prev,
      [name]:value
    }));
     
  };

  const handleBtnInscription = ()=>{
    return navigateTo("/inscription")
  };

  const handleBtnSubmit = async (e:React.SubmitEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      setErrorMessage("");
      await myAxios.post(loginUrl, loginData);
      setLoginData(defaultLoginData);      
    } catch (error) {
      if(axios.isAxiosError(error)){
        setErrorMessage("Authentification echoue "+ error.message);
      }else{
        setErrorMessage("Echec de l'authentification");
      }
            
    }
    
  }
  
  
  return (
    <div className="container vh-100">
        <div className="d-flex" style={{maxHeight: "30vh"}}>
          <img
            src='src\assets\logo_immo_app.svg'
            alt="..."
            className="img-fluid"
          />
        </div>

        <div className="d-flex flex-column gap-5" style={{maxHeight: "50vh"}}>
          <form onSubmit={handleBtnSubmit}>
          <h1>Authentification de l'utilisateur</h1>
            <MyTextInput required label="username or email" name="username" value={loginData.username} onValueChange={handleLoginDataChange} icone={FaUser} />
            <MyTextInput required label="password" name="password" type="password" value={loginData.password} onValueChange={handleLoginDataChange} icone={IoKey} />
            {errorMessage && <p className="text text-danger">{errorMessage}</p>}
            <motion.button whileTap={{scale:1.15}}>Valider</motion.button>
        </form>
        <div className="d-flex flex-row">
          <button onClick={handleBtnInscription} className="btn btn-primary gap-5">s'inscrire</button>
          <NavLink to="" className="btn btn-sm btn-primary">reset password</NavLink>
        </div>

        </div>
        
        
    </div>
  )
}
