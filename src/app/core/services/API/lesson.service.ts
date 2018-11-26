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

   /*
   getCategories(from?, limit?, search?){
      let params = '';

      if (from != undefined && limit) {
         params = `?from=${from}&limit=${limit}`;
         if (search) params += `&search=${search}`;
      }

      return this.http.get(`${API.CATEGORY_GET}${params}`)
   }*/

   // (Eliminar si no se usa)
   getLessonsByCourseId(id_course) {
      let params = { id_course };
      return this.http.get(`${API_URL}lessons`, { params })
   }

   getLessonsByModuleId(id_module) {
      let params = { id_module };
      return this.http.get(`${API_URL}lessons`, { params })
   }

   updateLesson(id_lesson, id_module, description, date, status) {
      return this.http.put(`${API_URL}lessons/${id_lesson}`, { id_module, description, date, status });
   }



   /*
      getCategoriesByUserIdAndSubjectId(id_user,id_subject){
         let params = `?id_user=${id_user}&id_subject=${id_subject}`;
         return this.http.get(`${API.CATEGORY_GET}${params}`);
      }



      getLastCategoriesByTeacherId(id_user){
         let params = `?last_by_teacher=${id_user}`;
         return this.http.get(`${API.CATEGORY_GET}${params}`)
      }
   */
}
