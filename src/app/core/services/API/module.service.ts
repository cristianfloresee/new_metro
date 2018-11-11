//ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//CONSTANTES
import { API } from '../../../config/constants';
//SERVICIOS
import { SessionService } from './session.service';
//RXJS
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
//import * as _ from 'lodash';

@Injectable()
export class ModuleService {

   constructor(
      private http: HttpClient
   ) { }

   getModulesByCourseId(id_course) {
      let params = { id_course };
      return this.http.get(API.MODULE_GET, { params });
   }

   createModule(name, id_course) {
      return this.http.post(API.MODULE_CREATE, { name, id_course });
   }

   deleteModule(id_module) {
      return this.http.delete(`${API.MODULE_DELETE}${id_module}`);
   }

   // updateCalendar(calendar, id_calendar) {

   //    const { year, semester } = calendar;

   //    return this.http.put(`${API.CALENDAR_UPDATE}${id_calendar}`, { year, semester })
   //       .pipe(
   //          map((response: any) => {
   //             console.log("RESPONSE: ", response);
   //             return true;
   //          }),
   //          catchError(err => {
   //             console.log("error en el service: ", err)
   //             return throwError(err);
   //          })
   //       );
   // }

   // deleteCalendar(id_calendar) {
   //    return this.http.delete(`${API.CALENDAR_DELETE}${id_calendar}`);
   // }

   // countCalendar() {
   //    return this.http.get(`${API.CALENDAR_COUNT}`);
   // }

}
