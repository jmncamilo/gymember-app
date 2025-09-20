import styles from "./DefaultInput.module.css";
import { useId } from "react";

export function DefaultInput({name, value, onChange, onBlur, onFocus, text = '', htmlFor, type = 'text', isDisabled = false, placeholder = '', readOnly = false}) {

    const generatedId = useId();
    const id = htmlFor || generatedId;

    return (
        <>
            <label className={styles.labelRef} htmlFor={id}>{text}</label>
            <input className={styles.defaultInput} name={name} value={value} id={id} type={type} disabled={isDisabled} onChange={onChange} onBlur={onBlur} onFocus={onFocus} placeholder={placeholder} readOnly={readOnly}/>
        </>
    );
}
