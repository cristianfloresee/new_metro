// Environments
export const API_URL_DEV = '//localhost:3000/';
export const API_URL_PROD = 'http://...';
export const API_URL = API_URL_DEV;

// Endpoints
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
   // User-Course (Enrollment)
   ENROLLMENTS: `${API_URL}enrollments`,
   ACTIVITIES: `${API_URL}activities`,

   //CALENDARIO
   CALENDAR_ALL: `${API_URL}calendars`,
   CALENDAR_CREATE: `${API_URL}calendars/create`,
   CALENDAR_UPDATE: `${API_URL}calendars/update/`,
   CALENDAR_DELETE: `${API_URL}calendars/delete/`,
   CALENDAR_COUNT: `${API_URL}calendars/count`,
   //CURSOS
   COURSE_GET: `${API_URL}courses`,
   COURSE_CREATE: `${API_URL}courses/create`,
   COURSE_UPDATE: `${API_URL}courses/update/`,
   COURSE_DELETE: `${API_URL}courses/delete/`,
   //ASIGNATURAS
   SUBJECTS: `${API_URL}subjects`,
   SUBJECTS_AS_SELECT_OPTION: `${API_URL}subjects/select_options`,
   SUBJECT_COUNT: `${API_URL}subjects/count`,
   //CATEGORIAS
   CATEGORIES: `${API_URL}categories`,
   CATEGORIES_AS_SELECT_OPTION: `${API_URL}categories/select_options`,
   CATEGORY_COUNT: `${API_URL}categories/count`, //elimninar
   //SUBCATEGORÍAS
   SUBCATEGORIES: `${API_URL}subcategories`,
   SUBCATEGORIES_AS_SELECT_OPTION: `${API_URL}subcategories/select_options`,
   SUBCATEGORY_COUNT: `${API_URL}subcategories/count`,
   //PREGUNTAS
   QUESTIONS: `${API_URL}questions`,
   //MODULOS
   MODULE_GET: `${API_URL}modules`,
   MODULE_CREATE: `${API_URL}modules/create`,
   MODULE_UPDATE: `${API_URL}modules/update/`,
   MODULE_DELETE: `${API_URL}modules/delete/`,
   //OTROS
   UPLOAD_IMAGE: `${API_URL}image/`,
   WORKSPACES: `${API_URL}workspaces`,
};

// User roles
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
};

// Pagination
export const DEFAULT_PAGE_SIZE = 5;
export const PAGE_SIZES = [20, 50, 100];

// Difficulties
export const DIFFICULTIES = [
   { difficulty: 1, name: 'Fácil' },
   { difficulty: 2, name: 'Media' },
   { difficulty: 3, name: 'Díficil' }
];

// Image Extensions
export const IMAGE_EXTS = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];

