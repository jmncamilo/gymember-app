import "../defaultStyles.css";
import styles from "./HomePage.module.css";
import utilStyles from "../../styles/utilities/utilities.module.css";
import { useNavigate } from "react-router-dom";
/** @type {string} */
import gymDefaultPic from "../../assets/logos/default-gym-pic.png";
import { useForm } from "../../hooks/useForm.js";
import { INITIAL_DASHBOARD_VALUES } from "./dashboardInitialValues.js";
import { getFirstWord } from "../../utils/formatters/getFirstWord.js";
import { useFetchWithAuth } from "../../hooks/useFetchWithAuth.js";
import { useEffect, useState } from "react";
import { Loader } from "../../components/loader/Loader.jsx";
import { getOptions } from "../../utils/misc/fetchOptions.js";
import { formatColombianCurrency } from "../../utils/formatters/formatColombianCurrency.js";
import { AlertDialog } from "../../components/modals/alert-dialog/AlertDialog.jsx";
import { useObjectState } from "../../hooks/useObjectState.js";
import genericError from "../../assets/3d-icons/error-generic.png";


export function HomePage() {
    /* Shows current date */
    const todayDate = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

    // Use navigate to optimal redirection
    const navigate = useNavigate();

    // Use custom hook to store api data
    const {
        form: dashboardData,
        setFormWithObject: setDashboardObjectData
    } = useForm(INITIAL_DASHBOARD_VALUES);

    // State to handle loader
    const [isLoadingDashboard, setIsLoadingDashboard] = useState(true);

    // Custom hook to fetching
    const { executeFetchWithAuth: executeFetchDashboardDataWithAuth } = useFetchWithAuth('/customers/dashboard', getOptions);

    // Custom hook to handles messages in the alert dialog
    const { updateStateByKey, objectData: dialogSettings } = useObjectState({
        status: false,
        closeDialog: () => {
            updateStateByKey('status', false);
            navigate("/acceso", { replace: true });
        },
        openDialog: () => updateStateByKey('status', true),
        image: null,
        title: '',
        description: ''
    });

    // Effect to load dashboard metrics data by executing the custom fetch hook
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await executeFetchDashboardDataWithAuth();
                if (!result?.success || !Object.keys(result?.data?.data ?? {}).length) {
                    updateStateByKey('image', genericError);
                    updateStateByKey('title', '¡Ups! Algo salió mal');
                    updateStateByKey('description', 'No se pudieron cargar los datos del dashboard. Inténtalo una vez más.');
                    updateStateByKey('status', true);
                    return;
                }
                setDashboardObjectData(result.data.data);

                // console.log(result?.data?.data ?? 'Error imprimiendo la data del dashboard...'); // TESTING CJ
            } catch (err) {
                console.error(err); // TESTING IN FIRST VERSION
                updateStateByKey('image', genericError);
                updateStateByKey('title', '¡Ups! Algo salió mal');
                updateStateByKey('description', 'No se pudieron cargar los datos del dashboard. Inténtalo una vez más.');
                updateStateByKey('status', true);
            } finally {
                setIsLoadingDashboard(false);
            }
        };

        fetchData().catch(() => {});
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // TODO: Buscar una imagen de perfil predeterminada más adecuada para gimnasios sin logo. La actual se utiliza únicamente con fines promocionales de la aplicación.

    return (
        <>
            <div className={`defaultContainer ${styles.generalContainer}`}>
                <div className={styles.titleContainer}>
                    <div className={styles.helloDateContainer}>
                        <h2 className={styles.titleHeading}>Hola, {getFirstWord(dashboardData?.employee_name) ?? '--'}</h2>
                        <h4 className={styles.dateHeading}>{todayDate}</h4>
                    </div>
                    <div className={styles.profileContainer}>
                        <div className={styles.textProfile}>
                            <h3 className={styles.textProfileName}>{dashboardData?.employee_name ?? '--'}</h3>
                            <h3 className={styles.textProfileGym}>{dashboardData?.gym_name ?? '--'}</h3>
                        </div>
                        <img className={styles.profilePic} src={dashboardData?.logo_url ? dashboardData.logo_url : gymDefaultPic} alt="profile-pic"/>
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
                            <h3 className={styles.contentTitleMoney}>$ {formatColombianCurrency(dashboardData?.today_revenue ?? 9) ?? 9}</h3>
                        </div>
                        <div className={styles.firstCardExtraContent}>
                            <h5 className={styles.extraContentText}>{dashboardData?.today_total_memberships ?? 9} membresía(s) otorgada(s) el día de hoy</h5>
                            <div className={`${styles.arrowImgDefaultDecrease} ${(dashboardData?.today_total_memberships ?? 9) > 0 ? styles.arrowImgIncrease : ''}`}></div>
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
                                <div className={styles.secondCardContentValue}>{dashboardData?.total_active_customers ?? 9}</div>
                            </div>
                            <div className={styles.secondCardContentContainer}>
                                <div className={styles.secondCardContentIcon}>
                                    <div className={`${styles.boxIcon} ${styles.boxIcon2}`}></div>
                                </div>
                                <div className={styles.secondCardContentText}>Membresías que vencen hoy</div>
                                <div className={styles.secondCardContentValue}>{dashboardData?.today_expiring_memberships ?? 9}</div>
                            </div>
                            <div className={styles.secondCardContentContainer}>
                                <div className={styles.secondCardContentIcon}>
                                    <div className={`${styles.boxIcon} ${styles.boxIcon3}`}></div>
                                </div>
                                <div className={styles.secondCardContentText}>Membresías que vencen pronto</div>
                                <div className={styles.secondCardContentValue}>{dashboardData?.soon_expiring_memberships ?? 9}</div>
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
                                        className={`${styles.boxInsideValueThirdCard} ${utilStyles.flexCenterAlign}`}>{dashboardData?.new_customers_last_month ?? 9}</div>
                                </div>
                            </div>
                            <div className={styles.thirdCardBoxInfo}>
                                <h5 className={styles.boxTextThirdCard}>Usuarios renovados</h5>
                                <div className={styles.boxContainerThirdCard}>
                                    <div
                                        className={`${styles.boxInsideTextThirdCard} ${utilStyles.flexCenterAlign}`}>Últimos 30 días</div>
                                    <div
                                        className={`${styles.boxInsideValueThirdCard} ${utilStyles.flexCenterAlign}`}>{dashboardData?.renewed_customers_last_month ?? 9}</div>
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
                                    <td>{dashboardData?.percentage_active_women ?? '-'}%</td>
                                    <td>Sobre el total de usuarios activos</td>
                                </tr>
                                <tr>
                                    <td className={`${utilStyles.flexCenterAlign} ${styles.tdFullHeight}`}>
                                        <div className={`${styles.tableIconFourthCard} ${styles.tableIconFourthCard2}`}></div>
                                    </td>
                                    <td>Promedio de hombres inscritos</td>
                                    <td>{dashboardData?.percentage_active_men ?? '-'}%</td>
                                    <td>Sobre el total de usuarios activos</td>
                                </tr>
                                <tr>
                                    <td className={`${utilStyles.flexCenterAlign} ${styles.tdFullHeight}`}>
                                        <div className={`${styles.tableIconFourthCard} ${styles.tableIconFourthCard3}`}></div>
                                    </td>
                                    <td>Edad promedio de usuarios</td>
                                    <td>{dashboardData?.avg_customers_age ?? 9} años</td>
                                    <td>Sobre el histórico de usuarios</td>
                                </tr>
                                <tr>
                                    <td className={`${utilStyles.flexCenterAlign} ${styles.tdFullHeight}`}>
                                        <div className={`${styles.tableIconFourthCard} ${styles.tableIconFourthCard4}`}></div>
                                    </td>
                                    <td>Membresías canceladas</td>
                                    <td>{dashboardData?.cancelled_memberships_last_3_months ?? 9}</td>
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
                            <h5 className={`${styles.extraContentText} ${styles.fifthCardFixTextContent}`}>Tienes {dashboardData?.pending_payments ?? 9} pagos pendientes para gestionar hoy.</h5>
                            <button className={`${styles.btnThirdCardNewUser} ${styles.btnFifthCard}`} onClick={() => navigate('/pagos')}>Revisar Pagos</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controlling loader */}
            { isLoadingDashboard && <Loader /> }

            {/* Controlling dialogs */}
            <AlertDialog
                image={dialogSettings.image}
                title={dialogSettings.title}
                description={dialogSettings.description}
                isOpen={dialogSettings.status}
                onClose={dialogSettings.closeDialog}
            />
        </>
    );
}