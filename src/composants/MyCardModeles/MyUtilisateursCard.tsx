
import type { userDataType } from "../../MyDataTypes"

type userCard = {
    utilisateur: userDataType;
    onView: ()=>void;
    onEdit: ()=>void
}

export default function MyUtilisateursCard({utilisateur, onView, onEdit}:userCard) {

  return (
    <div className="card">
        <div className="flex flex-column">
            <img className="card-img-top" src="" alt="..."/>
            <h3>{utilisateur.prenoms+" "+utilisateur.nom}</h3>
        </div>
        <div className="card-body">
            <p>{utilisateur.email}</p>
            <p>{utilisateur.id}</p>
            <p>{utilisateur.username}</p>
            <p>{utilisateur.emailValide}</p>
            <p>{utilisateur.actif}</p>
            <a className="btn btn-primary" onClick={onView}>Voir</a>
            <a className="btn btn-primary" onClick={onEdit}>Voir</a>
        </div>   
    </div>
  )
}
