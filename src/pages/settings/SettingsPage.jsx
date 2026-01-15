import "../defaultStyles.css";
import styles from "./SettingsPage.module.css";

export function SettingsPage() {
    return(
        <>
            <div className={`defaultContainer ${styles.generalContainer}`}>
                <div className={styles.contentWrapper}>
                    <div className={styles.icon}>🚧</div>
                    <h1 className={styles.title}>⚙️ Módulo en Construcción ⚙️</h1>
                    <p className={styles.subtitle}>¡Estamos trabajando para traerte nuevas funciones pronto! 🛠️</p>
                </div>
            </div>
        </>
    );
}