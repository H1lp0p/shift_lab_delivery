import { useState } from "react";
import type StepProps from "../step-props";
import { Input } from "../../../../common/input/input";
import { NavButtons } from "../navigation-buttons/navigation-buttons";
import { useMyDispatch } from "../../../../../domain/hooks/my-dispatch";
import { stepTwo } from "../../../../../domain/redux/slices/create-order-flow";
import { useMySelector } from "../../../../../domain/hooks/my-selectior";

export const StepTwoPage : React.FC<StepProps> = (props) => {
    
    type inputField = {
        value?: string | null,
        error?: string
    }

    const initData = useMySelector(st => {
        return st.createOrder.receiver
    })

    const [formState, setFormState] = useState<{
        firstname: inputField,
        middlename: inputField,
        lastname: inputField,
        phoneNum: inputField,
    }>({
        firstname: {value: initData?.firstname || null},
        lastname: {value: initData?.lastname  || null},
        middlename: {value: initData?.middlename  || null},
        phoneNum: {value: initData?.middlename  || null},
    })

    const handleFirstname = (val: string) => {
        let newState = {...formState}
        newState.firstname.value = val
        newState.firstname.error = undefined
        if (val === ""){
            newState.firstname.error = "Это поле обязательное"   
        }

        setFormState(newState)
        setValidity(isValid())
    }

    const handleLastname = (val: string) => {
        let newState = {...formState}
        newState.lastname.value = val
        newState.lastname.error = undefined
        if (val === ""){
            newState.lastname.error = "Это поле обязательное"   
        }

        setFormState(newState)
        setValidity(isValid())
    }

    const handleMiddlename = (val: string) => {
        let newState = {...formState}
        newState.middlename.value = val
        newState.middlename.error = undefined

        setFormState(newState)
        setValidity(isValid())
    }

    const handlePhone = (val: string) => {
        let newState = {...formState}
        newState.phoneNum.value = val
        newState.phoneNum.error = undefined
        if (val === ""){
            newState.phoneNum.error = "Это поле обязательное"
        }
        //TODO: phone regex
        else if (false){
            newState.phoneNum.error = "Проверьте введённый номер"
        }

        setFormState(newState)
        setValidity(isValid())
    }

    const isValid = () => {
        return (
            formState.firstname.error === undefined &&
            formState.middlename.error === undefined &&
            formState.lastname.error === undefined &&
            formState.phoneNum.error === undefined
        ) && (
            formState.firstname.value !== null &&
            formState.lastname.value !== null &&
            formState.phoneNum.value !== null
        )
    }

    const onSubmit = () => {
        if (isValid()){
            dispatch(stepTwo({
                receiver: {
                    firstname: formState.firstname.value!,
                    lastname: formState.lastname.value!,
                    middlename: formState.middlename.value || undefined,
                    phone: formState.phoneNum.value!
                }
            }))
        }
    }

    const [validity, setValidity] = useState<boolean>(isValid());
    const dispatch = useMyDispatch();

    console.log(formState);
    

    return (
        <div style={{display: "flex", flexDirection: "column", gap: 24}}>
            <Input 
            type={"text"}
            label="Фамилия" 
            placeholder="Фамилия"
            value={formState.firstname.value || undefined}
            validationError={formState.firstname.error}
            onChange={(e) => handleFirstname(e.target.value)}/>

            <Input 
            type={"text"}
            label="Имя" 
            placeholder="Имя"
            value={formState.lastname.value || undefined}
            validationError={formState.lastname.error}
            onChange={(e) => handleLastname(e.target.value)}/>

            <Input 
            type={"text"}
            label="Отчество" 
            placeholder="Отчество (при наличии)"
            value={formState.middlename.value || undefined}
            validationError={formState.middlename.error}
            onChange={(e) => handleMiddlename(e.target.value)}/>

            <Input 
            type={"text"}
            label="Номер телефона" 
            placeholder="Номер телефона"
            value={formState.phoneNum.value || undefined}
            validationError={formState.phoneNum.error}
            onChange={(e) => handlePhone(e.target.value)}/>

            <NavButtons onSubmit={onSubmit} curPage={2} active={validity}/>

        </div>
    );
}