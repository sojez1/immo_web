import React, { useState } from "react";
import MyTextInput from "../../composants/MyTextInput";
import MyButtons from "../../composants/MyButtons";
import { myAxios } from "../../axios/axios";

import type { newUserRegistrationData } from "../../MyDataTypes";
import { useNavigate } from "react-router-dom";

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
    const [userProfilPhoto, setUserProfilPhoto] = useState<File | null>(null);
    const [imgUrl, setImgUrl]= useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    const navigateTo = useNavigate()
;
    const handleUserDataChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;

        setUserRegistrationData(prev =>({
            ...prev,
            [name]:value
        }));
    }

    const handlephoto = (e:React.ChangeEvent<HTMLInputElement>)=>{

        const userPhoto = e.target.files?.[0];
        if(!userPhoto){
            setErrorMessage("Vous devez choisir une image")
            return;
        }

        if(!userPhoto?.type.startsWith("image/")){
            setErrorMessage("Vous devez choisir un fichier de type image");
            return;            
        }

        if(userPhoto.size > (2*1024*1024)){
            setErrorMessage("la taille du fichier ne doit pas exceder 2 Mo");
            return;
        }

        setUserProfilPhoto(userPhoto);

        const imgUrl = URL.createObjectURL(userPhoto);
        setImgUrl(imgUrl);
        
        
        

    }

    const deletephoto = ()=>{
        setImgUrl("");
    }

    const prendePhotoWithCamera = async ()=>{
        try{
            const stream = navigator.mediaDevices.getUserMedia({
                audio: false,
                video: true,
            });

        }catch(e){
            setErrorMessage("impossible d'acceder a la camera de l'appareil");
            return;
        }

    }

    const handleSubmit = async (e:React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const userFormData = new FormData();
        if(userProfilPhoto){
            userFormData.append("photo", userProfilPhoto);
        }

        userFormData.append("userdto", new Blob([JSON.stringify(userRegistrationData)], {type: "application/json"}));

        await myAxios.post(saveNewUserUrl, userFormData);
        setErrorMessage("enregistrement reussi");
        setImgUrl(null);
        setUserRegistrationData(defaultUserData);
        navigateTo("login");

    }


  return (
    <div className="container flex d-flex flex-column">
        <p>Inscription notre site de gestion des immobiliers</p>
        <form onSubmit={handleSubmit}>
            <div>
                <MyTextInput label="nom" name="nom" value={userRegistrationData.nom} onValueChange={handleUserDataChange} required/>
                <MyTextInput label="prenoms" name="prenoms" value={userRegistrationData.prenoms} onValueChange={handleUserDataChange} required/>
                <MyTextInput label="username" name="username" value={userRegistrationData.username} onValueChange={handleUserDataChange}/>
                <MyTextInput label="email" name="email" value={userRegistrationData.email} onValueChange={handleUserDataChange} required/>
                <MyTextInput label="password" name="password" value={userRegistrationData.password} onValueChange={handleUserDataChange} required/>
            </div>

            {/** Ajout de la photo de l'utilisateur */}
            <div className="d-flex flex-column">
                <div className="d-flex flex-row gap-3">
                    <label htmlFor="photo" className="btn btn-secondary btn-sm">Selectionner une photo</label>
                    <label htmlFor="photo" className="btn btn-secondary btn-sm">prendre une photo</label>
                    <label htmlFor="photo" className="btn btn-secondary btn-sm">Supprimer la photo</label>
                </div>

                {
                    imgUrl && <img src={imgUrl} alt="apercu photo"/>
                }
                  
                <input className="img" id="photo" type="file" accept="image/*" onChange={handlephoto} hidden/>
            </div>

            {/** Message d'erreur */}
            <div>
                {errorMessage && <p className="text text-danger">{errorMessage}</p>}
            </div>
            
            <MyButtons label="soumettre" type="submit"/>
        </form>
    </div>
  )
}
