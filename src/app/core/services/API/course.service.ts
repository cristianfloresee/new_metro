//ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//CONSTANTES
import { API } from '../../../config/constants';
//SERVICIOS
import { SessionService } from './session.service';


@Injectable()
export class CourseService {

   constructor(
      public http: HttpClient,

   ) {

   }

   createCourse(course) {
      const { id_calendar, id_user, id_subject, name, course_goal, student_goal } = course;
      return this.http.post(API.COURSE_CREATE, { id_calendar, id_user, id_subject, name, course_goal, student_goal })
   }

   getCoursesByTeacherId(id_user) {
      let params = `?last_by_teacher=${id_user}`;
      return this.http.get(`${API.COURSE_GET}${params}`);
   }

   getCoursesForSidemenu(id_user){
      let params = `?all_courses_by_teacher=${id_user}`;
      return this.http.get(`${API.COURSE_GET}${params}`)
   }

   getCourseById(id_user, id_course){
      let params = `?id_user=${id_user}&id_course=${id_course}`;
      return this.http.get(`${API.COURSE_GET}${params}`)
   }

   /*
   createCalendar(calendar) {
      const { year, semester } = calendar;
      return this.http.post(API.CALENDAR_CREATE, { year, semester });
   }

   getCalendars(from, limit, search?) {

      let params = `?from=${from}&limit=${limit}`;
      if (search) params += `&search=${search}`;

      return this.http.get(`${API.CALENDAR_ALL}${params}`)
         .pipe(map((response: any) => response))

   }




   updateCalendar(calendar, id_calendar) {

      const { year, semester } = calendar;

      return this.http.put(`${API.CALENDAR_UPDATE}${id_calendar}`, { year, semester })
         .pipe(
            map((response: any) => {
               console.log("RESPONSE: ", response);
               return true;
            }),
            catchError(err => {
               console.log("error en el service: ", err)
               return throwError(err);
            })
         );
   }

   deleteCalendar(id_calendar) {
      return this.http.delete(`${API.CALENDAR_DELETE}${id_calendar}`);
   }

   countCalendar() {
      return this.http.get(`${API.CALENDAR_COUNT}`);
   }*/

}
