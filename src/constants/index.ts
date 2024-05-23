export const APP_COLORS = {
    SALMON: '#FF6161',
    OCEAN: '#004D73',
    SKY: '#CFF6FF',
    METAL: '#557B97',

    // Palette
    HONEYDEW: '#D9E5D6',
    CERULEAN: '#6575A8',
    NUDE: '#F9F3DC',
    ATOMIC: '#efb3a2',
    SANDYBROWN: '#FF9B42',

    TEXT: '#393939',
}

export const provinciasArgentinas = [
    "Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego",
    "Tucumán"
]

export const paisesHispanohablantes = [
    "Argentina",
    "Bolivia",
    "Chile",
    "Colombia",
    "Costa Rica",
    "Cuba",
    "Ecuador",
    "El Salvador",
    "España",
    "Guatemala",
    "Honduras",
    "México",
    "Nicaragua",
    "Panamá",
    "Paraguay",
    "Perú",
    "República Dominicana",
    "Uruguay",
    "Venezuela",
    "Otro"
]

export const dateOptions: Intl.DateTimeFormatOptions = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
}

export const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
}

export const bookingHeaders = [
    {
        name: 'CREADO',
        value: 'createdAt'
    },
    {
        name: 'SERVICIO',
        value: 'serviceName'
    },
    {
        name: 'NOMBRE COMPLETO',
        value: 'fullname'
    },
    {
        name: 'CIUDAD',
        value: 'city'
    },
    {
        name: 'PRECIO UNITARIO',
        value: 'price'
    },
    {
        name: 'PRECIO TOTAL',
        value: 'totalPrice'
    },
    {
        name: 'PAGO CONFIRMADO',
        value: 'isPaid'
    },
]


export const serviceHeaders = [
    {
        name: 'CREADO',
        value: 'createdAt'
    },
    {
        name: 'NOMBRE',
        value: 'name'
    },
    {
        name: 'TITULO',
        value: 'title'
    },
    {
        name: 'PRECIO',
        value: 'price'
    },
    {
        name: 'DÁS',
        value: 'days'
    },
    {
        name: 'APERTURA',
        value: 'startTime'
    },
    {
        name: 'CIERRE',
        value: 'endTime'
    },
    {
        name: 'ES EVENTO',
        value: 'isEvent'
    },
]

export const eventHeaders = [
    {
        name: 'EVENTO',
        value: 'name'
    },
    {
        name: 'DÍA Y HORA',
        value: 'date'
    },
    {
        name: 'DURACIÓN (HS)',
        value: 'duration'
    },
    {
        name: 'PARTICIPANTES',
        value: 'participants'
    },
    {
        name: 'ES VIRTUAL',
        value: 'isVirtual'
    },
    {
        name: 'PRECIO (US $)',
        value: 'price'
    },
]

export const messageHeaders = [
    {
        name: 'FECHA',
        value: 'createdAt'
    },
    {
        name: 'MENSAJES',
        value: 'length'
    },
]

export const weekDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']