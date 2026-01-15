import styles from "./PaymentsPage.module.css";
import "../defaultStyles.css";
import { DefaultInput } from "../../components/inputs/default/DefaultInput.jsx";
import { DefaultSelect } from "../../components/inputs/select/DefaultSelect.jsx";
import { StatusBadge } from "../../components/badges/StatusBadge.jsx";
import { DefaultButton } from "../../components/buttons/default/DefaultButton.jsx";
import { useState } from "react";
import { useForm } from "../../hooks/useForm.js";
import { INITIAL_FORM_VALUES, INITIAL_CUSTOMER_STATUS_VALUES } from "./paymentsFormInitialValues.js";
import { calcEndDate } from "../../utils/calculators/calcEndDate.js";
import { formatCurrency, removeCurrencyFormat } from "../../utils/formatters/amountFormatters.js";
import { useFetchWithAuth } from "../../hooks/useFetchWithAuth.js";
import { getOptions, optionsWithBody } from "../../utils/misc/fetchOptions.js";
import { validateGrantedDays } from "../../utils/validators/numberValidators.js";
import {
    normalizeObjectFields,
    validateRequiredFields,
    filterObjectByKeys,
    removeValuesFromArray
} from "../../utils/misc/miscHelpers.js";
import { API_FIELDS } from "../../utils/constants/apiFields.js";

export function PaymentsPage() {
    // Destructuring useForm custom hook to handle this page form
    const { form, resetForm, handlerSetForm, customSetForm } = useForm(INITIAL_FORM_VALUES);

    // Using custom hook to fetching validating nuip
    const {
        isLoading: isLoadingFindByNuip,
        executeFetchWithAuth
    } = useFetchWithAuth(`/customers/find/${form.nuip}`, getOptions);

    // Using custom hook to fetch customer renewal payment
    const {
        isLoading: isLoadingRenewalPayment,
        executeFetch: executeRenewalPaymentFetchWithAuth
    } = useFetchWithAuth(`/customers/renew/transaction`, optionsWithBody({}, 'POST'));

    // Using custom hook to fetch customer first payment
    const {
        isLoading: isLoadingFirstPayment,
        executeFetch: executeFirstPaymentFetchWithAuth
    } = useFetchWithAuth(`/customers/transaction`, optionsWithBody({}, 'POST'));

    // Handling customer data to show remaining days and membership status
    const [customerStatusInfo, setCustomerStatusInfo] = useState(INITIAL_CUSTOMER_STATUS_VALUES);

    // Handling dynamic options if customer is new user or not
    const [isFirstPayment, setIsFirstPayment] = useState('1');

    // Handling currency format in the amount input as a state. Just the visual part...
    const [amountFormat, setAmountFormat] = useState(form.amount);

    const handlerFormatAmountBlur = () => {
        setAmountFormat(formatCurrency(form.amount));
    };

    // Handling dynamic error. SetError is already unused 'cause there is no function calling it
    const [error, setError] = useState({
        status: false,
        message: ''
    });

    // Handler to calc end_date through start date
    const handlerStartDateBlur = () => {
        customSetForm('end_date', calcEndDate(form.start_date, form.duration_days));
    };

    // Implement state to store the last duration_days value and optimize end_date calculation
    const [lastDurationDays, setLastDurationDays] = useState(null);

    // Handler to calc end_date through duration_days, days remaining and start date
    const handlerDurationDaysBlur = () => {
        if (lastDurationDays === form.duration_days) return;
        // Get the remaining days and adds them to the granted days value
        const grantedDays = validateGrantedDays(Number(form.duration_days) || 0);
        const remainingDays = Number(customerStatusInfo.days_remaining) || 0;
        const totalRemainingDays = String(grantedDays + remainingDays);
        // Set the final values in the corresponding fields
        customSetForm('duration_days', totalRemainingDays);
        customSetForm('end_date', calcEndDate(form.start_date, totalRemainingDays));
        setLastDurationDays(totalRemainingDays);
    };

    // Handler to delete the amount currency format and get a raw value to API
    const handlerRemoveCurrencyFormat = (e) => {
        const { value, selectionStart } = e.target;
        customSetForm('amount', removeCurrencyFormat(value));
        setAmountFormat(removeCurrencyFormat(value));

        setTimeout(() => {
            e.target.setSelectionRange(selectionStart, selectionStart);
        }, 0);
    };

    // Handler to find a customer by nuip (endpoint) and get days remaining, status membership and id
    const handlerFindByNuip = async () => {
        if (!form.nuip) {
            setError({
                status: true,
                message: '❌ Es necesario ingresar un número de documento...'
            });
            // Get back initial values if response was not ok
            setCustomerStatusInfo(INITIAL_CUSTOMER_STATUS_VALUES);
            customSetForm('customer_id_fk', '');
            return;
        }

        try {
            // Fetching process
            const result = await executeFetchWithAuth();
            if (!result.success) {
                // Handling custom error
                setError(
                    result?.error === 'Ocurrió un error al procesar la solicitud. Vuelve a intentarlo.'
                        ? {
                            status: true,
                            message: `❌ No existe ningún usuario registrado con el documento de identidad ingresado...`
                        }
                        : {
                            status: true,
                            message: `❌ ${result?.error}..`
                        }
                );
                // Get back initial values if response was not ok
                setCustomerStatusInfo(INITIAL_CUSTOMER_STATUS_VALUES);
                customSetForm('customer_id_fk', '');
                return;
            }
            // Clear any previous error if one was displayed
            setError({
                status: false,
                message: ''
            });
            // Set customer membership info
            setCustomerStatusInfo({
                days_remaining: result?.data?.data?.days_remaining || '0',
                status: result?.data?.data?.status || 'pending',
                id_customer: result?.data?.data?.id_customer || null
            });
            // Set customer id fk in the main form
            customSetForm('customer_id_fk', result?.data?.data?.id_customer || '');

        } catch (err) {
            console.log(err); // Testing CJ
            setCustomerStatusInfo(INITIAL_CUSTOMER_STATUS_VALUES);
            resetForm();
            alert('Pasó algo raro...'); // This should be in a modal
        }
    };

    // Handler to process payment transaction for a membership that is a first payment
    const handlerFirstPayment = async () => {
        // Clear any previous error messages before processing the first payment
        setError({
            status: false,
            message: ''
        });

        try {
            // Filter the form object to include only the fields required for first-time payment processing
            const filterFormObj = filterObjectByKeys(form, API_FIELDS.FIRST_TRANSACTION);
            // Sanitizes specific object keys before sending to the backend to ensure secure validation
            const requestPayload = normalizeObjectFields(filterFormObj, ['customer_id_fk']);
            // Final validation of the object before sending it to the API
            const isValidRequest = validateRequiredFields(requestPayload, removeValuesFromArray(API_FIELDS.FIRST_TRANSACTION, ['description']));
            if (!isValidRequest) return alert('No está listo el objeto para enviar la solicitud de primer pago...');
            console.log('Primer pago' ,requestPayload);

            // Fetching process
            const result = await executeFirstPaymentFetchWithAuth(optionsWithBody(requestPayload, 'POST'));
                // If the request is successful this happens. If not, the flow is redirected to the catch block due to the executeFetch design.
            alert(`${result?.message}`); // This should be in a modal
            console.log('Proceso de primer pago finalizado...');
            resetForm();

        } catch (err) {
            console.log(err);
            setError({
                status: true,
                message: '❌ ¡Oops, algo salió mal! Intenta de nuevo...'
            });
        }
    };

    // Handler to process payment transaction for a membership that is a renewal
    const handlerRenewalPayment = async () => {
        // Clear any previous error messages before processing the first payment
        setError({
            status: false,
            message: ''
        });

        try {
            // Filter the form object to include only the fields required for first-time payment processing
            const filterFormObj = filterObjectByKeys(form, API_FIELDS.RENEW_TRANSACTION);
            // Sanitizes specific object keys before sending to the backend to ensure secure validation
            const requestPayload = normalizeObjectFields(filterFormObj, ['customer_id_fk']);
            // Final validation of the object before sending it to the API
            const isValidRequest = validateRequiredFields(requestPayload, removeValuesFromArray(API_FIELDS.RENEW_TRANSACTION, ['description']));
            if (!isValidRequest) return alert('No está listo el objeto para enviar la solicitud de pago por renovación...');
            console.log('Renovación', requestPayload);

            // Fetching process
            const result = await executeRenewalPaymentFetchWithAuth(optionsWithBody(requestPayload, 'POST'));
            alert(`${result?.message}`); // This should be in a modal
            console.log('Proceso de pago por renovación finalizado...');
            resetForm();

        } catch (err) {
            console.log(err);
            setError({
                status: true,
                message: '❌ ¡Oops, algo salió mal! Intenta de nuevo la renovación...'
            });
        }
    };

    // TODO: Crear el modal reutilizable para cuando se ejecuten procesos correctamente...

    return (
        <>
            <div className={`defaultContainer ${styles.globalPageWrapper}`}>
                <div className={styles.contentPageWrapper}>

                    <header>
                        <h1>Registrar Transacción</h1>
                    </header>

                    <main>
                        <div className={styles.firstMainBox}>
                            <div className={styles.inputBox}>
                                <DefaultInput name={'nuip'} value={form.nuip} onChange={handlerSetForm} onBlur={handlerFindByNuip} text={'Número de documento:'} type={'number'} htmlFor={'nuip'}/>
                            </div>
                            <div className={styles.inputBox}>
                                <DefaultInput name={'days_remaining'} value={customerStatusInfo.days_remaining} text={'Días restantes:'} type={'number'} htmlFor={'days-remaining'}
                                              readOnly={true}/>
                            </div>
                            <div className={`${styles.inputBox} ${styles.badgeBox}`}>
                                <p>Estado de la membresía:</p>
                                <StatusBadge status={customerStatusInfo.status} type={customerStatusInfo.status}/>
                            </div>
                            <div className={styles.inputBox}>
                                <DefaultSelect text={'¿Es inscripción inicial?'} htmlFor={'enrolling'} value={isFirstPayment} onChange={(e) => setIsFirstPayment(e.target.value)}>
                                    <option value="1">Sí</option>
                                    <option value="0">No</option>
                                </DefaultSelect>
                            </div>
                            {isFirstPayment === '0' && (
                                <>
                                    <div className={styles.inputBox}>
                                        <DefaultSelect name={'membership_type'} value={form.membership_type} onChange={handlerSetForm} text={'Tipo de membresía:'} htmlFor={'type-membership'}>
                                            <option value="" disabled hidden>...</option>
                                            <option value="Diario">Pase diario</option>
                                            <option value="Semanal">Pase semanal</option>
                                            <option value="Quincenal">Plan quincenal</option>
                                            <option value="Mensual">Mensualidad</option>
                                            <option value="Trimestral">Plan trimestral</option>
                                            <option value="Semestral">Plan semestral</option>
                                            <option value="Anual">Plan anual</option>
                                            <option value="Promocional">Plan promocional</option>
                                            <option value="Otro">Otro</option>
                                        </DefaultSelect>
                                    </div>
                                    <div className={styles.inputBox}>
                                        <DefaultInput name={'start_date'} value={form.start_date} onChange={handlerSetForm} onBlur={handlerStartDateBlur} text={'Fecha de inicio:'} type={'date'} htmlFor={'start-date'}/>
                                    </div>
                                    <div className={styles.inputBox}>
                                        <DefaultInput name={'duration_days'} value={form.duration_days} onChange={handlerSetForm} onBlur={handlerDurationDaysBlur} text={'Vigencia (en días):'} type={'number'} htmlFor={'days-membership'}/>
                                    </div>
                                    <div className={styles.inputBox}>
                                        <DefaultInput name={'end_date'} value={form.end_date} onChange={handlerSetForm} text={'Fecha de vencimiento:'} type={'date'} htmlFor={'end-date'}
                                                      readOnly={true}/>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className={styles.secondMainBox}>
                            <h3>Detalles de la Transacción</h3>
                            <div className={styles.transactionBoxContent}>
                                <div className={styles.inputBox}>
                                    <DefaultSelect name={'transaction_category'} value={form.transaction_category} onChange={handlerSetForm} text={'Categoría:'} htmlFor={'category-transaction'}>
                                        <option value="Membresía">Membresía</option>
                                    </DefaultSelect>
                                </div>
                                <div className={styles.inputBox}>
                                    <DefaultSelect name={'transaction_type'} value={form.transaction_type} onChange={handlerSetForm} text={'Tipo de transacción:'} htmlFor={'type-transaction'}>
                                        <option value="" disabled hidden>...</option>
                                        <option value="Renovación">Renovación</option>
                                        <option value="Inscripción">Inscripción</option>
                                        <option value="Abono">Abono</option>
                                        <option value="Deuda">Deuda</option>
                                    </DefaultSelect>
                                </div>
                                <div className={styles.inputBox}>
                                    <DefaultInput name={'amount'} value={amountFormat} onChange={handlerRemoveCurrencyFormat} onBlur={handlerFormatAmountBlur} onFocus={() => setAmountFormat(removeCurrencyFormat(form.amount))} text={'Valor de transacción:'} type={'text'}
                                                  htmlFor={'amount'}/>
                                </div>
                                <div className={styles.inputBox}>
                                    <DefaultSelect name={'payment_method'} value={form.payment_method} onChange={handlerSetForm} text={'Medio de pago:'} htmlFor={'payment-method'}>
                                        <option value="" disabled hidden>...</option>
                                        <option value="Efectivo">Efectivo</option>
                                        <option value="Transferencia">Transferencia bancaria</option>
                                        <option value="Tarjeta">Tarjeta (crédito o débito)</option>
                                        <option value="Nequi">Nequi</option>
                                        <option value="Daviplata">Daviplata</option>
                                        <option value="PayPal">PayPal</option>
                                    </DefaultSelect>
                                </div>
                                <div className={styles.inputBox}>
                                    <DefaultInput name={'description'} value={form.description} onChange={handlerSetForm} text={'Detalles adicionales:'} type={'text'}
                                                  htmlFor={'description'}/>
                                </div>
                                <div className={`${styles.inputBox} ${styles.buttonBox}`}>
                                    <DefaultButton
                                        text={'Procesar Pago'}
                                        onClick={() => (isFirstPayment === '1' ? handlerFirstPayment() : handlerRenewalPayment())}
                                    />
                                </div>
                            </div>
                            {error.status && <h5>{error.message}</h5>}
                        </div>
                    </main>

                </div>
            </div>
        </>
    );
}