//ENVIRONMENTS
export const API_URL_DEV = '//localhost:3000/';
export const API_URL_PROD = 'http://...';
export const API_URL = API_URL_DEV;

//ENDPOINTS
export const API = {
   //SESIÓN
   LOGIN: `${API_URL}login`,
   LOGOUT: ``,
   //USUARIO
   USER_ALL: `${API_URL}users`,
   USER_GET: `${API_URL}/`,
   USER_CREATE: `${API_URL}users/create`,
   USER_UPDATE: `${API_URL}users/update/`,
   USER_DELETE: `${API_URL}users/delete/`,
   USER_COUNT: `${API_URL}users/count`,
   //CALENDARIO
   CALENDAR_ALL: `${API_URL}calendars`,
   CALENDAR_CREATE: `${API_URL}calendars/create`,
   CALENDAR_UPDATE: `${API_URL}calendars/update/`,
   CALENDAR_DELETE: `${API_URL}calendars/delete/`,
   CALENDAR_COUNT: `${API_URL}calendars/count`,
   //CURSOS
   COURSE_BY_TEACHERID: `${API_URL}`,
   COURSE_CREATE: `${API_URL}courses/create`,
   //ASIGNATURAS
   SUBJECT_ALL: `${API_URL}subjects`,
   SUBJECT_CREATE: `${API_URL}subjects/create`,
   SUBJECT_UPDATE: `${API_URL}subjects/update/`,
   SUBJECT_DELETE: `${API_URL}subjects/delete/`,
   SUBJECT_COUNT: `${API_URL}subjects/count`,
   //OTROS
   UPLOAD_IMAGE: `${API_URL}image/`
};

//ROLES
export const ROLES = [
   { id_role: 1, name: 'Administrador', url: 'admin' },
   { id_role: 2, name: 'Profesor', url: 'teacher' },
   { id_role: 3, name: 'Estudiante', url: 'student' },
];

//RECURSOS
export const IMAGE_SERVER = '';

//ERRORES DE FORMULARIO
export const ERROR_FORMS = {
   TOKEN_INVALID: 'El token de sesión es inválido.',
   SERVER_ERROR: 'Tenemos algunos problemas con nuestros servidores en este momento.'
}

export const PAGE_TITLES = {
   '/': { title: 'Inicio' },
   'admin': { title: 'Inicio' },
   'teacher': { title: 'Inicio' },
   'student': { title: 'Inicio' },
   'profile': { title: 'Perfil de Usuario' },
   'admin.(user)': { title: 'Usuarios' },
   'admin.(subject)': { title: 'Asignaturas' },
   'admin.(calendar)': { title: 'Calendario' }
}

//MENSAJES TOAST
export const TOAST_MESSAGES = {
  /* CALENDAR: {

         TITLE: `${noun} ${action}!`,
         BODY: `${subject} ha sido ${action} correctamente.`

         ERROR: 'Ha ocurrido un error!',
         BODY: 'El período no ha sido actualizado.',
         BODY: 'El período ya existe.'

   }*/

}

//PAGINACIÓN
export const REGISTERS_PER_PAGE = 5;
