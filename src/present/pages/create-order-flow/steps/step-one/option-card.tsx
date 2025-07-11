import type DeliverOption from "../../../../../data/models/deliver-option";
import type BaseProps from "../../../../common/base-props";
import { Card } from "../../../../common/card/card";
import { BusIco, PlaneIco } from "../../../../icons";

import css from './step-one.module.css'

export interface DeliverOptionCardProps extends BaseProps{
    option: DeliverOption,
    onClick: (option: DeliverOption) => void
}

export const DeliverOptionCard : React.FC<DeliverOptionCardProps> = (props) => {
    
    const {option, onClick} = props

    return (
        <div onClick={() => onClick(option)} className={css.optionCard}>
            <Card variant="outlined" style={{padding: 16, display: "flex", flexGrow: 1, flexDirection: "column", gap: 24}}>
            <div style={{display: "flex", flexDirection: "row", gap: 16}}>
                <span style={{padding: "12px"}} className={css.ico}>
                    {option.type == "DEFAULT" && <BusIco/>}
                    {option.type == "EXPRESS" && <PlaneIco/>}
                </span>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <span className={css.subText}>{option.name}</span>
                    <span style={{fontSize: 20, lineHeight: "24px", marginBottom: 24}}>{option.price / 100} ₽</span>
                    <span className={css.subText}>{option.days} рабочих дней</span>
                    {/* TODO: normal days display */}
                </div>
            </div>
        </Card>
        </div>
    )
}