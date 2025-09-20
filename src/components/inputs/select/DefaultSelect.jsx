import styles from "./DefaultSelect.module.css";
import inputStyles from "../default/DefaultInput.module.css";
import { useId } from "react";

export function DefaultSelect({text = '', htmlFor, name = 'unnamed', children, value, onChange}) {

    const generatedId = useId();
    const id = htmlFor || generatedId;

    return (
        <>
            <label className={inputStyles.labelRef} htmlFor={id}>{text}</label>
            <select className={`${inputStyles.defaultInput} ${styles.defaultSelect}`} name={name} id={id} value={value} onChange={onChange}>
                {children}
            </select>
        </>
    );
}