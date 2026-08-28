import { NavLink, Outlet } from 'react-router-dom';
import { menus } from './ListeMenuItems';
import { useRef } from 'react';

type Roles = "proprietaire" | "locataire" | "visiteur";

type RoleUtilisateur = {
    roleUtilisateur?: Roles
}

export default function MenuNavigation({roleUtilisateur = "visiteur"}:RoleUtilisateur) {
    
    const refBarreDeNavigation = useRef<HTMLDivElement | null>(null);
    const menu = menus[roleUtilisateur];
    
    // Fonction pour fermer le menu après un clic sur un lien de navigation
    const fermerMenu = () => {
        const bootstrapGlobal = (window as any).bootstrap;
        if (refBarreDeNavigation.current && bootstrapGlobal){
            const instanceCollapse = bootstrapGlobal.Collapse.getOrCreateInstance(refBarreDeNavigation.current);
            instanceCollapse.hide();
        }
    }

  return (
    <>
        <header>

            

            {/** menu de navigation */} 
            <nav className="navbar navbar-expand-lg bg-body-tertiary" >

                {/*Creation du bouton hamberger pour le menu sur appareils mobile*/}
                <button className='navbar-toggler' type='button' data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls='navbarSupportedContent' aria-expanded="false" aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div className='collapse navbar-collapse' id='navbarSupportedContent' ref={refBarreDeNavigation}>
                    <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                        {menu.map((item, index) => (
                            <li key={index} className="nav-item">
                                <NavLink className="nav-link" to={item.path} onClick={fermerMenu}>{item.label}</NavLink>
                            </li>
                        ))}
                    </ul>
                </div>  
            </nav>
        </header>
        
        {/** affichage du contenu de la page dans outlet    */} 
        <main>
            <Outlet/>
        </main>
    </>
  )
}
