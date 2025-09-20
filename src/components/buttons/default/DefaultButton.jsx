import styles from "./DefaultButton.module.css";

export function DefaultButton({text = 'Click', onClick}) {
    return <button className={styles.gymemberButton} onClick={onClick}>{text}</button>;
}