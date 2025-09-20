import { NavLink, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";

export function Sidebar({ isExpanded, handleSidebarMode }) {
    // const isExpanded = true;
    const location = useLocation();

    return (
        <>
            <nav className={`${styles.sidebarExpanded} ${!isExpanded ? styles.sidebarCollapsed : ''}`}>
                <NavLink className={`${styles.navElement} ${styles.navElementLogo}`} to={location.pathname}>
                    <div className={`${styles.iconAppExpanded} ${!isExpanded ? styles.iconAppCollapsed : ''}`} onClick={handleSidebarMode}></div>
                </NavLink>

                <div className={styles.containerModules}>
                    <NavLink className={({ isActive }) => `${styles.navElement} ${!isExpanded ? styles.navElementCollapsed : ''} ${isActive ? styles.isActiveRouter : ''}`} to="/inicio">
                        <div className={`${styles.iconSidebar} ${styles.iconHome}`}></div>
                        {isExpanded && <h4>Inicio</h4>}
                    </NavLink>

                    <NavLink className={({ isActive }) => `${styles.navElement} ${!isExpanded ? styles.navElementCollapsed : ''} ${isActive ? styles.isActiveRouter : ''}`} to="/usuarios">
                        <div className={`${styles.iconSidebar} ${styles.iconUsers}`}></div>
                        {isExpanded && <h4>Usuarios</h4>}
                    </NavLink>

                    <NavLink className={({ isActive }) => `${styles.navElement} ${!isExpanded ? styles.navElementCollapsed : ''} ${isActive ? styles.isActiveRouter : ''}`} to="/registro">
                        <div className={`${styles.iconSidebar} ${styles.iconAddUser}`}></div>
                        {isExpanded && <h4>Registrar Usuario</h4>}
                    </NavLink>

                    <NavLink className={({ isActive }) => `${styles.navElement} ${!isExpanded ? styles.navElementCollapsed : ''} ${isActive ? styles.isActiveRouter : ''}`} to="/vencimientos">
                        <div className={`${styles.iconSidebar} ${styles.iconExpiringSoon}`}></div>
                        {isExpanded && <h4>Vencimientos</h4>}
                    </NavLink>

                    <NavLink className={({ isActive }) => `${styles.navElement} ${!isExpanded ? styles.navElementCollapsed : ''} ${isActive ? styles.isActiveRouter : ''}`} to="/pagos">
                        <div className={`${styles.iconSidebar} ${styles.iconPayments}`}></div>
                        {isExpanded && <h4>Pagos</h4>}
                    </NavLink>
                </div>

                <div className={styles.finalSidebarIcons}>
                    <NavLink className={`${styles.navElement} ${!isExpanded ? styles.navElementCollapsed : ''}`} to="/config">
                        <div className={`${styles.iconSidebar} ${styles.iconSettings}`}></div>
                        {isExpanded && <h4>Configuración</h4>}
                    </NavLink>

                    <NavLink className={`${styles.navElement} ${!isExpanded ? styles.navElementCollapsed : ''}`} to="/logout">
                        <div className={`${styles.iconSidebar} ${styles.iconLogout}`}></div>
                        {isExpanded && <h4>Cerrar Sesión</h4>}
                    </NavLink>
                </div>
            </nav>
        </>
    );
}