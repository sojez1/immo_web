import { useState } from "react";
import MyTextInput from "../../composants/MyTextInput";
import { motion } from "motion/react";

type loginProps = {
  username: string;
  password: string
};

const defaultLoginData:loginProps = {
  username: "",
  password : ""
}

export default function LoginPage() {

  const [loginData, setLoginData] = useState<loginProps>(defaultLoginData)

  const handleLoginDataChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target;
    setLoginData(prev =>({
      ...prev,
      [name]:value
    }));
     
  };

  const handleBtnSubmit = (e:React.SubmitEvent<HTMLFormElement>)=>{
    e.preventDefault();
    alert(loginData.username+" "+loginData.password);
  }
  
  
  return (
    <div className="container">
        <div>
          <img
            src='src\assets\logo_immo_app.svg'
            alt="..."
            className="img-fluid"
          />
        </div>
        <h1>Authentification de l'utilisateur</h1>
        <form onSubmit={handleBtnSubmit}>
            <MyTextInput required label="username or email" name="username" value={loginData.username} onValueChange={handleLoginDataChange} />
            <MyTextInput required label="password" name="password" type="password" value={loginData.password} onValueChange={handleLoginDataChange} />
            <motion.button whileTap={{scale:1.15}}>Valider</motion.button>
        </form>
    </div>
  )
}
