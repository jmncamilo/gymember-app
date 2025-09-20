import "../defaultStyles.css";
import styles from "./HomePage.module.css";
import utilStyles from "../../styles/utilities/utilities.module.css";
import { useNavigate } from "react-router-dom";
/** @type {string} */
import profilePicIcon from "../../assets/icons/user-nopic.png";

export function HomePage() {
    /* Shows current date dd/mm/yy */
    const todayDate = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

    // Use navigate to optimal redirection
    const navigate = useNavigate();

    /* Simulating API */
    const data = {
        first_name: 'Samara',
        first_last_name: 'Morgan',
        gymName: 'Body People Gym',
        todayIncome: '99.000.000',
        logo_url: 'https://entertainment.time.com/wp-content/uploads/sites/3/2012/05/new-line.jpg?w=600',
        membershipCount: 15,
        totalActiveUsers: 250,
        todayExpiringMemberships: 8,
        soonExpiringMemberships: 15,
        totalNewUsers: 100,
        totalRenewedUsers: 10,
        womenPercentage: 50,
        menPercentage: 50,
        averageAge: 20,
        cancelledMemberships: 14,
        pendingPayments: 23
    };

    return (
        <>
            <div className={`defaultContainer ${styles.generalContainer}`}>
                <div className={styles.titleContainer}>
                    <div className={styles.helloDateContainer}>
                        <h2 className={styles.titleHeading}>Hola, {data.first_name}</h2>
                        <h4 className={styles.dateHeading}>{todayDate}</h4>
                    </div>
                    <div className={styles.profileContainer}>
                        <div className={styles.textProfile}>
                            <h3 className={styles.textProfileName}>{`${data.first_name} ${data.first_last_name}`}</h3>
                            <h3 className={styles.textProfileGym}>{data.gymName}</h3>
                        </div>
                        <img className={styles.profilePic} src={data.logo_url ? data.logo_url : profilePicIcon} alt="profile-pic"/>
                    </div>
                </div>

                <div className={styles.moduleDashboardTitle}>
                    <h1 className={styles.dashboardTitle}>Dashboard</h1>
                </div>

                <div className={styles.gridLayoutContent}>
                    {/* 1 -> Daily Income Card - Shows today's collected amount and number of memberships sold */}
                    <div className={styles.gridCards}>
                        <div className={styles.headingCardTitle}>
                            <div className={styles.cardIcon}>
                                <div className={styles.iconSvg}></div>
                            </div>
                            <h5 className={styles.cardTitle}>Ingresos Hoy</h5>
                        </div>
                        <div className={styles.firstCardContent}>
                            <h3 className={styles.contentTitleMoney}>${data.todayIncome}</h3>
                        </div>
                        <div className={styles.firstCardExtraContent}>
                            <h5 className={styles.extraContentText}>{data.membershipCount} membresía(s) otorgada(s) el día de hoy</h5>
                            <div className={`${styles.arrowImgDefaultDecrease} ${data.membershipCount > 0 ? styles.arrowImgIncrease : ''}`}></div>
                        </div>
                    </div>

                    {/* 2 -> Memberships Info Card - Shows active users and expiring memberships */}
                    <div className={styles.gridCards}>
                        <div className={styles.headingCardTitle}>
                            <div className={`${styles.cardIcon} ${styles.secondCardIcon}`}>
                                <div className={`${styles.iconSvg} ${styles.secondCardIconSvg}`}></div>
                            </div>
                            <h5 className={styles.cardTitle}>Información Membresías</h5>
                        </div>
                        <div className={styles.secondCardContent}>
                            <div className={styles.secondCardContentContainer}>
                                <div className={styles.secondCardContentIcon}>
                                    <div className={styles.boxIcon}></div>
                                </div>
                                <div className={styles.secondCardContentText}>Total de usuarios activos</div>
                                <div className={styles.secondCardContentValue}>{data.totalActiveUsers}</div>
                            </div>
                            <div className={styles.secondCardContentContainer}>
                                <div className={styles.secondCardContentIcon}>
                                    <div className={`${styles.boxIcon} ${styles.boxIcon2}`}></div>
                                </div>
                                <div className={styles.secondCardContentText}>Membresías que vencen hoy</div>
                                <div className={styles.secondCardContentValue}>{data.todayExpiringMemberships}</div>
                            </div>
                            <div className={styles.secondCardContentContainer}>
                                <div className={styles.secondCardContentIcon}>
                                    <div className={`${styles.boxIcon} ${styles.boxIcon3}`}></div>
                                </div>
                                <div className={styles.secondCardContentText}>Membresías que vencen pronto</div>
                                <div className={styles.secondCardContentValue}>{data.soonExpiringMemberships}</div>
                            </div>
                        </div>
                    </div>

                    {/* 3 -> Users Info Card - Displays statistics about new user registrations this month */}
                    <div className={styles.gridCards}>
                        <div className={styles.headingCardTitle}>
                            <div className={`${styles.cardIcon}`}>
                                <div className={`${styles.iconSvg} ${styles.thirdCardIconSvg}`}></div>
                            </div>
                            <h5 className={styles.cardTitle}>Usuarios</h5>
                        </div>
                        <div className={styles.thirdCardContent}>
                            <div className={styles.thirdCardBoxInfo}>
                                <h5 className={styles.boxTextThirdCard}>Usuarios nuevos</h5>
                                <div className={styles.boxContainerThirdCard}>
                                    <div
                                        className={`${styles.boxInsideTextThirdCard} ${utilStyles.flexCenterAlign}`}>Últimos 30 días</div>
                                    <div
                                        className={`${styles.boxInsideValueThirdCard} ${utilStyles.flexCenterAlign}`}>{data.totalNewUsers}</div>
                                </div>
                            </div>
                            <div className={styles.thirdCardBoxInfo}>
                                <h5 className={styles.boxTextThirdCard}>Usuarios renovados</h5>
                                <div className={styles.boxContainerThirdCard}>
                                    <div
                                        className={`${styles.boxInsideTextThirdCard} ${utilStyles.flexCenterAlign}`}>Últimos 30 días</div>
                                    <div
                                        className={`${styles.boxInsideValueThirdCard} ${utilStyles.flexCenterAlign}`}>{data.totalRenewedUsers}</div>
                                </div>
                            </div>
                            <button className={styles.btnThirdCardNewUser} onClick={() => navigate('/registro')}>Registrar Usuario</button>
                        </div>
                    </div>

                    {/* 4 -> Marketing data - Visualizes demographic statistics and analytics from all user information */}
                    <div className={styles.gridCards}>
                        <div className={`${styles.fourthCardTitle} ${utilStyles.flexCenterAlign} ${utilStyles.justifyStart}`}>Análisis Demográfico</div>
                        <div className={styles.fourthCardContent}>
                            <table className={styles.dashboardTableFourthCard}>
                                <thead>
                                    <tr>
                                        <th>Métrica</th>
                                        <th>Descripción</th>
                                        <th>Dato</th>
                                        <th>Alcance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className={`${utilStyles.flexCenterAlign} ${styles.tdFullHeight}`}>
                                        <div className={styles.tableIconFourthCard}></div>
                                    </td>
                                    <td>Promedio de mujeres inscritas</td>
                                    <td>{data.womenPercentage}%</td>
                                    <td>Sobre el total de usuarios activos</td>
                                </tr>
                                <tr>
                                    <td className={`${utilStyles.flexCenterAlign} ${styles.tdFullHeight}`}>
                                        <div className={`${styles.tableIconFourthCard} ${styles.tableIconFourthCard2}`}></div>
                                    </td>
                                    <td>Promedio de hombres inscritos</td>
                                    <td>{data.menPercentage}%</td>
                                    <td>Sobre el total de usuarios activos</td>
                                </tr>
                                <tr>
                                    <td className={`${utilStyles.flexCenterAlign} ${styles.tdFullHeight}`}>
                                        <div className={`${styles.tableIconFourthCard} ${styles.tableIconFourthCard3}`}></div>
                                    </td>
                                    <td>Edad promedio de usuarios</td>
                                    <td>{data.averageAge} años</td>
                                    <td>Sobre el histórico de usuarios</td>
                                </tr>
                                <tr>
                                    <td className={`${utilStyles.flexCenterAlign} ${styles.tdFullHeight}`}>
                                        <div className={`${styles.tableIconFourthCard} ${styles.tableIconFourthCard4}`}></div>
                                    </td>
                                    <td>Membresías canceladas</td>
                                    <td>{data.cancelledMemberships}</td>
                                    <td>En los últimos 3 meses</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Card 5 */}
                    <div className={styles.gridCards}>
                        <div
                            className={`${styles.fourthCardTitle} ${styles.fifthCardFixTitle} ${utilStyles.flexCenterAlign} ${utilStyles.justifyStart}`}>Pagos
                            Pendientes
                        </div>
                        <div className={`${styles.fourthCardContent} ${styles.fifthCardFixContent}`}>
                            <h5 className={`${styles.extraContentText} ${styles.fifthCardFixTextContent}`}>Tienes {data.pendingPayments} pagos pendientes para gestionar hoy.</h5>
                            <button className={`${styles.btnThirdCardNewUser} ${styles.btnFifthCard}`} onClick={() => navigate('/vencimientos')}>Revisar Pagos</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}