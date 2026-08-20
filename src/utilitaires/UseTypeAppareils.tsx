/**
 * permet de savoir si l'appareil est un mobile ou un ordinateur
 * en se basant sur la largeur de l'ecran
 * retourne "mobile", "tablette" ou "ordinateur" selon la largeur de l'écran
 */

import { useEffect, useState } from "react";

const getTypeAppareil = ():string =>{
    const largeurEcran = window.innerWidth;

    if(largeurEcran <= 768){
        return "mobile"; // mobile
    }

    if(largeurEcran > 768 && largeurEcran <= 1024){
        return "tablette"; // tablette
    }

    return "ordinateur"; // ordinateur
};


export default function UseTypeAppareils() {

    const [typeAppareil, setTypeAppareil] = useState<string>(getTypeAppareil());

    useEffect(() => {
        const handleResize = () => {
            setTypeAppareil(getTypeAppareil());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

  return typeAppareil;
  
}



