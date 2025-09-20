import styles from "./UsersPage.module.css";
/** @type {string} */
import editIcon from "../../assets/icons/table-edit.svg";
import profilePicIcon from "../../assets/icons/user-nopic.png";
import { StatusBadge } from "../../components/badges/StatusBadge.jsx";
import { membershipTypeFormatter } from "../../utils/formatters/membershipTypeFormatter.js";

export function UsersRowTable({ data, setModalFormStatus }) {
    return (
        <tr>
            <td className={styles.tdTable}>
                <button onClick={() => setModalFormStatus(true)} className={styles.btnEdit}>
                    <img src={editIcon} alt="Editar usuario"/>
                </button>
            </td>
            <td className={styles.tdTable}>
                {data.nuip}
            </td>
            <td className={styles.tdTable}>
                <div className={styles.tdWrapperNamePic}>
                    <img src={!data.profile_image_url ? profilePicIcon : data.profile_image_url}
                         alt="Foto de perfil"/>
                    {data.first_name + ' ' + data.first_last_name}
                </div>
            </td>
            <td className={styles.tdTable}>
                <div className={styles.badgeContainer}>
                    <StatusBadge status={data.status} type={data.status}/>
                </div>
            </td>
            <td className={styles.tdTable}>
                {membershipTypeFormatter(data.membership_type)}
            </td>
            <td className={styles.tdTable}>
                {data.phone_number}
            </td>
        </tr>
    );
}