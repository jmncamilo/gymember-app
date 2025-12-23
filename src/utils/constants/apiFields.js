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
    ]
};