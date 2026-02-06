import styles from "./AccessPage.module.css";
/** @type {string} */
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
import { useObjectState } from "../../hooks/useObjectState.js";
import { AlertDialog } from "../../components/modals/alert-dialog/AlertDialog.jsx";
import genericError from "../../assets/3d-icons/error-generic.png";
import lockAccess from "../../assets/3d-icons/lock-access.png";
import siren from "../../assets/3d-icons/siren-security.png";

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

    // Custom hook to handles messages in the alert dialog
    const { updateStateByKey, objectData: dialogSettings } = useObjectState({
        status: false,
        closeDialog: () => updateStateByKey('status', false),
        openDialog: () => updateStateByKey('status', true),
        image: null,
        title: '',
        description: ''
    });

    // Handler to send request and verify access code
    const handleAccess = async () => {
        // Validate format for the employee access code
        const validatorAccessCode = /^\d{6}$/;
        const isValidAccessCodeFormat = validatorAccessCode.test(form.plain_access_code);
        if (!isValidAccessCodeFormat) {
            updateStateByKey('image', genericError);
            updateStateByKey('title', '¡Código de acceso inválido!');
            updateStateByKey('description', 'El formato ingresado no es válido. Debes ingresar exactamente 6 dígitos numéricos.');
            updateStateByKey('status', true);
            return;
        }

        try {
            // Request to the server to verify access employee code
            const response = await executeFetchWithAuth();
            if (!response.success) {
                updateStateByKey('image', lockAccess);
                updateStateByKey('title', '¡Acceso denegado!');
                updateStateByKey('description', 'El código ingresado no es válido, vuelve a intentarlo.');
                updateStateByKey('status', true);
                setValidCodeAccess(false);
                resetForm();
                return;
            }

            // Request to update the status of all memberships that were previously expired, only if the access code is correct
            const responseUpdateMemberships = await executeFetch();
            console.debug(responseUpdateMemberships?.message); // As custom hook designed, if this message prints, there was no error in the response. TESTING FIRST VERSION

            resetForm();
            setValidCodeAccess(true);
            navigate('/');

        } catch (err) {
            updateStateByKey('image', siren);
            updateStateByKey('title', '¡Ups! Algo salió mal');
            updateStateByKey('description', 'No pudimos procesar tu solicitud en este momento. Intenta nuevamente.');
            updateStateByKey('status', true);
            setValidCodeAccess(false);
            resetForm();
            console.debug('El error es:', err); // TESTING FIRST VERSION
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

            {/* Controlling loader */}
            {isLoading && <Loader/>}

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