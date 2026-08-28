import { motion } from "motion/react";

type buttonProps = {
    label: string;
    type?: "reset" | "submit" | "button"
    actionFn?: React.MouseEventHandler<HTMLButtonElement>
    className?: string
}


export default function MyButtons({label, type="button", actionFn, className="btn btn-primary btn-sm"}:buttonProps) {
  return (
    <motion.button 
        whileTap={{scale:1.15}}
        onClick={actionFn}
        type={type}
        className={className}
    >{label}</motion.button>
  )
}
