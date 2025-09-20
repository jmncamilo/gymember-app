import "../defaultStyles.css";
import styles from "./UsersPage.module.css";
/** @type {string} */
import editIcon from "../../assets/icons/table-edit.svg";
/** @type {string} */
import nuipIcon from "../../assets/icons/table-dni.svg";
/** @type {string} */
import customerIcon from "../../assets/icons/table-user.svg";
/** @type {string} */
import statusIcon from "../../assets/icons/table-status.svg";
/** @type {string} */
import membershipIcon from "../../assets/icons/table-membership.svg";
/** @type {string} */
import phoneIcon from "../../assets/icons/table-phone.svg";
/** @type {string} */
import profilePicIcon from "../../assets/icons/user-nopic.png";
import { StatusBadge } from "../../components/badges/StatusBadge.jsx";
import { useState } from "react";
import { DefaultInput } from "../../components/inputs/default/DefaultInput.jsx";
import { DefaultButton } from "../../components/buttons/default/DefaultButton.jsx";
import { DefaultSelect } from "../../components/inputs/select/DefaultSelect.jsx";
import { UsersRowTable } from "./UsersRowTable.jsx";
import { useForm } from "../../hooks/useForm.js";
import { INITIAL_FORM_VALUES } from "./usersFormInitialValues.js";
import { membershipTypeFormatter } from "../../utils/formatters/membershipTypeFormatter.js";

export function UsersPage() {

    // Simulating API
    const data = {
        total_customers: 299,
        nuip: '40441835',
        first_name: 'Néstor',
        first_last_name: 'Jiménez',
        email: 'nealji86@hotmail.com',
        phone_number: '3132097726',
        profile_image_url: null,
        birthdate: '1977-03-03',
        age: '50',
        address: 'Cra 9A #5B-04 Mi Llanura',
        city: 'Villavicencio',
        emergency_phone: '3125853937',
        additional_info: 'Quiere perder peso.',
        membership_type: 'Mensual',
        status: 'active',
        gender: 'm',
        duration_days: '30',
        start_date: '2025-04-23',
        end_date: '2025-05-22'
    };

    // Controlling modal form
    const [modalFormStatus, setModalFormStatus] = useState(false);

    // Custom hook to controlling form
    const { form, handlerSetForm, customSetForm, resetForm } = useForm(INITIAL_FORM_VALUES);

    // TODO: cuando se empiece a hacer el consumo de la api, el input para buscar cc se debe manejar, de momento no se ha hecho nada.

    return (
        <>
            <div className={`defaultContainer ${styles.generalWrapper}`}>
                <header>
                    <h1 className={styles.titleStyles}>Lista de Clientes ({data.total_customers})</h1>
                    <div className={styles.searchContainer}>
                        <input type="text" name="search_nuip" className={styles.searchInput}
                               placeholder="Buscar cliente por número de documento..."/>
                        <button className={styles.btnSearch}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                                <path
                                    d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                                    fill="#efeff1"></path>
                            </svg>
                        </button>
                    </div>
                </header>
                <main>
                    <div className={styles.tableContainer}>
                        <table className={styles.customersTable}>
                            <thead className={styles.theadTable}>
                            <tr>
                                <th className={styles.thTable}>
                                    <div className={styles.thWrapper}>
                                        <img className={styles.thIcon} src={editIcon} alt="Columna editar"/>
                                    </div>
                                </th>
                                <th className={styles.thTable}>
                                    <div className={styles.thWrapper}>
                                        <img className={styles.thIcon} src={nuipIcon} alt="Columna cédula"/>
                                        Cédula
                                    </div>
                                </th>
                                <th className={styles.thTable}>
                                    <div className={styles.thWrapper}>
                                        <img className={styles.thIcon} src={customerIcon} alt="Columna cliente"/>
                                        Cliente
                                    </div>
                                </th>
                                <th className={styles.thTable}>
                                    <div className={styles.thWrapper}>
                                        <img className={styles.thIcon} src={statusIcon} alt="Columna estado"/>
                                        Estado
                                    </div>
                                </th>
                                <th className={styles.thTable}>
                                    <div className={styles.thWrapper}>
                                        <img className={styles.thIcon} src={membershipIcon} alt="Columna membresía"/>
                                        Membresía
                                    </div>
                                </th>
                                <th className={styles.thTable}>
                                    <div className={styles.thWrapper}>
                                        <img className={styles.thIcon} src={phoneIcon} alt="Columna teléfono"/>
                                        Teléfono
                                    </div>
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                <td className={styles.tdTable}>
                                    <button onClick={()=> setModalFormStatus(true)} className={styles.btnEdit}>
                                        <img src={editIcon} alt="Editar usuario"/>
                                    </button>
                                </td>
                                <td className={styles.tdTable}>
                                    {data.nuip}
                                </td>
                                <td className={styles.tdTable}>
                                    <div className={styles.tdWrapperNamePic}>
                                        <img src={!data.profile_image_url ? profilePicIcon : data.profile_image_url}
                                             alt="Foto de perfil"/>
                                        {data.first_name + ' ' + data.first_last_name}
                                    </div>
                                </td>
                                <td className={styles.tdTable}>
                                    <div className={styles.badgeContainer}>
                                        <StatusBadge status={data.status} type={data.status}/>
                                    </div>
                                </td>
                                <td className={styles.tdTable}>
                                    {membershipTypeFormatter(data.membership_type)}
                                </td>
                                <td className={styles.tdTable}>
                                    {data.phone_number}
                                </td>
                            </tr>
                            <UsersRowTable data={data} setModalFormStatus={setModalFormStatus}/>
                            <UsersRowTable data={data} setModalFormStatus={setModalFormStatus}/>
                            <UsersRowTable data={data} setModalFormStatus={setModalFormStatus}/>
                            <UsersRowTable data={data} setModalFormStatus={setModalFormStatus}/>
                            <UsersRowTable data={data} setModalFormStatus={setModalFormStatus}/>
                            <UsersRowTable data={data} setModalFormStatus={setModalFormStatus}/>
                            <UsersRowTable data={data} setModalFormStatus={setModalFormStatus}/>
                            <UsersRowTable data={data} setModalFormStatus={setModalFormStatus}/>
                            <UsersRowTable data={data} setModalFormStatus={setModalFormStatus}/>
                            <UsersRowTable data={data} setModalFormStatus={setModalFormStatus}/>
                            <UsersRowTable data={data} setModalFormStatus={setModalFormStatus}/>
                            <UsersRowTable data={data} setModalFormStatus={setModalFormStatus}/>
                            <UsersRowTable data={data} setModalFormStatus={setModalFormStatus}/>
                            <UsersRowTable data={data} setModalFormStatus={setModalFormStatus}/>
                            <UsersRowTable data={data} setModalFormStatus={setModalFormStatus}/>
                            <UsersRowTable data={data} setModalFormStatus={setModalFormStatus}/>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
            {/* Modal form to modify some info to the customers */}
            <div className={`${styles.modalForm} ${modalFormStatus ? styles.modalFormOpen : styles.modalFormClosed}`}>
                <div className={styles.formWrapper}>
                    <div className={styles.titleWrapper}>
                        <h3 className={styles.titleForm}>Editar Datos del Cliente</h3>
                        <div className={styles.profilePicUpload}>
                            <img src={!data.profile_image_url ? profilePicIcon : data.profile_image_url} alt="Foto de perfil" className={styles.profilePicCircle}/>
                            <input name={'profile_pic'} type="file" accept="image/*" className={styles.inputFile} title="Subir foto"/>
                        </div>
                    </div>

                    <span className={styles.inputWrapper}>
                        <DefaultInput name={'nuip'} value={form.nuip || data.nuip} onChange={handlerSetForm} text={'Documento de identidad:'} htmlFor={'nuip'} type={'number'}/>
                    </span>
                    <span className={styles.inputWrapper}>
                        <DefaultInput name={'first_name'} value={form.first_name || data.first_name} onChange={handlerSetForm} text={'Nombre(s) del cliente:'} htmlFor={'name'} type={'text'}/>
                    </span>
                    <span className={styles.inputWrapper}>
                        <DefaultInput name={'first_last_name'} value={form.first_last_name || data.first_last_name} onChange={handlerSetForm} text={'Apellido(s) del cliente:'} htmlFor={'lastname'} type={'text'}/>
                    </span>
                    <span className={styles.inputWrapper}>
                        <DefaultInput name={'email'} value={form.email || data.email} onChange={handlerSetForm} text={'Correo electrónico:'} htmlFor={'email'} type={'email'}/>
                    </span>
                    <span className={styles.inputWrapper}>
                        <DefaultInput name={'phone_number'} value={form.phone_number || data.phone_number} onChange={handlerSetForm} text={'Número de teléfono:'} htmlFor={'phone'} type={'number'}/>
                    </span>
                    <span className={styles.inputWrapper}>
                        <DefaultInput name={'birthdate'} value={form.birthdate || data.birthdate} onChange={handlerSetForm} text={'Fecha de nacimiento:'} htmlFor={'birthdate'} type={'date'}/>
                    </span>
                    <span className={styles.inputWrapper}>
                        <DefaultInput name={'age'} value={form.age || data.age} onChange={handlerSetForm} text={'Edad del cliente:'} htmlFor={'age'} type={'number'}/>
                    </span>
                    <span className={styles.inputWrapper}>
                        <DefaultInput name={'address'} value={form.address || data.address} onChange={handlerSetForm} text={'Dirección domiciliaria:'} htmlFor={'address'} type={'text'}/>
                    </span>
                    <span className={styles.inputWrapper}>
                        <DefaultInput name={'city'} value={form.city || data.city} onChange={handlerSetForm} text={'Ciudad de nacimiento:'} htmlFor={'city'} type={'text'}/>
                    </span>
                    <span className={styles.inputWrapper}>
                        <DefaultInput name={'emergency_phone'} value={form.emergency_phone || data.emergency_phone} onChange={handlerSetForm} text={'Contacto de emergencia:'} htmlFor={'attendant'} type={'number'}/>
                    </span>
                    <span className={styles.inputWrapper}>
                        <DefaultInput name={'additional_info'} value={form.additional_info || data.additional_info} onChange={handlerSetForm} text={'Información adicional:'} htmlFor={'comments'} type={'text'}/>
                    </span>
                    <span className={styles.inputWrapper}>
                        <DefaultSelect name={'membership_type'} value={form.membership_type || data.membership_type} onChange={handlerSetForm} text={'Tipo de membresía:'} htmlFor={'type-membership'}>
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
                    </span>
                    <span className={styles.inputWrapper}>
                        <DefaultSelect name={'status'} value={form.status || data.status} onChange={handlerSetForm} text={'Estado de la membresía:'} htmlFor={'membership-status'}>
                            <option value="" disabled hidden>...</option>
                            <option value="active" disabled hidden>Activo</option>
                            <option value="trial" disabled hidden>Cortesía</option>
                            <option value="pending">Pago pendiente</option>
                            <option value="expired">Vencida</option>
                            <option value="cancelled">Cancelada</option>
                            <option value="frozen">Congelada</option>
                        </DefaultSelect>
                    </span>
                    <span className={styles.inputWrapper}>
                        <DefaultInput name={'duration_days'} value={data.duration_days} text={'Vigencia de la membresía:'} htmlFor={'days'} type={'number'} readOnly={true}/>
                    </span>
                    <span className={styles.inputWrapper}>
                        <DefaultInput name={'start_date'} value={data.start_date} text={'Fecha de inscripción:'} htmlFor={'start'} type={'date'} readOnly={true}/>
                    </span>
                    <span className={styles.inputWrapper}>
                        <DefaultInput name={'end_date'} value={data.end_date} text={'Fecha de expiración:'} htmlFor={'end'} type={'date'} readOnly={true}/>
                    </span>
                    <div className={styles.buttonsWrapper}>
                        <DefaultButton onClick={() => setModalFormStatus(false)} text={'Cancelar'}/>
                        <DefaultButton text={'Guardar'} onClick={() => {console.log(form)}}/>
                    </div>
                </div>
            </div>
        </>
    );
}