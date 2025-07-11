import css from './small-input.module.css'

export const SmallInput : React.FC<{label: string, value: number | string | null, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = (props) => {
    
    return (
        <div style={{display: "flex", flexDirection: "row", padding: "0px 16px", gap: "16px"}}>
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