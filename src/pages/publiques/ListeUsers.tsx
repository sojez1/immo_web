import { useEffect, useState } from "react";
import { myAxios } from "../../axios/axios"

type userDataType = {
    id: number;
    nom: string;
    prenoms:string;
    username:string;
    email:string;
    actif: boolean;
    emailValide: boolean
}

const listeUsers_url = "/utilisateurs/profil/all-users"

export default function ListeUsers() {

    const [listeUtilisateur, setListeUtilisateur] = useState<userDataType[]>([] as userDataType[]);
    const [messageInfo, setMessageInfo] = useState("");
    const [loading, setLoading] = useState(true);

    const loadUserList = async ()=>{
        const result = await myAxios.get(listeUsers_url, {
            params:{
                numPage:0,
                pageSize: 2,
                champATrier: "nom",
                ordreTrie: "asc"
            }
        });
        return result.data;
    }

    useEffect(()=>{
        const liste = async()=>{
            try{
                setLoading(true);
                const maListe = await loadUserList();
                setListeUtilisateur(maListe.content);
            }catch(err){
                setMessageInfo("Impossible de charger la liste des utilisateurs");
            }finally{
                setLoading(false);
            }
        };
        liste();
    },[]);

    if(messageInfo){
        return <p>{messageInfo}</p>
    }

    if(loading){
        return <p>Chargement des donnees en cours ...</p>
    }


  return (
    <div>
        <p>Liste des utilisateurs de l'application</p>
        <table className="table table-stripped">
            <thead>
                <th>id</th>
                <th>nom</th>
                <th>prenoms</th>
                <th>username</th>
                <th>email</th>
                <th>statut</th>
                <th>email valide</th>
                <th>action</th>

            </thead>
            <tbody>
                {listeUtilisateur.map(utilisateur => <tr key={utilisateur.id}>
                    <td>{utilisateur.nom}</td>
                    <td>{utilisateur.prenoms}</td>
                    <td>{utilisateur.username}</td>
                    <td>{utilisateur.email}</td>
                    <td>{utilisateur.actif?"actif":"inactif"}</td>
                    <td>{utilisateur.emailValide?"valide":"invalide"}</td>

                </tr>)}
            </tbody>

        </table>

    </div>
  )
}
