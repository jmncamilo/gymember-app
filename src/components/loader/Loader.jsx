import utilStyles from "../../styles/utilities/utilities.module.css";
import styles from "./LoaderStyles.module.css";

export function Loader() {
    return (
        <div className={`defaultContainer ${utilStyles.flexCenterAlign} ${styles.position}`}>
            <div className={styles.loader}></div>
        </div>
    );
}