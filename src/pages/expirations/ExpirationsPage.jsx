import styles from "./ExpirationsPage.module.css";
import "../defaultStyles.css";
import { DefaultCard } from "../../components/cards/default/DefaultCard.jsx";
import { useNavigate } from "react-router-dom";

export function ExpirationsPage() {

    // Simulating API
    const data = {
        // Queries data -> membership_type = expired
            // Cambiar los nombres de estas propiedades cuando haya conexión real a la API...
        clientes_vencidos_total: 250,
        clientes_vencidos_recientemente: 23,
        clientes_vencidos_historial: 227,
        // Customer info data
        nuip: 1122652725,
        first_name: 'Bruno',
        first_last_name: 'Jiménez',
        profile_image_url: false,
        // Membership info data
        membership_type: 'Plan promocional',
        start_date: '19/03/2025',
        end_date: '19/04/2025'
    };

    // Function that handles redirection to the payments module
    const navigate = useNavigate();
    const handleRedirection = () => {
        navigate("/pagos");
    }

    return (
        <>
            <div className={`defaultContainer ${styles.globalPageWrapper}`}>
                <div className={styles.contentAreaWrapper}>

                    <header>
                        <h1>Clientes Vencidos ({data.clientes_vencidos_total})</h1>
                    </header>

                    <main>
                        <div className={styles.mainSectionWrapper}>
                            <div className={styles.mainSubtitle}>
                                <h3>Clientes Vencidos Recientemente ({data.clientes_vencidos_recientemente})</h3>
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
                                <DefaultCard data={data} onClick={handleRedirection}/>
                                <DefaultCard onClick={handleRedirection}/>
                                <DefaultCard onClick={handleRedirection}/>
                                <DefaultCard onClick={handleRedirection}/>
                                <DefaultCard onClick={handleRedirection}/>
                                <DefaultCard onClick={handleRedirection}/>
                                <DefaultCard onClick={handleRedirection}/>
                            </div>
                        </div>

                        <div className={styles.mainSectionWrapper}>
                            <div className={styles.mainSubtitle}>
                                <h3>Historial de Vencimientos ({data.clientes_vencidos_historial})</h3>
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
                                <DefaultCard data={data} onClick={handleRedirection}/>
                                <DefaultCard data={data}/>
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
        </>
    );
}