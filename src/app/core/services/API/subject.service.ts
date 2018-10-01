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


   getSubjects() {
      return this.http.get(`${API.SUBJECT_ALL}`)
         .pipe(
            map((response: any) => {
               return response.subjects;
            })
         )
   }

}
