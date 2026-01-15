import "../defaultStyles.css";
import styles from "./LogoutPage.module.css";

export function LogoutPage() {
    return(
        <>
            <div className={`defaultContainer ${styles.generalContainer}`}>
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.iconContainer}>
                            <svg className={styles.logoutIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h2 className={styles.title}>¿Confirmas el cierre de sesión?</h2>
                        <p className={styles.description}>
                            Al cerrar sesión, se te solicitará de nuevo tu cuenta de gimnasio y código de empleado para ingresar.
                        </p>
                        <div className={styles.buttonGroup}>
                            <button className={styles.cancelButton}>
                                Cancelar
                            </button>
                            <button className={styles.logoutButton}>
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}