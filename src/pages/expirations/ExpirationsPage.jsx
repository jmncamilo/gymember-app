import styles from "./ExpirationsPage.module.css";
import "../defaultStyles.css";
import { DefaultCard } from "../../components/cards/default/DefaultCard.jsx";
import { useNavigate } from "react-router-dom";
import { useFetchWithAuth } from "../../hooks/useFetchWithAuth.js";
import { getOptions } from "../../utils/misc/fetchOptions.js";
import { useEffect, useState } from "react";
import { Loader } from "../../components/loader/Loader.jsx";


export function ExpirationsPage() {
    // State to control the loading indicator during both initial load and general operations
    const [loadingState, setLoadingState] = useState({
        firstLoading: true,
        generalLoading: false
    });

    // State to control filtering customers by nuip (recent and historical expired customers)
    const [filterByNuipRecentExpiredCustomers, setFilterByNuipRecentExpiredCustomers] = useState('');
    const [filterByNuipHistoricExpiredCustomers, setFilterByNuipHistoricExpiredCustomers] = useState('');

    // Fallback API data
    const fallbackData = {
        // Queries data -> membership_type = expired
            // Cambiar los nombres de estas propiedades cuando haya conexión real a la API...
        clientes_vencidos_total: '0',
        clientes_vencidos_recientemente: '0',
        // Customer info data
        nuip: '0000000000',
        first_name: 'Unnamed',
        first_last_name: 'Unnamed',
        profile_image_url: null,
        // Membership info data
        membership_type: 'Mensual',
        start_date: '2025-03-19',
        end_date: '2025-04-19'
    };

    // Function that handles redirection to the payments module
    const navigate = useNavigate();
    const handleRedirection = () => {
        navigate("/pagos");
    }

    // Custom hook to fetch customers expired data
    const {
        data: customersExpiredData,
        executeFetchWithAuth: executeCustomersExpiredFetchWithAuth
    } = useFetchWithAuth('/customers/expired', getOptions);

    // Effect to load all expired customers by executing the custom fetch hook
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await executeCustomersExpiredFetchWithAuth();
                if (!result.success) {
                    return;
                }

                console.log(result?.data ?? 'Error imprimiendo los datos de los clientes vencidos...'); // TESTING CJ
            } catch (err) {
                console.error(err); // TESTING CJ
                navigate("/acceso", { replace: true });
            } finally {
                setLoadingState(prev => ({
                    ...prev,
                    firstLoading: false
                }));
            }
        };

        fetchData().catch(() => {});
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <div className={`defaultContainer ${styles.globalPageWrapper}`}>
                <div className={styles.contentAreaWrapper}>

                    <header>
                        <h1>Clientes Vencidos ({customersExpiredData?.expiredCustomersMetrics?.total_expired_customers ?? fallbackData.clientes_vencidos_total})</h1>
                    </header>

                    <main>
                        <div className={styles.mainSectionWrapper}>
                            <div className={styles.mainSubtitle}>
                                <h3>Clientes Vencidos Recientemente ({customersExpiredData?.expiredCustomersMetrics?.recently_expired_customers ?? fallbackData.clientes_vencidos_recientemente})</h3>
                                <div className={styles.containerInput}>
                                    <input
                                        title={'Buscar cliente'}
                                        type="text"
                                        value={filterByNuipRecentExpiredCustomers}
                                        onChange={(e) => setFilterByNuipRecentExpiredCustomers(e.target.value)}
                                        name="nuip-recently"
                                        className={styles.inputStyle}
                                        placeholder="Documento de identidad..."
                                        required
                                    />
                                    <div className={styles.iconSearch}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path
                                                d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                                                fill="none" stroke="currentColor" strokeMiterlimit={10}
                                                strokeWidth={32}/>
                                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={32} d="M338.29 338.29L448 448"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.mainSectionContent}>
                                {
                                    (() => {
                                        if (!customersExpiredData?.recentlyExpiredCustomers?.length) {
                                            return (
                                                <h3>📄 No hay clientes vencidos recientemente.</h3>
                                            );
                                        }
                                        const filtered = customersExpiredData?.recentlyExpiredCustomers?.filter(data => data?.nuip?.includes(filterByNuipRecentExpiredCustomers));
                                        if (!filtered?.length) {
                                            return filterByNuipRecentExpiredCustomers ? (
                                               <h3>{`🚨 No se encontró ningún cliente registrado con el número de documento ingresado: ${filterByNuipRecentExpiredCustomers}.`}</h3>
                                            ) : (
                                                <h3>📄 No hay clientes vencidos recientemente.</h3>
                                            );
                                        }
                                        return filtered.map((data, idx) => (
                                            <DefaultCard
                                                key={data?.id || idx}
                                                data={data}
                                                onClick={handleRedirection}
                                            />
                                        ));
                                    })()
                                }
                            </div>
                        </div>

                        <div className={styles.mainSectionWrapper}>
                            <div className={styles.mainSubtitle}>
                                <h3>Historial de Vencimientos ({customersExpiredData?.expiredCustomersMetrics?.total_expired_customers ?? fallbackData.clientes_vencidos_total})</h3>
                                <div className={styles.containerInput}>
                                    <input
                                        title={'Buscar cliente'}
                                        type="text"
                                        value={filterByNuipHistoricExpiredCustomers}
                                        onChange={(e) => setFilterByNuipHistoricExpiredCustomers(e.target.value)}
                                        name="nuip-historic"
                                        className={styles.inputStyle}
                                        placeholder="Documento de identidad..."
                                        required
                                    />
                                    <div className={styles.iconSearch}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path
                                                d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                                                fill="none" stroke="currentColor" strokeMiterlimit={10}
                                                strokeWidth={32}/>
                                            <path fill="none" stroke="currentColor" strokeLinecap="round"
                                                  strokeMiterlimit={10} strokeWidth={32} d="M338.29 338.29L448 448"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.mainSectionContent}>
                                {
                                    (() => {
                                        if (!customersExpiredData?.allExpiredCostumers?.length) {
                                            return (
                                                <h3>📄 No hay clientes con membresías vencidas.</h3>
                                            );
                                        }
                                        const filtered = customersExpiredData?.allExpiredCostumers?.filter(data => data?.nuip?.includes(filterByNuipHistoricExpiredCustomers));
                                        if (!filtered?.length) {
                                            return filterByNuipHistoricExpiredCustomers ? (
                                                <h3>{`🚨 No se encontró ningún cliente registrado con el número de documento ingresado: ${filterByNuipHistoricExpiredCustomers}.`}</h3>
                                            ) : (
                                                <h3>📄 No hay clientes con membresías vencidas.</h3>
                                            );
                                        }
                                        return filtered.map((data, idx) => (
                                            <DefaultCard
                                                key={data?.id || idx}
                                                data={data}
                                                onClick={handleRedirection}
                                            />
                                        ));
                                    })()
                                }
                            </div>
                        </div>
                    </main>

                </div>
            </div>

            {/* Loader visibility */}
            {(loadingState.firstLoading || loadingState.generalLoading) && <Loader/>}
        </>
    );
}