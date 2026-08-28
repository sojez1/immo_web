import { useId, useState } from "react"
import { type IconType } from "react-icons";
import { BsEye, BsEyeSlash } from "react-icons/bs";

type textInputProp = {
    label: string,
    name: string,
    type?: "text" | "tel" | "password" | "email",
    required?:boolean,
    className?:string,
    value:string | number,
    onValueChange: React.ChangeEventHandler<HTMLInputElement>,
    placeholder?:string,
    icone?: IconType
}

export default function MyTextInput({label, name, value, onValueChange, type="text", required=false, className="form-control", placeholder, icone:Icone}:textInputProp) {
    const label_id = useId();
    const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="form">
        <label className="form-label w-100 text-start" htmlFor={label_id}>{label}</label>

        <div className="input-group">

            {/** Affichage icone si ajouter */}
            {Icone && <span className="mx-2">
                <Icone size={30} color="red"/>
            </span>
            }

            {/** Champs de saisie */}
            <input 
                id={label_id}
                className={className}
                type={(type=="password" && showPassword)?"text":type}
                required={required}
                value={value}
                onChange={onValueChange}
                name={name}
                placeholder={placeholder}
            />

            {/** Affichage oeil pour visulaiser la saisie si champ password */}
            {
                type == "password" && <button 
                    type="button"
                    className="btn btn-secondary"
                    onClick={()=>setShowPassword(!showPassword)}
                >
                {showPassword?<BsEye/>:<BsEyeSlash/>}
                </button>
            }
            

        </div>
        
        
    </div>
  )
}
