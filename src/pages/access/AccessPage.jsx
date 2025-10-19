import styles from "./AccessPage.module.css";
import logo from "../../assets/logos/logo_complete_base.png";
import { MainInput } from "../../components/inputs/heading/MainInput.jsx";
import { Loader } from "../../components/loader/Loader.jsx";
import { useState } from "react";

export function AccessPage() {
    // State to show or hide the loader
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <div className={styles.mainWrapper}>
                <header>
                    <h1 className={styles.accessTitle}>Bienvenido(a) a Gymember</h1>
                </header>
                <main>
                    <h2 className={styles.accessSubheading}>Este espacio está reservado para personal autorizado. Por favor, ingresa tu código de acceso.</h2>
                    <div className={styles.inputContainer}>
                        <MainInput type={'number'} access={true}/>
                    </div>
                </main>
                <footer>
                    <div className={styles.logoApp}>
                        <img title={'Haz clic para acceder'} className={styles.isotype} src={logo} alt="gymember-logo"/>
                    </div>
                </footer>

                {/* Loader dynamic render */}
                {isLoading && <Loader/>}
            </div>
        </>
    );
}