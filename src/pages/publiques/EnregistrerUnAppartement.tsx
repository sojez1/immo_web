import { useEffect, useState } from "react";
import MySelecteur from "../../composants/MySelecteur";
import { myAxios } from "../../axios/axios";
import MyTextInput from "../../composants/MyTextInput";
import type { saveAppartementRequestType } from "../../MyDataTypes";
import { useNavigate } from "react-router-dom";
import MyButtons from "../../composants/MyButtons";
import axios from "axios";

type immeubleType = {
    id: number;
    appelationCourante: string;
    adresse?: string
}

const defaultAppartementData:saveAppartementRequestType = {
    immeubleId: 0,
    immeubleAppelation: "",
    immeubleAdresse: "",
    appelationAppartement: "",
    typeAppartement: "",
    nombreChambres: 1,
    cuisine: false,
    nombreSallesDeBain: 1,
    superficie: 0,
    commentaires: ""
}

const url_immeubles_utilisateur = "/proprietaires/mes-immeubles";
const url_saveAppartement = "/proprietaires/immeuble/appartements/enregistrer";

export default function EnregistrerUnAppartement() {

    const [listeImeuble, setListeImmeuble] = useState<immeubleType[]>([]);
    const [appartementData, setAppartementData] = useState<saveAppartementRequestType>(defaultAppartementData);
    const[isImeubleSelected, setIsImeubleSelected] = useState(false);
    const [errorMessage, setErrormessage] = useState("");
    const navigateTo = useNavigate();

    {/** Recuperer la liste des immeubles appartenant a l'utilisateir connecte */}
    const immeubles = async():Promise<immeubleType[]>=>{
        const result = await myAxios.get<immeubleType[]>(url_immeubles_utilisateur);
        return result.data;
    }

    {/** Initialisation de la liste des immeubles appartenant a l'utilisateur connecte */}
    useEffect( ()=>{
        const chargerImmeuble = async()=>{
            try {
                const liste = await immeubles(); 
                setListeImmeuble(liste);                
            } catch (error) {
                setErrormessage("erreur lors du chargement de la liste des immeubles "+ error);                
            }
        };
        chargerImmeuble();
              
    },[]);



    {/** Mettre a jour les donnees concernant l'appartement a chaque changement */}
    const handleImmeubleChange = (e:string | string[])=>{

        if(Array.isArray(e)){
            return;
        }
        
        if(e === ""){
            setAppartementData(prev =>({
                ...prev,
                immeubleId: 0,
                immeubleAppelation: "",
                immeubleAdresse: "",
            }))            
            setIsImeubleSelected(false)
        }else{
            const selectedImeubleId = Number(e);
            const immeuble = listeImeuble.find(item => item.id == selectedImeubleId );
            setAppartementData(prev => ({
                ...prev,
                immeubleId:selectedImeubleId,
                immeubleAppelation: immeuble?.appelationCourante,
                immeubleAdresse: immeuble?.adresse
            }))
            setIsImeubleSelected(true);           
        }        
    }


    {/** Mettre a jour les infos de l'appartement */}
    const handleAppartementDataChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value, type, checked} = e.target;
        setAppartementData(prev =>({
            ...prev,
            [name]:type==="number"?Number(value): type ==="checkbox"?checked :value
        }))
    }

    const handleSubmitbtn = async (e: React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
            await myAxios.post(url_saveAppartement, appartementData);
            navigateTo("ajouter");            
        } catch (error) {
            if(axios.isAxiosError(error)){
                setErrormessage("Echec de l'enregistrement de l'appartement "+error.message)
            }else{
                setErrormessage("echec de l'enregistrement de l'appartement")
            }            
        }
        
    }



  return (
    <div className="container">
        <p>ENREGISTREMENT D'UN APPARTEMENT OU UNITE LOCATIVE</p>
        <form onSubmit={handleSubmitbtn}>            

            
            {/** Information concernant l'immeuble */}
            <fieldset>
                <legend>Informations sur l'immeuble contenant l'appartement</legend>
                <MySelecteur label="Immeuble" name="imeuble" liste={listeImeuble} valeurAffichee={["appelationCourante"]} valeurRetournee="id" onSelectionChange={handleImmeubleChange}/>
                <div>
                    <MyTextInput label="Nom de l'appartement" name="immeubleAppelation" value={appartementData.immeubleAppelation??""} onValueChange={handleAppartementDataChange} desactiver={isImeubleSelected} />
                    <MyTextInput label="adresse" name="immeubleAdresse" value={appartementData.immeubleAdresse??""} onValueChange={handleAppartementDataChange} desactiver={isImeubleSelected}/>
                </div>
                
            </fieldset>

            {/** Information concernant l'appartement ou l'unite locative */}

            <fieldset>
                <legend>Details de l'appartement ou de l'unite locative</legend>
                <div>
                    <MyTextInput label="Nom de l'appartement" name="appelationAppartement" value={appartementData.appelationAppartement} onValueChange={handleAppartementDataChange} required/>
                    <MyTextInput label="Nombre de chambre" name="nombreChambres" type="number" value={appartementData.nombreChambres} onValueChange={handleAppartementDataChange} required/>
                    <MyTextInput label="nombre de salle de bain" name="nombreSallesDeBain" type="number" value={appartementData.nombreSallesDeBain} onValueChange={handleAppartementDataChange} required/>
                    <MyTextInput label="type" name="typeAppartement" value={appartementData.typeAppartement} onValueChange={handleAppartementDataChange} required/>
                    <div>
                        <label>Cuisine: </label>
                        <input type="checkbox" name="cuisine" checked={appartementData.cuisine} onChange={handleAppartementDataChange} />
                    </div>
                    <MyTextInput label="Superfice" name="superficie" type="number" value={appartementData.superficie??0} onValueChange={handleAppartementDataChange}/>
                    <MyTextInput label="commentaires" name="commentaires" value={appartementData.commentaires} onValueChange={handleAppartementDataChange}/>
                </div>
            </fieldset>
            {
                errorMessage && <p className="text text-danger">{errorMessage}</p>
            }
            <MyButtons label="enregistrer" type="submit"/> 
        </form>
    </div>
  )
}
