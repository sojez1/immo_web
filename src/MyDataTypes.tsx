
export type offreLocation = { // pour les contrats de location
    id: number;
    datePublication: Date;
}

export type newUserRegistrationData = { // pour formulaire enregistrement utilisateur (sans id)
    nom: string;
    prenoms:string;
    username:string;
    email:string;
    password:string
}

export type userDataType = Omit<newUserRegistrationData, "password"> & { // utilisateurs avec id utilisateur (provenant de API backend)
    id: number;
    actif: boolean;
    emailValide: boolean
}

export type saveAppartementRequestType = {
        
        immeubleId?: number;
        
        immeubleAppelation?: string;

        immeubleAdresse?: string;

        appelationAppartement: string;

        typeAppartement: string

        nombreChambres: number;

        nombreSallesDeBain: number

        cuisine: boolean

        superficie?: number

        commentaires: string
}