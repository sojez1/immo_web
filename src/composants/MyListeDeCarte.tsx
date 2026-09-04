/**
 * Ce composant permet d'afficher une liste d'objet sous forme de carte a l'ecran.
 * il recoit en paramtere, la liste de carte a afficher et le modele de carte a utiliser pour affichage
 */

import React from "react";


type cartesPresentation<T> = {
    mesObjets: T[];
    modeleDeCarteAutiliser: (uneCarte: T) => React.ReactNode;
}

export default function MyListeDeCarte<T>({mesObjets, modeleDeCarteAutiliser}: cartesPresentation<T>) {

    if(mesObjets.length ==0){
        return <div className="rounded-x1 border border-dashed p-8 text-center">
            <p className="text text-gray-500">Aucun element a afficher</p>
        </div>
    }

    return <div className="grid grid-cols-1 gap-5 sm: grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {
            mesObjets.map((unObjet, index) => <div key={index}>
                {modeleDeCarteAutiliser(unObjet)}
                </div>
            )
        }
    </div> 
}
