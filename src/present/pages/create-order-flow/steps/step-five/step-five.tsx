import { useState } from "react"
import { useMySelector } from "../../../../../domain/hooks/my-selectior"
import { NavButtons } from "../navigation-buttons/navigation-buttons"
import { Input } from "../../../../common/input/input"
import { useMyDispatch } from "../../../../../domain/hooks/my-dispatch"
import { stepFive } from "../../../../../domain/redux/slices/create-order-flow"
import { HelpIco } from "../../../../icons"

import css from './step-five.module.css'

export const StepFivePage : React.FC = () => {

    type inputField = {
        value?: string | null,
        error?: string
    }

    const initData = useMySelector(st => {
        return st.createOrder.receiverAddress
    })

    const [formState, setFormState] = useState<{
        street: inputField,
        house: inputField,
        apartment: inputField,
        comment: inputField,
        isNonContact: boolean,

    }>({
        street: {value: initData?.street || null},
        house: {value: initData?.house  || null},
        apartment: {value: initData?.apartment  || null},
        comment: {value: initData?.comment  || null},
        isNonContact: false,
    })

    const handleRequired = (key: keyof typeof formState, val: string) => {
        if (key == "isNonContact") return;
        let newState = {...formState}
        newState[key].value = val
        newState[key].error = undefined
        if (val == ""){
            newState[key].error = "Это поле обязательно"
        }
        setFormState(newState)
        setValidity(isValid())
    }

    const handleNotRequired = (key: keyof typeof formState, val: string) => {
        if (key == "isNonContact") return;
        let newState = {...formState}
        newState[key].value = val
        setFormState(newState)
        setValidity(isValid())
    }

    const handleCheckbox = (val: boolean) => {
        let newState = {...formState}
        newState.isNonContact = val

        setFormState(newState)
        setValidity(isValid())
    }

    const isValidField = (key: keyof typeof formState) => {
        if (key == "isNonContact") return true;
        return formState[key].error === undefined && formState[key].value != null
    }

    const isValid = () => {
        return isValidField("street") && isValidField("house") && isValidField("apartment")
    }

    console.log(formState);
    
    const dispatch = useMyDispatch();

    const onSubmit = () => {
        if (validity){
            dispatch(stepFive({
                receiverAddress: {
                    street: formState.street.value!,
                    house: formState.house.value!,
                    apartment: formState.apartment.value!,
                    comment: formState.comment.value || undefined,
                    isNonContact: false
                }
            }))
        }
    }

    const [validity, setValidity] = useState<boolean>(isValid())

    const [helpVisibility, setVisibility] = useState<boolean>(false);

    return (
        <div style={{display: "flex", flexDirection: "column", gap: 24}}>

            <Input 
            type={"text"}
            label="Улица" 
            placeholder="Улица"
            value={formState.street.value || undefined}
            validationError={formState.street.error}
            onChange={(e) => handleRequired("street", e.target.value)}/>

            <Input 
            type={"text"}
            label="Номер дома" 
            placeholder="Номер дома"
            value={formState.house.value || undefined}
            validationError={formState.house.error}
            onChange={(e) => handleRequired("house", e.target.value)}/>

            <Input 
            type={"text"}
            label="Номер квартиры" 
            placeholder="Номер квартиры"
            value={formState.apartment.value || undefined}
            validationError={formState.apartment.error}
            onChange={(e) => handleRequired("apartment", e.target.value)}/>

            <Input 
            type={"text"}
            label="Заметка" 
            placeholder="Заметка"
            value={formState.comment.value || undefined}
            validationError={formState.comment.error}
            onChange={(e) => handleNotRequired("comment", e.target.value)}/>

            <div style={{position: "relative", display: 'flex', flexDirection: "row", gap: 8, alignItems: "center"}}>
                <label className={css.checkboxLabel}>
                    <input type="checkbox" value={formState.isNonContact.toString()} onChange={(e) => handleCheckbox(e.target.checked)}/> 
                    <span>Оставить заказ у двери</span>
                </label>
                <span onClick={() => setVisibility(true)}><HelpIco/></span>
                
                <div className={css.help} style={{display: helpVisibility ? "flex" : "none"}}>
                    <div style={{display: 'flex', flexDirection: "row", justifyContent: "space-between"}}><span style={{fontSize: 12, lineHeight: "16px"}}>Бесконтактная доставка</span> <span onClick={() => setVisibility(false)} style={{display: "flex", alignItems: "center"}}>X</span></div>
                    <span className={css.subText}>
                        Курьер привозит заказ, оставляет его у двери и уходит, а вам приходит уведомление на телефон о том, что заказ доставлен
                    </span>
                </div>
            </div>

            <NavButtons onSubmit={onSubmit} curPage={5} active={validity}/>
        </div>
    )
}