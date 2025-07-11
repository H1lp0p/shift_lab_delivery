import { useEffect, useState } from "react";
import type Package from "../../../data/models/package";
import { useAxios } from "../../../domain/hooks/my-axios";
import { PackageOptionItem } from "./package-option-item";
import { homePage } from "../../../domain/api-path";

export const PackageOptionList: React.FC<{onSelect: (item: Package) => void}> = ({onSelect}) => {
    
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
