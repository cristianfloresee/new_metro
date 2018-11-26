//ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//CONSTANTES
import { API } from '../../../config/constants';

@Injectable()
export class ActivityService {

   constructor(
      public http: HttpClient,
   ) { }


   // Necesito una interface:
   // { status: mode: page: page_size: }

   getActivitiesByCourseId(id_course) {
      let params = { id_course };
      return this.http.get(API.ACTIVITIES, { params });
   }

   getActivities( params){
      return this.http.get(API.ACTIVITIES, { params });
   }

   getUsers(from, limit, role?, status?, search?) {

      let filter = '';
      if (role) filter += `&role=${role}`;
      if (status) filter += `&status=${status}`;
      if (search) filter += `&search=${search}`;
   }

   // Crea una nueva Actividad
   createActivity(id_lesson, name, mode) {
      return this.http.post(API.ACTIVITIES, { id_lesson, name, mode });
   }

   // Actualiza una Actividad
   updateActivity(id_activity, id_lesson, name, status, mode) {
      return this.http.put(`${API.ACTIVITIES}/${id_activity}`, { id_lesson, name, status, mode });
   }


  /*

   deleteEnrollment(id_course, id_user){
      return this.http.delete(`${API.ENROLLMENTS}/${id_course}/${id_user}`);
   }*/

}
