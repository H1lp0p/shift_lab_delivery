import type Package from "../../../data/models/package"
import css from './package-option-item.module.css'


export const PackageOptionItem : React.FC<{item: Package, onClick: (item: Package) => void}> = ({item, onClick}) => {
    return (
        <div className={css.listItem} onClick={() => onClick(item)}>
            <img></img>

            <div style={{display: "flex", flexDirection: "column"}}>
                <span className={css.itemLabel}>{item.name}</span>
                <span className={css.itemSize}>{`${item.width}x${item.length}x${item.height} см`}</span>
            </div>
        </div>
    )
}