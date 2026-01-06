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

    // Fallback API data
    const fallbackData = {
        // Queries data -> membership_type = expired
            // Cambiar los nombres de estas propiedades cuando haya conexión real a la API...
        clientes_vencidos_total: 250,
        clientes_vencidos_recientemente: 23,
        // Customer info data
        nuip: '1122334567',
        first_name: 'Bruno',
        first_last_name: 'Jiménez',
        profile_image_url: null,
        // Membership info data
        membership_type: 'Plan promocional',
        start_date: '2025-03-19',
        end_date: '2025-04-19'
    };

    // Function that handles redirection to the payments module
    const navigate = useNavigate();
    const handleRedirection = () => {
        navigate("/pagos");
    }

    // TODO: Falta usar la data cargada para renderizar las cards
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
                    alert('No se pudo cargar la información de los clientes vencidos...');
                    navigate("/acceso", { replace: true });
                }
                // TESTING CJ
                alert(result?.data.message ?? '¡Clientes vencidos encontrados!');
                console.log(result?.data ?? 'Error imprimiendo los datos de los clientes vencidos...');
            } catch (err) {
                console.error(err);
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


    // TODO: también agregar mensaje en cado de que no se renderice ninguna card porque no se hayan encontrado clientes vencidos
    // TODO: agregar filtros de encontrar usuario por nuip y no se encuentra ningún usuario mostrar mensaje (reciclar lógica del módulo de usuarios/clientes)

    return (
        <>
            <div className={`defaultContainer ${styles.globalPageWrapper}`}>
                <div className={styles.contentAreaWrapper}>

                    <header>
                        <h1>Clientes Vencidos ({fallbackData.clientes_vencidos_total})</h1>
                    </header>

                    <main>
                        <div className={styles.mainSectionWrapper}>
                            <div className={styles.mainSubtitle}>
                                <h3>Clientes Vencidos Recientemente ({fallbackData.clientes_vencidos_recientemente})</h3>
                                <div className={styles.containerInput}>
                                    <input title={'Buscar cliente'} type="text" name="nuip" className={styles.inputStyle} placeholder="Documento de identidad..." required/>
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
                                <DefaultCard data={fallbackData} onClick={handleRedirection}/>
                                <DefaultCard data={fallbackData} onClick={handleRedirection}/>
                                <DefaultCard onClick={handleRedirection}/>
                                <DefaultCard onClick={handleRedirection}/>
                                <DefaultCard onClick={handleRedirection}/>
                                <DefaultCard onClick={handleRedirection}/>
                                <DefaultCard onClick={handleRedirection}/>
                            </div>
                        </div>

                        <div className={styles.mainSectionWrapper}>
                            <div className={styles.mainSubtitle}>
                                <h3>Historial de Vencimientos ({fallbackData.clientes_vencidos_total})</h3>
                                <div className={styles.containerInput}>
                                    <input title={'Buscar cliente'} type="text" name="nuip" className={styles.inputStyle}
                                           placeholder="Documento de identidad..." required/>
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
                                <DefaultCard data={fallbackData} onClick={handleRedirection} />
                                <DefaultCard data={fallbackData} onClick={handleRedirection} />
                                <DefaultCard/>
                                <DefaultCard/>
                                <DefaultCard/>
                                <DefaultCard/>
                                <DefaultCard/>
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