import { Sidebar } from "../../components/sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";

export function MainLayout({ isExpanded, handleSidebarMode }) {

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