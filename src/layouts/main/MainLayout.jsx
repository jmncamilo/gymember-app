import { Sidebar } from "../../components/sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";

export function MainLayout({ isExpanded, handleSidebarMode }) {

    /* Esto es para testing luego se manejará con una prop dilling tanto para el sidebar como para el page container */
    // let isExpanded = true;

    return (
        <>
            <div className={styles.mainContainer}>
                <Sidebar isExpanded={isExpanded} handleSidebarMode={handleSidebarMode}/>
                <div className={`${styles.pagesContainerExpanded} ${!isExpanded ? styles.pagesContainerCollapsed : ''}`}>
                    <Outlet/>
                </div>
            </div>
        </>
    );
}