//ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//CONSTANTES
import { API } from '../../../config/constants';
//SERVICIOS
import { SessionService } from './session.service';
import { map, catchError } from 'rxjs/operators';
// //RXJS
// import { Observable, throwError } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
// //SWEETALERT2
// import Swal from 'sweetalert2';
// //MODELOS
// import { User } from '../../models/user.model';

@Injectable()
export class SubjectService {

   constructor(
      public http: HttpClient,
      public _sessionSrv: SessionService,
   ) {

   }

   getSubjects(from?, limit?, search?) {

      let params = '';
      if (from != undefined && limit) {
         params = `?from=${from}&limit=${limit}`;
         if (search) params += `&search=${search}`;
      }


      return this.http.get(`${API.SUBJECT_ALL}${params}`)
         .pipe(
            map((response: any) => {
               return response.subjects;
            })
         )
   }

   createSubject(subject) {
      const { name } = subject;
      return this.http.post(API.SUBJECT_CREATE, { name });
   }

   updateSubject(subject, id_subject) {
      const { name } = subject;
      return this.http.put(`${API.SUBJECT_UPDATE}${id_subject}`, { name });
   }

   deleteSubject(id_subject) {
      return this.http.delete(`${API.SUBJECT_DELETE}${id_subject}`);
   }

   countSubject() {
      return this.http.get(`${API.SUBJECT_COUNT}`);
   }
}
