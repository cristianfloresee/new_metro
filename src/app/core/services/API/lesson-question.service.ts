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

   // Interface {id_user, id_subject, id_category, id_subcategory, difficulty, id_lesson, page_size, page}
   getLessonQuestions(params) {
      return this.http.get(API.LESSON_QUESTIONS, { params });
   }

   // Interface {id_lesson, id_question}
   getAllQuestionsForLesson(params) {
      return this.http.get(`${API.LESSON_QUESTIONS}/all`, { params });
   }

   // Actualiza el estado de la pregunta
   updateLessonQuestion(id_lesson, id_question, status) {
      return this.http.post(`${API.LESSON_QUESTIONS}/${id_lesson}/${id_question}`, { status })
   }

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
