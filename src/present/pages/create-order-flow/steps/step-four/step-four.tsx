import { useState } from "react"
import { useMySelector } from "../../../../../domain/hooks/my-selectior"
import { NavButtons } from "../navigation-buttons/navigation-buttons"
import { Input } from "../../../../common/input/input"
import { useMyDispatch } from "../../../../../domain/hooks/my-dispatch"
import { stepFive, stepFour } from "../../../../../domain/redux/slices/create-order-flow"

export const StepFourPage : React.FC = () => {

    type inputField = {
        value?: string | null,
        error?: string
    }

    const initData = useMySelector(st => {
        return st.createOrder.senderAddress
    })

    const [formState, setFormState] = useState<{
        street: inputField,
        house: inputField,
        apartment: inputField,
        comment: inputField,
    }>({
        street: {value: initData?.street || null},
        house: {value: initData?.house  || null},
        apartment: {value: initData?.apartment  || null},
        comment: {value: initData?.comment  || null},
    })

    const handleRequired = (key: keyof typeof formState, val: string) => {
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
        let newState = {...formState}
        newState[key].value = val
        setFormState(newState)
        setValidity(isValid())
    }

    const isValidField = (key: keyof typeof formState) => {
        return formState[key].error === undefined && formState[key].value != null
    }

    const isValid = () => {
        return isValidField("street") && isValidField("house") && isValidField("apartment")
    }

    console.log(formState);
    
    const dispatch = useMyDispatch();

    const onSubmit = () => {
        if (validity){
            dispatch(stepFour({
                senderAddress: {
                    street: formState.street.value!,
                    house: formState.house.value!,
                    apartment: formState.apartment.value!,
                    comment: formState.comment.value || undefined 
                }
            }))
        }
    }

    const [validity, setValidity] = useState<boolean>(isValid())

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

            <NavButtons onSubmit={onSubmit} curPage={4} active={validity}/>
        </div>
    )
}