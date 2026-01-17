import styles from "./AccessPage.module.css";
import logo from "../../assets/logos/logo_complete_base.png";
import { MainInput } from "../../components/inputs/heading/MainInput.jsx";
import { useForm } from "../../hooks/useForm.js";
import { useFetchWithAuth } from "../../hooks/useFetchWithAuth.js";
import { optionsWithBody } from "../../utils/misc/fetchOptions.js";
import AccessCodeContext from "../../context/AccessCodeContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader/Loader.jsx";
import { useFetch } from "../../hooks/useFetch.js";


export function AccessPage() {
    const { form, handlerSetForm, resetForm } = useForm({ plain_access_code: '' });

    // Custom hook to perform the request that verifies the access code
    const { isLoading, executeFetchWithAuth } = useFetchWithAuth('/employees/verify-code', optionsWithBody(form, 'POST'));

    // custom hook to perform the request that updates all expired membership to expired status
    const { executeFetch } = useFetch('/master/maintenance/memberships/update-expired', optionsWithBody({}, 'PATCH'));

    // Get access code context
    const { setValidCodeAccess } = useContext(AccessCodeContext);
    // Hook navigate of react-router-dom
    const navigate = useNavigate();

    // Handler to send request and verify access code
    const handleAccess = async () => {
        // Validate format for the employee access code
        const validatorAccessCode = /^\d{6}$/;
        const isValidAccessCodeFormat = validatorAccessCode.test(form.plain_access_code);
        if (!isValidAccessCodeFormat) {
            alert('El código de acceso no sigue el formato requerido... vuelve a intentarlo.');
            return;
        }

        try {
            // Request to the server to verify access employee code
            const response = await executeFetchWithAuth();
            if (!response.success) {
                alert('Parece que estás intentando acceder con un código inválido, vuelve a intentarlo...');
                setValidCodeAccess(false);
                resetForm();
                return;
            }

            // Request to update the status of all memberships that were previously expired, only if the access code is correct
            const responseUpdateMemberships = await executeFetch();
            console.log(responseUpdateMemberships?.message); // As hook designed, if this message prints, there was no error in the response

            resetForm();
            setValidCodeAccess(true);
            navigate('/');

        } catch (err) {
            alert('Hubo un error solicitando el acceso, vuelve a intentarlo más tarde...'); // Todo: modal this
            setValidCodeAccess(false);
            resetForm();
            console.error('El error es:', err);
        }
    };

    return (
        <>
            <div className={styles.mainWrapper}>
                <header>
                    <h1 className={styles.accessTitle}>Bienvenido(a) a Gymember</h1>
                </header>
                <main>
                    <h2 className={styles.accessSubheading}>Este espacio está reservado para personal autorizado. Por favor, ingresa tu código de acceso.</h2>
                    <div className={styles.inputContainer}>
                        <MainInput
                            type={'number'}
                            access={true}
                            name="plain_access_code"
                            value={form.plain_access_code}
                            onChange={handlerSetForm}
                            inputMode="numeric"
                        />
                    </div>
                </main>
                <footer>
                    <div className={styles.logoApp}>
                        <img
                            title={'Haz clic para acceder'}
                            className={styles.isotype}
                            src={logo}
                            alt="gymember-logo"
                            onClick={handleAccess}
                        />
                    </div>
                </footer>
            </div>

            {isLoading && <Loader/>}
        </>
    );
}