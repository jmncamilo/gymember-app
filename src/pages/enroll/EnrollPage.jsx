import styles from "./EnrollPage.module.css";
import utilStyles from "../../styles/utilities/utilities.module.css";
import "../defaultStyles.css";
import { DefaultInput } from "../../components/inputs/default/DefaultInput.jsx";
import { DefaultButton } from "../../components/buttons/default/DefaultButton.jsx";
import { DefaultSelect } from "../../components/inputs/select/DefaultSelect.jsx";
import { useState } from "react";
import { useForm } from "../../hooks/useForm.js";
import { INITIAL_FORM_VALUES } from "./enrollFormInitialValues.js";
import { calcAge } from "../../utils/calculators/calcAge.js";
import { calcEndDate } from "../../utils/calculators/calcEndDate.js";

export function EnrollPage() {

    // TODO: Este error es para manejar en el try-catch del botón de Registrar Cliente, dentro del primer filtro.
    const [error, setError] = useState({
        status: true,
        message: '❌ Es necesario diligenciar todos los campos para continuar con el registro...'
    });

    // Destructuring useForm that is my custom hook to handle this page form
    const { form, resetForm, customSetForm, handlerSetForm } = useForm(INITIAL_FORM_VALUES);

    // Handling the age field in the form based on the selected birthdate
    const handlerSetFormAge = () => {
        customSetForm('age', calcAge(form.birthdate));
    }

    // Setting the end_date field by calculating its value from data in the star_date and duration_days inputs
    const handlerSetFormEndDate = () => {
        customSetForm('end_date', calcEndDate(form.start_date, form.duration_days));
    };

    return (
        <div className={`defaultContainer ${utilStyles.flexCenterAlign} ${styles.pageWrapper}`}>
            <div className={`${utilStyles.flexCenterAlign} ${styles.mainWrapper}`}>

                <header>
                    <h1 className={styles.titlePage}>Registrar Nuevo Cliente</h1>
                </header>

                <main>
                    <div className={styles.boxSubtitle}>
                        <h3>Datos del Cliente</h3>
                    </div>
                    <div className={styles.boxClient}>
                        <div className={styles.clientFirstColumn}>
                            <div className={styles.boxInput}>
                                <DefaultInput text={'Primer nombre:'} type={'text'} name={'first_name'} value={form.first_name} onChange={handlerSetForm} htmlFor={'name'}/>
                            </div>
                            <div className={styles.boxInput}>
                                <DefaultInput text={'Documento de identidad:'} type={'number'} name={'nuip'} value={form.nuip} onChange={handlerSetForm} htmlFor={'nuip'}/>
                            </div>
                            <div className={styles.boxInput}>
                                <DefaultInput text={'Número de teléfono:'} type={'number'} name={'phone_number'} value={form.phone_number} onChange={handlerSetForm} htmlFor={'phone'}/>
                            </div>
                            <div className={styles.boxInput}>
                                <DefaultInput text={'Fecha de nacimiento:'} type={'date'} name={'birthdate'} value={form.birthdate} onChange={handlerSetForm} onBlur={handlerSetFormAge} htmlFor={'birthday'}/>
                            </div>
                            <div className={styles.boxInput}>
                                <DefaultInput text={'Dirección domiciliaria:'} type={'text'} name={'address'} value={form.address} onChange={handlerSetForm} htmlFor={'address'}/>
                            </div>
                            <div className={styles.boxInput}>
                                <DefaultInput text={'Contacto de emergencia:'} type={'number'} name={'emergency_phone'} value={form.emergency_phone} onChange={handlerSetForm} htmlFor={'attendant'}/>
                            </div>
                        </div>
                        <div className={styles.clientSecondColumn}>
                            <div className={styles.boxInput}>
                                <DefaultInput text={'Primer apellido:'} type={'text'} name={'first_last_name'} value={form.first_last_name} onChange={handlerSetForm} htmlFor={'lastname'}/>
                            </div>
                            <div className={styles.boxInput}>
                                <DefaultInput text={'Correo electrónico:'} type={'email'} name={'email'} value={form.email} onChange={handlerSetForm} htmlFor={'email'}/>
                            </div>
                            <div className={styles.boxInput}>
                                <DefaultSelect text={'Seleccionar género:'} name={'gender'} value={form.gender} onChange={handlerSetForm} htmlFor={'gender'}>
                                    <option value="" disabled hidden>...</option>
                                    <option value="m">Masculino</option>
                                    <option value="f">Femenino</option>
                                </DefaultSelect>
                            </div>
                            <div className={styles.boxInput}>
                                <DefaultInput text={'Edad actual:'} type={'text'} name={'age'} value={form.age} onChange={handlerSetForm} htmlFor={'age'} readOnly={true}/>
                            </div>
                            <div className={styles.boxInput}>
                                <DefaultInput text={'Ciudad de nacimiento:'} type={'text'} name={'city'} value={form.city} onChange={handlerSetForm} htmlFor={'city'}/>
                            </div>
                            <div className={styles.boxInput}>
                                <DefaultInput text={'Información adicional:'} type={'text'} name={'additional_info'} value={form.additional_info} onChange={handlerSetForm} htmlFor={'comments'}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.boxSubtitle}>
                        <h3>Datos de la Membresía</h3>
                    </div>
                    <div className={styles.boxMembership}>
                        <div className={styles.boxInput}>
                            <DefaultSelect text={'Tipo de membresía:'} name={'membership_type'} value={form.membership_type} onChange={handlerSetForm} htmlFor={'type-membership'}>
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
                        <div className={styles.boxInput}>
                            <DefaultSelect text={'Estado de la membresía:'} name={'status'} value={form.status} onChange={handlerSetForm} htmlFor={'membership-status'}>
                                <option value="" disabled hidden>...</option>
                                <option value="pending">Pago pendiente</option>
                                <option value="trial">Cortesía</option>
                            </DefaultSelect>
                        </div>
                        <div className={styles.boxInput}>
                            <DefaultInput text={'Vigencia de la membresía (en días):'} type={'number'} name={'duration_days'} value={form.duration_days} onChange={handlerSetForm} onBlur={handlerSetFormEndDate} htmlFor={'membership-days'}/>
                        </div>
                        <div className={styles.boxInput}>
                            <DefaultInput text={'Fecha de inscripción:'} type={'date'} name={'start_date'} value={form.start_date} onChange={handlerSetForm} onBlur={handlerSetFormEndDate} htmlFor={'start-day'}/>
                        </div>
                        <div className={styles.boxInput}>
                            <DefaultInput text={'Fecha de expiración:'} type={'date'} name={'end_date'} value={form.end_date} onChange={handlerSetForm} htmlFor={'end-day'}
                                          readOnly={true}/>
                        </div>

                        {/* Dynamic error logic is here */}
                        {error.status &&
                            <div className={styles.boxInput}>
                                <p>{error.message}</p>
                            </div>}

                        <div className={styles.boxInput}>
                            <span className={styles.boxButton}>
                                <DefaultButton onClick={() => {console.log(form)}} text={'Registrar Cliente'}/>
                            </span>
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
}