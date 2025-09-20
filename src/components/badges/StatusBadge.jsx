import styles from "./StatusBadge.module.css";
import utilStyles from "../../styles/utilities/utilities.module.css";

export function StatusBadge({status = 'pending', type = 'pending'}) {

    const formatStatus = {
        active: 'Activo',
        expired: 'Vencido',
        pending: 'Pendiente',
        cancelled: 'Cancelado',
        frozen: 'Congelado',
        trial: 'Prueba'
    };

    return (
        <div className={`${utilStyles.flexCenterAlign} ${styles.badgeWrapper} ${styles[type]}`}>
            <span className={`${styles.badgeIconStyle} ${styles[type + 'Icon']}`}></span>
            <span className={styles.badgeTextStyle}>{formatStatus[status]}</span>
        </div>
    );
}