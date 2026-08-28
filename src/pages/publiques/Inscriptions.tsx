import React, { useState } from "react";
import MyTextInput from "../../composants/MyTextInput";
import MyButtons from "../../composants/MyButtons";
import { myAxios } from "../../axios/axios";

type newUserRegistrationData = {
    nom: string;
    prenoms:string;
    username:string;
    email:string;
    password:string
}

const defaultUserData = {
    nom: "",
    prenoms:"",
    username:"",
    email:"",
    password:""
}

const saveNewUserUrl = "/utilisateurs/profil/new-user";

export default function Inscriptions() {
    const [userRegistrationData, setUserRegistrationData] = useState<newUserRegistrationData>(defaultUserData);

    const handleUserDataChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;

        setUserRegistrationData(prev =>({
            ...prev,
            [name]:value
        }));
    }

    const handleSubmit = async (e:React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault();
        await myAxios.post(saveNewUserUrl, userRegistrationData);
    }


  return (
    <div className="container">
        <p>Inscription notre site de gestion des immobiliers</p>
        <form onSubmit={handleSubmit}>
            <MyTextInput label="nom" name="nom" value={userRegistrationData.nom} onValueChange={handleUserDataChange} required/>
            <MyTextInput label="prenoms" name="prenoms" value={userRegistrationData.prenoms} onValueChange={handleUserDataChange} required/>
            <MyTextInput label="username" name="username" value={userRegistrationData.username} onValueChange={handleUserDataChange}/>
            <MyTextInput label="email" name="email" value={userRegistrationData.email} onValueChange={handleUserDataChange} required/>
            <MyTextInput label="password" name="password" value={userRegistrationData.password} onValueChange={handleUserDataChange} required/>
            <MyButtons label="soumettre" type="submit"/>
        </form>
    </div>
  )
}
