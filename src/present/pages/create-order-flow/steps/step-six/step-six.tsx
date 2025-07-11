import { useState } from "react"
import { useMySelector } from "../../../../../domain/hooks/my-selectior"
import { NavButtons } from "../navigation-buttons/navigation-buttons";
import { useMyDispatch } from "../../../../../domain/hooks/my-dispatch";
import { stepSix } from "../../../../../domain/redux/slices/create-order-flow";

import css from './step-six.module.css'

export const StepSixPage: React.FC = () => {

    const initData = useMySelector(state => state.createOrder.payer)

    const [select, setSelect] = useState< "RECEIVER" | "SENDER">(initData);
    
    const dispatch = useMyDispatch();

    const handleSubmit = () => {
        dispatch(stepSix({
            payer: select
        }))
    }
    

    return (
        <div style={{display: "flex", flexDirection: "column", gap: 40}}>
        <div style={{display: "flex", flexDirection: "column", gap: 16}}>
            <label className={css.radioLabel}>
                <input type="radio" name="payer" checked={select == "RECEIVER"} onChange={() => setSelect("RECEIVER")}/>
                Получатель
            </label>
            <label className={css.radioLabel}>
                <input type="radio" name="payer" checked={select == "SENDER"} onChange={() => setSelect("SENDER")}/>
                Отправитель
            </label>
        </div>

            <NavButtons curPage={6} onSubmit={handleSubmit}/>
        </div>
    )
}