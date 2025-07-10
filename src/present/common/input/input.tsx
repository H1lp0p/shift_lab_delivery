import { useState, type ChangeEvent, type InputEvent } from "react";
import type BaseProps from "../base-props";
import css from './input.module.css'

export interface InputProps extends BaseProps{
    type: string,
    label?: string,
    placeholder?: string,
    value?: string,
    validationError?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}


export const Input : React.FC<InputProps> = (prop) => {
    
    const {type, label, placeholder, onChange, value, validationError} = prop

    return (
        <div className={css.cont}>
            {label && <label className={css.label} htmlFor={`input_${type}`}>{label}</label>}
            <input className={css.input + (validationError ? ` ${css.error}` : '')} type={type} id={`input_${type}`} onChange={onChange} value={value} placeholder={placeholder}/>
            {validationError && <span className={css.validationError}>{validationError}</span>}
        </div>
    )
}