/**
 * Permet de selectionner une photo, 
 * ou de prendre une photo avec la camera de l'appareil
 * retourne la dite photo sous forme de fichier image/jpeg
 * @returns  photo selectionner ou prise avec la camers
 */

import { useId, useState } from "react"

export default function MyPhotoPicker(imgFile:File) {

    const imgId = useId();
    const [errorMessage, setErrorMessage] = useState("");
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [imgApercu, setImgApercu] = useState("");

    const choisirUnePhoto = ()=>{


    }

    const fairePhotoAvecCamera = ()=>{
        
        // ouvrir la camera
        const cameraStream = navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        })


    }

    const supprimerPhoto = ()=>{
        const photoField = document.getElementById(imgId) as HTMLInputElement;
        if(photoField){
            photoField.value="";
        }

        if(imgApercu){
            URL.revokeObjectURL(imgApercu);
            setImgApercu("");
        }


    }


  return (
    <div>
        <input id={imgId} type="file" accept="image/*" hidden/>
        <img src={imgApercu}/>

    </div>
  )
}
