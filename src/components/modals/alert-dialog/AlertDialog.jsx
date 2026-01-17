import styles from "./AlertDialog.module.css";
import { MainButton } from "../../buttons/heading/MainButton.jsx";

export function AlertDialog({ image, title, description, onClose, isOpen }) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Cerrar"
                    >
                        ×
                    </button>
                </div>

                <div className={styles.body}>
                    {image && (
                        <img
                            src={image}
                            alt={title}
                            className={styles.image}
                        />
                    )}
                    <p className={styles.description}>{description}</p>
                </div>

                <div className={styles.footer}>
                    <MainButton
                        onClick={onClose}
                        btnText={'Aceptar'}
                    />
                </div>
            </div>
        </div>
    );
}