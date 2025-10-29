import styles from "./LoginPage.module.css";
import utilStyles from "../../styles/utilities/utilities.module.css";
/** @type {string} */
import logo from "../../assets/logos/logo_complete_base.png";
import { MainInput } from "../../components/inputs/heading/MainInput.jsx";
import { MainButton } from "../../components/buttons/heading/MainButton.jsx";
import { useForm } from "../../hooks/useForm.js";
import { useFetchWithAuth } from "../../hooks/useFetchWithAuth.js";
import { optionsWithBody } from "../../utils/misc/fetchOptions.js";
import { checkRequestData } from "../../utils/misc/miscHelpers.js";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";

export function LoginPage() {
    const { form, handlerSetForm } = useForm({ nit: '', plain_pass: '' });
    // Creamos en memoria el custom hook para el fetching con el wrapper de autenticación (en este caso no se usa porque es el login)
    const { data, error, isLoading, executeFetch } = useFetchWithAuth('/auth', optionsWithBody(form, 'POST'));
    // Traemos el contexto
    const { setAuth } = useContext(AuthContext);

    // Login handler testing
    const handleLogin = async () => {
        try {
            // Empecemos a consumir esta monda
            console.log('Empezamos el proceso de login...');
            // Verificamos que la data que se envía al backend no esté vacía (como capa extra de seguridad)
            console.log(form);
            if(!checkRequestData(form)) return alert('Debes ingresar datos...');
            // Si hay data que enviar empezamos el proceso de fetching y consumir los endpoints correspondientes
            const data = await executeFetch();
            alert(data?.message);
            // Seteamos el contexto para dar paso
            setAuth(true);
        } catch (err) {
            alert('Hubo un error, imprimiendo en consola...');
            console.error(err);
        }
    };

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
                            <MainInput placeholder={'NIT (ej: 999999999-9)'} type={'text'} inputMode={'numeric'} name={'nit'} value={form.nit} onChange={handlerSetForm}/>
                            <MainInput placeholder={'Contraseña'} type={'password'} name={'plain_pass'} value={form.plain_pass} onChange={handlerSetForm}/>
                            <MainButton btnText='Iniciar' onClick={handleLogin}/>
                            <p>¿Aún no tienes una cuenta? <a href="mailto:jmncamilo@gmail.com">Solicita acceso aquí.</a></p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}