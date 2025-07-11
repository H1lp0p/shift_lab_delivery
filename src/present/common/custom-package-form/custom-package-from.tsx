import { useState } from "react";
import type Package from "../../../data/models/package";
import { SmallInput } from "./small-input";

export const CustomPackageForm: React.FC<{onSubmit: (item: Package) => void}> = ({onSubmit}) => {
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            typeof inputData.height == "number" && 
            typeof inputData.width == "number" && 
            typeof inputData.length == "number" && 
            typeof inputData.weight == "number"
        ){
            onSubmit({
                id: "custom",
                name: 'свои размеры',
                length: inputData.length as number,
                width: inputData.width as number,
                height: inputData.height as number,
                weight: inputData.weight as number,
            })
        }
    }

    type field = number | string | null

    const [inputData, setInputData] = useState<{
        length: field,
        width: field,
        height: field,
        weight: field
    }>({
       length: null,
        width: null,
        height: null,
        weight: null
    });

    const handleChange = (input: keyof typeof inputData, value: string) => {
        const val = parseFloat(value)
        let newData = {...inputData}
        if (val > 0){
            newData[input] = val
        }
        else{
            newData[input] = "Введите число больше нуля"
        }

        setInputData(newData);        
    }

    return (
        <form onSubmit={handleSubmit}>
            <SmallInput label="Длина" value={inputData.length} onChange={(e) => handleChange("length", e.target.value)}/>
            <SmallInput label="Ширина" value={inputData.width} onChange={(e) => handleChange("width", e.target.value)}/>
            <SmallInput label="Высота" value={inputData.height} onChange={(e) => handleChange("height", e.target.value)}/>
            <SmallInput label="Вес" value={inputData.weight} onChange={(e) => handleChange("weight", e.target.value)}/>
            {/* <Button type="submit" label="Подтвердить" style={{padding: "4px", justifySelf: "stretch"}}/> */}
            <input type="submit" style={{display: "none"}}/>
        </form>
    )
}