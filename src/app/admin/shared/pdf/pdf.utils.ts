export function yesNo(value: boolean): string {
    return value ? 'Sí' : 'No';
}

export function active(value: boolean): string {
    return value ? 'Activo' : 'Inactivo';
}

export function empty(value?: string | null): string {
    return value || 'Sin información.';
}

export function formatDate(value?: string): string {

    if (!value)
        return '—';

    const date = new Date(value.replace(' ', 'T'));

    return date.toLocaleString('es-PE');
}