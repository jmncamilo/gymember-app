import styles from "./NotFoundPage.module.css";
import { useNavigate } from "react-router-dom";
/** @type {string} */
import notFoundIcon from "../../assets/3d-icons/error-generic.png";
import { DefaultButton } from "../../components/buttons/default/DefaultButton.jsx";

    export function NotFoundPage() {
        const navigate = useNavigate();

        return (
            <div className={styles.notFoundContainer}>
                <div className={styles.contentWrapper}>
                    <div className={styles.iconContainer}>
                        <img src={notFoundIcon} alt="404" className={styles.errorIcon} />
                    </div>
                    <div className={styles.textContent}>
                        <h1 className={styles.errorCode}>404</h1>
                        <h2 className={styles.errorTitle}>¡Vaya! Página no encontrada</h2>
                        <p className={styles.errorDescription}>
                            Parece que te has aventurado a un lugar que no existe.
                            La ruta que buscas no está disponible en este momento.
                        </p>
                    </div>

                    {/*<button*/}
                    {/*    className={styles.btnReturn}*/}
                    {/*    onClick={() => navigate('/acceso', { replace: true })}*/}
                    {/*>*/}
                    {/*    Volver al Inicio*/}
                    {/*</button>*/}
                    <DefaultButton
                        onClick={() => navigate('/acceso', { replace: true })}
                        text={'Volver al Inicio'}
                    />
                </div>
            </div>
        );
    }