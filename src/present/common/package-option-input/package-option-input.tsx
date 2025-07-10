import { useEffect, useState } from "react";
import type BaseProps from "../base-props";
import type Package from "../../../data/models/package";
import { DropDownIco } from "../../icons";
import { useAxios } from "../../../domain/hooks/my-axios";
import { homePage } from "../../../domain/api-path";

import css from './package-option-input.module.css'
import { Input } from "../input/input";
import { Button } from "../button/button";

export interface PackageOptionInputProps extends BaseProps{
    onChange?: (item: Package) => void
}

export const PackageOptionInput : React.FC<PackageOptionInputProps> = ({onChange}) => {

    const [dropdownOpen, setOpen] = useState<boolean>(false);

    const [selectedPackage, setSelected] = useState<Package>();

    const [page, setPage] = useState<0 | 1>(0);

    const [inputStr, setInputStr] = useState<string>("Не выбран")

    const toggleOpen = () => {
        setOpen(!dropdownOpen)
    }

    const handleSelectPackage = (item: Package) => {
        if (onChange){
            onChange(item)
        }
        setInputStr(item.name)
        setOpen(false);
        
    }

    return (
        <div className={css.container}>
            <span style={{marginBottom: 8}}>Размер посылки</span>
            {/* input */}
            <div className={css.inputContainer} onClick={() => toggleOpen()}>
                <span id="input_preffix"></span>
                <span style={{flexGrow: 2}}>{inputStr}</span>
                <span 
                    id="input_suffix" 
                    style={{
                        transform: dropdownOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.1s"
                    }}>
                        <DropDownIco/>
                </span>
            </div>
            {/* dropdown */}
            <div className={css.dropdown} data-visible={dropdownOpen}>
                {/* pager */}
                <div className={css.pager}>
                    <span className={css.pagerItem} data-selected={page==0} onClick={() => setPage(0)}>Примерные</span>
                    <span className={css.pagerItem} data-selected={page==1} onClick={() => setPage(1)}>Точные</span>
                </div>
                <div style={{height: "200px", overflowY: "scroll"}}>
                    {/* page 1 */}
                    {page == 0 && <div>
                        <PackageOptionList onSelect={(item) => handleSelectPackage(item)}/>
                    </div>}
                    {/* page 2 */}
                    {page == 1 && <div>
                        <CustomPackageForm onSubmit={(item) => handleSelectPackage(item)}/>
                    </div>}
                    
                </div>
            </div>
        </div>
    )
}

const CustomPackageForm: React.FC<{onSubmit: (item: Package) => void}> = ({onSubmit}) => {
    
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
        const val = Number(value)
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
            <Button type="submit" label="Подтвердить" style={{padding: "4px", justifySelf: "stretch"}}/>
        </form>
    )
}

const SmallInput : React.FC<{label: string, value: number | string | null, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = (props) => {
    
    return (
        <div style={{display: "flex", flexDirection: "row", padding: "0px 16px"}}>
            <label style={{justifySelf: "stretch", flexGrow: 1, alignSelf: 'center', fontSize: 16}}>{props.label}</label>
            <div style={{display: "flex", flexDirection: "column"}}>
                <input type="number" className={css.smallInput} onChange={props.onChange} value={typeof props.value == "number" ? props.value : undefined} id={`smallInput_${props.label}`} placeholder="см"/>
                {typeof props.value == "string" &&
                    <span>{props.value}</span>
                }
            </div>
        </div>
    )
}

const PackageOptionList: React.FC<{onSelect: (item: Package) => void}> = ({onSelect}) => {
    
    const axios = useAxios();

    const [data, setData] = useState<Package[]>()
    
    useEffect(() => {
        axios.get<{success: boolean, reason?:string, packages: Package[]}>(homePage.getPackageOptions).then(
            res => {
                if (res.data.success){
                    setData(res.data.packages)
                }
            }
        ).catch(error => console.error(error))
    }, [])

    return (
        <div style={{display: "flex", flexDirection: "column", gap: 8}}>
            {data?.map( el => <PackageOptionItem item={el} onClick={onSelect}/>)}
        </div>
    )
}

const PackageOptionItem : React.FC<{item: Package, onClick: (item: Package) => void}> = ({item, onClick}) => {
    return (
        <div className={css.listItem} onClick={() => onClick(item)}>
            <img></img>

            <div>
                <span>{item.name}</span>
                <span>{`${item.width}x${item.length}x${item.height} см`}</span>
            </div>
        </div>
    )
}