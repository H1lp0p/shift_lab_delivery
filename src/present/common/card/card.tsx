import type BaseProps from "../base-props";
import css from './card.module.css'

export interface CardProps extends BaseProps{
    variant?: "filled" | "outlined"
}

export const Card : React.FC<React.PropsWithChildren<CardProps>> = ({variant = "filled", children, style, className}) => {
 
    return (
        <div className={`${css.card} ${className}`} data-variant={variant} style={style}>
            {children}
        </div>
    );
}