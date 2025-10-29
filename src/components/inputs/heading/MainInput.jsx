import styles from "./MainInput.module.css";

export function MainInput({type = 'text', placeholder = '', access = false, name, value, onChange, inputMode}) {
    return <input
        className={`${styles.mainInput} ${!access ? '' : styles.access}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        inputMode={inputMode}
    />;
}