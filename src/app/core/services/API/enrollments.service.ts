//ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//CONSTANTES
import { API } from '../../../config/constants';
//SERVICIOS
import { SessionService } from './session.service';


@Injectable()
export class EnrollmentService {

   constructor(
      public http: HttpClient,
   ) { }

   getEnrollmentsByCourseId(id_course) {
      return this.http.get(`${API.ENROLLMENTS}/courses/${id_course}`);
   }


   createEnrollment(id_course, id_user) {
      return this.http.post(API.ENROLLMENTS, { id_course, id_user });
   }

   changeStatusEnrollment(id_course, id_user, disabled) {
      return this.http.put(`${API.ENROLLMENTS}/${id_course}/${id_user}`, { disabled });
   }

   deleteEnrollment(id_course, id_user){
      return this.http.delete(`${API.ENROLLMENTS}/${id_course}/${id_user}`);
   }

}
