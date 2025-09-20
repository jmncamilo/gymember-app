const membershipTypes = {
    'Diario': 'Pase diario',
    'Semanal': 'Pase semanal',
    'Quincenal': 'Plan quincenal',
    'Mensual': 'Mensualidad',
    'Trimestral': 'Plan trimestral',
    'Semestral': 'Plan semestral',
    'Anual': 'Plan anual',
    'Promocional': 'Promoción',
    'Otro': 'Otro'
};

export function membershipTypeFormatter(value) {
    return membershipTypes[value] || value;
}