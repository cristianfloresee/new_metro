//ENDPOINTS
export const API_URL_DEV = '//localhost:3000/';
export const API_URL_PROD = 'http://...';
export const API_URL = API_URL_DEV;

//RUTAS
export const API = {
   LOGIN: `${API_URL}login`,
   LOGOUT: ``,
   USER_ALL: `${API_URL}`,
   USER_GET: `${API_URL}/`,
   USER_CREATE: `${API_URL}users/create`,
   USER_UPDATE: `${API_URL}users/update/`,
   USER_DELETE: `${API_URL}users/delete/`,

   UPLOAD_IMAGE: `${API_URL}image/`
};

//ROLES
export const ROLE_URL = [
   { id_role: 1, name: 'Administrador', url: 'admin' },
   { id_role: 2, name: 'Profesor', url: 'teacher' },
   { id_role: 3, name: 'Estudiante', url: 'student' },
]


export const ROLES = {
   1: { name: 'Administrador', url: 'admin' },
   2: { name: 'Profesor', url: 'teacher' },
   3: { name: 'Estudiante', url: 'student' },
};

export const ROLEW = [
   { id_role: 1, name: 'Administrador', url: 'admin' },
   { id_role: 2, name: 'Profesor', url: 'teacher' },
   { id_role: 3, name: 'Estudiante', url: 'student' },
];

//RUTAS SIN INTERCEPTOR (BORRAR?)
export const SKIP_INTERCEPTOR = [
   API.LOGIN
]

//RECURSOS
export const IMAGE_SERVER = '';

//ERRORES DE FORMULARIO
const ERROR_FORMS = {
   TOKEN_INVALID: 'El token de sesión es inválido.',
   SERVER_ERROR: 'Tenemos algunos problemas con nuestros servidores en este momento.'
}

export const PAGE_TITLES = {
   '/': {
      title: 'Inicio'
   },
   'profile': {
      title: 'Perfil de Usuario'
   }
}

