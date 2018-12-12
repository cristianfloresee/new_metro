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
   ) { }

   createCourse(course) {
      const { id_calendar, id_user, id_subject, name, course_goal, student_goal } = course;
      return this.http.post(API.COURSE_CREATE, { id_calendar, id_user, id_subject, name, course_goal, student_goal })
   }

   updateCourse(id_course, course) {
      return this.http.put(`${API.COURSE_UPDATE}${id_course}`, course);
   }

   getCoursesByTeacherId(id_user) {
      let params = `?last_by_teacher=${id_user}`;
      return this.http.get(`${API.COURSE_GET}${params}`);
   }

   /*
   getCoursesForSidemenu(id_user) {
      let params = `?all_courses_by_teacher=${id_user}`;
      return this.http.get(`${API.COURSE_GET}${params}`)
   }*/

   getCoursesForSidemenu(id_user) {
      let params = { all_courses_by_teacher: id_user };
      return this.http.get(API.COURSE_GET, { params })
   }

   getCourseById(id_user, id_course) {
      let params = `?id_user=${id_user}&id_course=${id_course}`;
      return this.http.get(`${API.COURSE_GET}${params}`)
   }

   deleteCourse(id_course) {
      return this.http.delete(`${API.COURSE_DELETE}${id_course}`);
   }

}
