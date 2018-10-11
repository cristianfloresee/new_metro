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


@Injectable()
export class CalendarService {

   constructor(
      public http: HttpClient
   ) {

   }

   getCalendars(from, limit, search?) {
      let params = `?from=${from}&limit=${limit}`;
      if (search) params += `&search=${search}`;

      return this.http.get(`${API.CALENDAR_ALL}${params}`)
         .pipe(map((response: any) => response))

   }

   deleteCalendar(id_calendar) {
      return this.http.delete(`${API.CALENDAR_DELETE}${id_calendar}`);
   }

}
