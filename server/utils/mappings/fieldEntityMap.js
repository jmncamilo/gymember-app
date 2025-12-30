// This file maps database column names to their corresponding table names
const FIELD_ENTITY_MAP = {
    /* Customers */
    first_name: 'Customers',
    first_last_name: 'Customers',
    email: 'Customers',
    phone_number: 'Customers',
    profile_image_url: 'Customers',

    /* Customers_Details */
    gender: 'Customers_Details',
    birthdate: 'Customers_Details',
    age: 'Customers_Details',
    address: 'Customers_Details',
    city: 'Customers_Details',
    emergency_phone: 'Customers_Details',
    additional_info: 'Customers_Details',

    /* Customers_Memberships */
    membership_type: 'Customers_Memberships',
    status: 'Customers_Memberships',
    duration_days: 'Customers_Memberships',
    start_date: 'Customers_Memberships',
    end_date: 'Customers_Memberships'
};

module.exports = { FIELD_ENTITY_MAP };