// This file contains arrays with the required column names for API endpoints
export const API_FIELDS = {
    // POST /customers/renew/transaction
    RENEW_TRANSACTION: [
        'membership_type',
        'duration_days',
        'start_date',
        'end_date',
        'customer_id_fk',
        'transaction_category',
        'transaction_type',
        'amount',
        'payment_method',
        'description'
    ],
    // POST /customers/transaction
    FIRST_TRANSACTION: [
        'customer_id_fk',
        'transaction_category',
        'transaction_type',
        'amount',
        'payment_method',
        'description'
    ],
    // PATCH /customers/:id
    UPDATE_CUSTOMER_INFORMATION: [
        'nuip',
        'first_name',
        'first_last_name',
        'email',
        'phone_number',
        'profile_image_url',
        'gender',
        'birthdate',
        'age',
        'address',
        'city',
        'emergency_phone',
        'additional_info',
        'membership_type',
        'status',
        'duration_days',
        'start_date',
        'end_date'
    ]
};