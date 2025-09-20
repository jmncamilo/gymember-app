import styles from "./MainButton.module.css"

export function MainButton({btnText = 'Click'}) {
    return <button className={styles.mainButton}>{btnText}</button>;
}