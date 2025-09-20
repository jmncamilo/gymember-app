import styles from "./LoginPage.module.css";
import utilStyles from "../../styles/utilities/utilities.module.css";
/** @type {string} */
import logo from "../../assets/logos/logo_complete_base.png";
import { MainInput } from "../../components/inputs/heading/MainInput.jsx";
import { MainButton } from "../../components/buttons/heading/MainButton.jsx";

export function LoginPage() {
    return (
        <>
            <div className={`${styles.generalWrapper} ${utilStyles.flexCenterAlign} ${utilStyles.flexRowToColum}`}>
                <header>
                    <div className={`${styles.logoApp} ${utilStyles.flexCenterAlign}`}>
                        <img src={logo} alt="gymember-logo"/>
                    </div>
                </header>
                <main>
                    <div className={`${styles.loginContainer} ${utilStyles.flexCenterAlign} ${utilStyles.flexRowToColum} ${styles.loginContainerGap}`}>
                        <h1 className={styles.titleH1}>Inicio de Sesión</h1>
                        <div className={styles.boxLoginElements}>
                            <MainInput placeholder={'NIT'} type={'number'}/>
                            <MainInput placeholder={'Contraseña'} type={'password'}/>
                            <MainButton btnText='Iniciar'/>
                            <p>¿Aún no tienes una cuenta? <a href="mailto:jmncamilo@gmail.com">Solicita acceso aquí.</a></p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}