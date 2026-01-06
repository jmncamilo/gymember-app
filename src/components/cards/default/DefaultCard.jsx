import styles from "./DefaultCard.module.css";
/** @type {string} */
import userNoPic from "../../../assets/icons/user-nopic.png";
import { formatDateToDayFirst } from "../../../utils/formatters/formatDateToDayFirst.js";
import { formatDateForDateInput } from "../../../utils/formatters/formatDateForDateInput.js";

export function DefaultCard({data, onClick = () => {}}) {

    // Default data if the prop is false
    const defaultData = {
        // Customer info data
        nuip: '0000000000',
        first_name: 'Unnamed',
        first_last_name: 'Unnamed',
        profile_image_url: 'https://pbs.twimg.com/media/F3hZ5izWEAAC2zt.jpg',
        // Membership info data
        membership_type: 'Mensualidad',
        start_date: '1996-01-01',
        end_date: '1996-01-02'
    };

    let customerData = data || defaultData;

    return (
        <div className={`${styles.card} ${styles.purple}`}>
            <div className={styles.cardHeader}>
                <div className={styles.pic}>
                    <img className={styles.userPhoto} src={customerData.profile_image_url ? customerData.profile_image_url : userNoPic} alt="Foto del usuario"/>
                </div>
            </div>
            <div className={styles.cardBody}>
                <h3>{`${customerData.first_name} ${customerData.first_last_name}`}</h3>
                <p>📜{customerData.nuip}</p>
            </div>
            <div className={`${styles.cardBody} ${styles.cardFooter}`}>
                <h5>🗓️ Inscripción → {formatDateToDayFirst(formatDateForDateInput(customerData.start_date))}</h5>
                <h5>📅 Expiración → {formatDateToDayFirst(formatDateForDateInput(customerData.end_date))}</h5>
                <h5>🥇 Membresía → {customerData.membership_type}</h5>
                <button className={styles.buttonRenew} onClick={onClick}>Renovar Cliente</button>
            </div>
        </div>
    );
}