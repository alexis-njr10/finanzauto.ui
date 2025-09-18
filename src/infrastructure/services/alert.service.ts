import { Toast } from 'toastify-react-native'

type AlertData = {
    type: 'success' | 'error' | 'info' | 'warn';
    defaultTitle: string;
};

export const httpAlert = (message: string, code: number) => {
    const getStatusDetails = (code: number) => httpStatusDetails[code] || null;
    const data = getStatusDetails(code);
    Toast.show({
        type: 'default',
        text1:  data.title ?? 'Alerta',
        text2: message ?? 'Se genero una alerta',
        position: 'center',
        useModal: true,
        autoHide: false,
        props: {
            type: data.type ?? 'info',
            buttonText: 'Aceptar'
        }
    });
};

export const showAlert = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success', title: string = '') => {
    const data = getAlertData(type)
    Toast.show({
        type: 'default',
        text1:  title ? title : data.defaultTitle ?? 'Alerta',
        text2: message ?? 'Se genero una alerta',
        position: 'center',
        useModal: true,
        autoHide: false,
        props: {
            type: data.type ?? 'info',
            buttonText: 'Aceptar'
        }
    });
};

export const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success', title: string = '') => {
    const data = getAlertData(type)
    Toast.show({
        type: data.type ?? 'info',
        text1: title ? title : data.defaultTitle ?? 'Notificacion',
        text2: message ?? 'Se genero una notificacion',
        position: 'top',
        visibilityTime: 5000,
        autoHide: true,
        iconSize: 24,
        theme: 'light',
    });
};

export const httpToast = (message: string, code: number) => {
    const getStatusDetails = (code: number) => httpStatusDetails[code] || null;
    const data = getStatusDetails(code);
    Toast.show({
        type: data.type ?? 'info',
        text1: data.title ?? 'Notificacion',
        text2: message ?? 'Se genero una notificacion',
        position: 'top',
        visibilityTime: 5000,
        autoHide: true,
        backgroundColor: '#333',
        textColor: '#fff',
        iconColor: '#4CAF50',
        iconSize: 24,
        progressBarColor: '#4CAF50',
        theme: 'light',
    });
};

const getAlertData = (inputType?: string): AlertData => {
    const normalized = (inputType || "").toLocaleLowerCase();

    switch (normalized) {
        case 'success':
            return { type: 'success', defaultTitle: "Éxito" };
        case 'error':
            return { type: 'error', defaultTitle: "Error" };
        case 'warning':
            return { type: 'warn', defaultTitle: "Advertencia" };
        case 'info':
            return { type: 'info', defaultTitle: "Información" };
        default:
            return { type: 'info', defaultTitle: "Información" };
    }
}

const httpStatusDetails: Record<
    number,
    { type: 'success' | 'error' | 'info' | 'warn'; title: string }
> = {
    // ✅ 1xx - Respuestas Informativas
    100: { type: 'info', title: "Continuar" }, // Continue
    101: { type: 'info', title: "Cambiando Protocolos" }, // Switching Protocols
    102: { type: 'info', title: "Procesando" }, // Processing
    103: { type: 'info', title: "Pistas Tempranas" }, // Early Hints

    // ✅ 2xx - Respuestas Exitosas
    200: { type: 'success', title: "OK" }, // OK
    201: { type: 'success', title: "Creado" }, // Created
    202: { type: 'success', title: "Aceptado" }, // Accepted
    203: { type: 'success', title: "Información No Autorizada" }, // Non-Authoritative Information
    204: { type: 'success', title: "Sin Contenido" }, // No Content
    205: { type: 'success', title: "Restablecer Contenido" }, // Reset Content
    206: { type: 'success', title: "Contenido Parcial" }, // Partial Content
    207: { type: 'success', title: "Multi-Estado" }, // Multi-Status
    208: { type: 'success', title: "Ya Reportado" }, // Already Reported
    226: { type: 'success', title: "IM Usado" }, // IM Used

    // ⚠️ 3xx - Redirecciones (Advertencias)
    300: { type: 'warn', title: "Múltiples Opciones" }, // Multiple Choices
    301: { type: 'warn', title: "Movido Permanentemente" }, // Moved Permanently
    302: { type: 'warn', title: "Encontrado" }, // Found
    303: { type: 'warn', title: "Ver Otros" }, // See Other
    304: { type: 'warn', title: "No Modificado" }, // Not Modified
    305: { type: 'warn', title: "Usar Proxy (Obsoleto)" }, // Use Proxy (Deprecated)
    306: { type: 'warn', title: "Cambio de Proxy (No utilizado)" }, // Switch Proxy (Unused)
    307: { type: 'warn', title: "Redirección Temporal" }, // Temporary Redirect
    308: { type: 'warn', title: "Redirección Permanente" }, // Permanent Redirect

    // ❌ 4xx - Errores del Cliente
    400: { type: 'error', title: "Solicitud Incorrecta" }, // Bad Request
    401: { type: 'error', title: "No Autorizado" }, // Unauthorized
    402: { type: 'error', title: "Pago Requerido" }, // Payment Required
    403: { type: 'error', title: "Prohibido" }, // Forbidden
    404: { type: 'error', title: "No Encontrado" }, // Not Found
    405: { type: 'error', title: "Método No Permitido" }, // Method Not Allowed
    406: { type: 'error', title: "No Aceptable" }, // Not Acceptable
    407: { type: 'error', title: "Autenticación de Proxy Requerida" }, // Proxy Authentication Required
    408: { type: 'error', title: "Tiempo de Espera Agotado" }, // Request Timeout
    409: { type: 'error', title: "Conflicto" }, // Conflict
    410: { type: 'error', title: "Eliminado" }, // Gone
    411: { type: 'error', title: "Longitud Requerida" }, // Length Required
    412: { type: 'error', title: "Condición Previa Fallida" }, // Precondition Failed
    413: { type: 'error', title: "Carga Útil Demasiado Grande" }, // Payload Too Large
    414: { type: 'error', title: "URI Demasiado Larga" }, // URI Too Long
    415: { type: 'error', title: "Tipo de Medio No Soportado" }, // Unsupported Media Type
    416: { type: 'error', title: "Rango No Satisfactorio" }, // Range Not Satisfiable
    417: { type: 'error', title: "Expectativa Fallida" }, // Expectation Failed
    418: { type: 'error', title: "Soy una Tetera ☕" }, // I'm a teapot
    419: { type: 'error', title: "Sesión Expirada" }, // Authentication Timeout (Laravel)
    421: { type: 'error', title: "Solicitud Mal Dirigida" }, // Misdirected Request
    422: { type: 'error', title: "Entidad No Procesable" }, // Unprocessable Entity
    423: { type: 'error', title: "Bloqueado" }, // Locked
    424: { type: 'error', title: "Dependencia Fallida" }, // Failed Dependency
    425: { type: 'warn', title: "Demasiado Temprano" }, // Too Early
    426: { type: 'error', title: "Actualización Requerida" }, // Upgrade Required
    428: { type: 'error', title: "Precondición Requerida" }, // Precondition Required
    429: { type: 'error', title: "Demasiadas Solicitudes" }, // Too Many Requests
    431: { type: 'error', title: "Encabezados de Solicitud Demasiado Largos" }, // Request Header Fields Too Large
    451: { type: 'error', title: "No Disponible por Razones Legales" }, // Unavailable For Legal Reasons

    // 🔥 5xx - Errores del Servidor
    500: { type: 'error', title: "Error Interno del Servidor" }, // Internal Server Error
    501: { type: 'error', title: "No Implementado" }, // Not Implemented
    502: { type: 'error', title: "Puerta de Enlace Incorrecta" }, // Bad Gateway
    503: { type: 'error', title: "Servicio No Disponible" }, // Service Unavailable
    504: { type: 'error', title: "Tiempo de Espera de la Puerta de Enlace Agotado" }, // Gateway Timeout
    505: { type: 'error', title: "Versión HTTP No Soportada" }, // HTTP Version Not Supported
    506: { type: 'error', title: "Variante También Negocia" }, // Variant Also Negotiates
    507: { type: 'error', title: "Almacenamiento Insuficiente" }, // Insufficient Storage
    508: { type: 'error', title: "Bucle Detectado" }, // Loop Detected
    510: { type: 'error', title: "No Ampliado" }, // Not Extended
    511: { type: 'error', title: "Autenticación de Red Requerida" }, // Network Authentication Required
};