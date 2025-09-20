import styles from "./MainInput.module.css";

export function MainInput({type = 'text', placeholder = '', access = false}) {
    return <input placeholder={placeholder} className={`${styles.mainInput} ${!access ? '' : styles.access}`} name="name" type={type}/>;
}