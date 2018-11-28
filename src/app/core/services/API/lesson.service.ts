//ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//CONSTANTES
import { API, API_URL } from '../../../config/constants';
//SERVICIOS
import { SessionService } from './session.service';
//RXJS
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class LessonService {

   constructor(
      public http: HttpClient
   ) { }

   createLesson(id_module, description, date) {
      return this.http.post(`${API_URL}lessons`, { id_module, description, date })
   }

   // + { id_course }
   getLessonsOptions(params){
      console.log("get lesson options");
      return this.http.get(`${API_URL}lessons/select_options`, { params });
   }

   getLessons(params) {
      // + Necesito una interface:
      // + { id_module, id_course, status, page, page_size }
      return this.http.get(`${API_URL}lessons`, { params });
   }

   updateLesson(id_lesson, id_module, description, date, status) {
      return this.http.put(`${API_URL}lessons/${id_lesson}`, { id_module, description, date, status });
   }

   // Elimina una Clase
   deleteLesson(id_lesson) {
      return this.http.delete(`${API_URL}lessons/${id_lesson}`);
   }
}
