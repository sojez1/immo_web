/**
 * Ce composant permet de creer un selecteur generique base sur une liste d'objet
 * Il retourne un string ou un tableau de string contenant les valeurs selectionnees
 */

type selecteurProps<T> = {
    liste: T[];
    label: string,
    name: string;
    valeurAffichee: (keyof T)[];  
    valeurRetournee: keyof T
    multiple?: boolean;
    required?: boolean;
    separateur?: string;
    onSelectionChange: (valeur: string | string[])=> void;
}


export default function MySelecteur<T>({label, name, liste, valeurAffichee, valeurRetournee, required = false, multiple=false, separateur="|", onSelectionChange}: selecteurProps<T>) {

    const handleSelecteurChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        if(multiple){
            const valeursToBeReturn = Array.from(e.currentTarget.selectedOptions).map(chaqOption =>chaqOption.value);
            onSelectionChange(valeursToBeReturn);
        }else{
            onSelectionChange(e.target.value);
        }
    }

  return (
    <div>
        {liste.length > 0 && <div>
            <label htmlFor={name}>{label} {required && <span className="text text-danger">*</span>}</label>
            <select id={name} name={name} onChange={handleSelecteurChange} required={required} multiple={multiple} className="form-select">
                <option key = "" value="">... choisir au besoin ...</option>
                {liste.map(elt => 
                    <option
                        key={String(elt[valeurRetournee])} 
                        value={String(elt[valeurRetournee])}
                    >{
                        valeurAffichee.map(col => String(elt[col])).join(separateur)
                    }</option>)
                }
            </select>

        </div>}
    </div>
    
  )
}
