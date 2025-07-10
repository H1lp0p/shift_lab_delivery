import type BaseProps from "../common/base-props";
import css from './header.module.css'

export interface HeaderItemProps extends BaseProps{
    preffix?: React.ReactNode,
    title: string,
    isChoosed?: boolean
}

export const HeaderItem : React.FC<HeaderItemProps> = (props) => {
    const {preffix, title, isChoosed = false, style, className} = props

    return (

        <div className={`${css.headerItem} ${className}`} style={{color: isChoosed? "#1975FF": undefined, ...style}}>
            {preffix}
            <span style={{alignSelf: "center", marginLeft: preffix? "16px" : undefined}}>{title}</span>
        </div>

    );
}