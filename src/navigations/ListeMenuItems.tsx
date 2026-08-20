
const menuVisiteur = [
    { label: 'Accueil', path: '/' },
    { label: 'À propos', path: '/a-propos' },
    { label: 'Contact', path: '/contact' },
    { label: 'Se connecter', path: '/login' },
    { label: 'S\'inscrire', path: '/register' }
];

const communLocataireProprietaire = [
    {label:'Se deconnecter', path:'/logout'} 

];

const menuProprietaire = [
    ...menuVisiteur,
    ...communLocataireProprietaire,
    { label: 'Publier une offre', path: '/proprietaires/publier' },
    { label: 'Ajouter une propriété', path: '/proprietaires/ajouter' }
];

const menuLocataire = [
    ...menuVisiteur,
    ...communLocataireProprietaire,
    { label: 'Signaler un dysfonctionnement', path: '/locataires/signaler' },
    { label: 'Payer le loyer', path: '/locataires/payer' }
];

export const menus = {
    proprietaire: menuProprietaire,
    locataire: menuLocataire,
    visiteur: menuVisiteur
};