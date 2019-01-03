// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Constants
import { API } from '../../../config/constants';
import { SocketService } from '../socket.service';

@Injectable()
export class LessonQuestionService {

   constructor(
      public http: HttpClient,
      private socketSrv: SocketService
   ) { }

   // Obtiene las preguntas de la clase.
   // Interface {id_lesson, id_category, id_subcategory, difficulty, page_size, page}
   getLessonQuestions(params) {
      return this.http.get(API.LESSON_QUESTIONS, { params });
   }

   // Obtiene las preguntas de la biblioteca de la asignatura.
   // Interface {id_user, id_subject, id_category, id_subcategory, difficulty, id_lesson, page_size, page}
   getAllQuestionsForLesson(params) {
      return this.http.get(`${API.LESSON_QUESTIONS}/all`, { params });
   }

   getAllQuestionsByCourse(id_course, params) {
      return this.http.get(`${API.LESSON_QUESTIONS}/course/${id_course}`, { params });
   }

   // Actualiza el estado de una pregunta
   updateLessonQuestion(id_lesson, id_question, status) {
      return this.http.post(`${API.LESSON_QUESTIONS}/${id_lesson}/${id_question}`, { status })
   }

   // Agrega o elimina múltiples preguntas a la clase
   updateLessonQuestions(id_lesson, add_questions, delete_questions) {
      return this.http.post(API.LESSON_QUESTIONS, { id_lesson, add_questions, delete_questions });
   }

   deleteLessonQuestion(id_class, id_question) {
      return this.http.delete(`${API.LESSON_QUESTIONS}/${id_class}/${id_question}`);
   }

   /*
   // Elimina una pregunta (eliminaría todas las participaciones de esa actividad)
   deleteQuestion(id_question) {
      return this.http.delete(`${API.QUESTIONS}/${id_question}`);
   }*/

}
