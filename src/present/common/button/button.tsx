import type BaseProps from "../base-props";
import css from './button.module.css'

export interface ButtonProps extends BaseProps{
    variant?: "filled" | "outlined",
    label?: string,
    onClick?: () => void,
    disabled?: boolean,
    type?: "submit"
}

export const Button: React.FC<ButtonProps> = (props) => {
    
    const {variant = "filled", label = 'BUTTON', onClick, disabled = false, type, className, style} = props
    
    return (
        <button className={css.button + ` ${className}`} style={{...style}} onClick={onClick} disabled={disabled} data-variant={variant} type={type}>{label}</button>
    )
}