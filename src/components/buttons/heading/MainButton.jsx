import styles from "./MainButton.module.css"

export function MainButton({btnText = 'Click', onClick}) {
    return (
        <button
            className={styles.mainButton}
            onClick={onClick}
        >
            {btnText}
        </button>
    );
}