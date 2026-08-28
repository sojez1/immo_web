import { createBrowserRouter } from "react-router-dom";


import LoginPage from "../pages/publiques/LoginPage";
import RechercherMaisonALouer from "../pages/publiques/RechercherMaisonALouer";
import AjouterUnePropriete from "../pages/proprietaires/AjouterUnePropriete";
import PublierUneOffre from "../pages/proprietaires/PublierUneOffre";
import SignalerUnDysfonctionnement from "../pages/locataires/SignalerUnDysfonctionnement";
import PayerLoyer from "../pages/locataires/PayerLoyer";
import MenuNavigation from "./MenuNavigation";
import HomePage from "../pages/publiques/HomePage";
import AppErrorPage from "../pages/AppErrorPage";
import Inscriptions from "../pages/publiques/Inscriptions";
import ListeUsers from "../pages/publiques/ListeUsers";



export const mesRoutes = createBrowserRouter([
    
    {
        path: '/', 
        element: <MenuNavigation />,
        children: [
            {index: true, element:<HomePage/>},
            {path: "login", element: <LoginPage />},
            {path: "rechercher", element: <RechercherMaisonALouer />},
            {path: "payer", element: <PayerLoyer />},
            {path: "signaler", element: <SignalerUnDysfonctionnement />},
            {path: "ajouter", element: <AjouterUnePropriete />},
            {path: "publier", element: <PublierUneOffre />},
            {path: "inscription", element: <Inscriptions/>},
            {path:"listeUtilisateurs", element:<ListeUsers/>},
            {path: "*", element:<AppErrorPage/>} 

        ]
    }      
])

