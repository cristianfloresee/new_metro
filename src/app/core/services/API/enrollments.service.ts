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
      const params = { id_course };
      return this.http.get(API.ENROLLMENTS, { params });
   }


   createEnrollment(id_course, id_user) {
      return this.http.post(API.ENROLLMENTS, { id_course, id_user });
   }

}
