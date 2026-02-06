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
import { AlertDialog } from "../../components/modals/alert-dialog/AlertDialog.jsx";
import megaphone from "../../assets/3d-icons/megaphone-thirdv.png";
import castleForbiddenAccess from "../../assets/3d-icons/castle-forbidden.png";
import { useObjectState } from "../../hooks/useObjectState.js";

export function LoginPage() {
    const { form, handlerSetForm } = useForm({ nit: '', plain_pass: '' });

    // Define the custom fetch hook in memory with the authentication wrapper (don't use the wrapper here since this is the login)
    const { executeFetch } = useFetchWithAuth('/auth', optionsWithBody(form, 'POST'));

    // Get auth context
    const { setAuth } = useContext(AuthContext);

    // Custom hook to handles messages in the alert dialog
    const { updateStateByKey, objectData: dialogSettings } = useObjectState({
        status: false,
        closeDialog: () => updateStateByKey('status', false),
        openDialog: () => updateStateByKey('status', true),
        image: null,
        title: '',
        description: ''
    });

    // Login handler
    const handleLogin = async () => {
        try {
            // Verify that the data sent to the backend is not empty (as an extra layer of security)
            if(!checkRequestData(form)) {
                updateStateByKey('image', megaphone);
                updateStateByKey('title', '¡Datos incompletos!');
                updateStateByKey('description', 'Por favor completa todos los campos para continuar con el inicio de sesión.');
                updateStateByKey('status', true);
                return;
            }
            // If there is data to send, we begin the fetching process and consume the corresponding endpoints
            const data = await executeFetch();
            // Validate data it was response by status ok (it should contain id)
            if (!data?.data?.id) {
                updateStateByKey('image', castleForbiddenAccess);
                updateStateByKey('title', '¡Alto ahí!');
                updateStateByKey('description', 'Tu NIT o contraseña no son válidos. Verifica e intenta de nuevo.');
                updateStateByKey('status', true);
                setAuth(false);
                return;
            }
            // If response was ok, then credentials are valid
            setAuth(true);
        } catch (err) {
            updateStateByKey('image', castleForbiddenAccess);
            updateStateByKey('title', '¡Alto ahí!');
            updateStateByKey('description', 'Tu NIT o contraseña no son válidos. Verifica e intenta de nuevo.');
            updateStateByKey('status', true);
            setAuth(false);
            console.debug(err); // TESTING FIRST VERSION
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