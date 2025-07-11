import { useEffect, useState } from "react";
import type BaseProps from "../base-props";
import type Package from "../../../data/models/package";
import { DropDownIco } from "../../icons";
import { useAxios } from "../../../domain/hooks/my-axios";
import { homePage } from "../../../domain/api-path";

import css from './package-option-input.module.css'
import { Input } from "../input/input";
import { Button } from "../button/button";
import { CustomPackageForm } from "../custom-package-form/custom-package-from";
import { PackageOptionList } from "../package-option-list/package-option-list";

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