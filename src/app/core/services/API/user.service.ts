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
//SWEETALERT2
import Swal from 'sweetalert2';
//MODELOS
import { User } from '../../models/user.model';

@Injectable()
export class UserService {

   constructor(
      public http: HttpClient,
      public _sessionSrv: SessionService,
   ) {

   }

   createUser(user) {
      const { name, last_name, middle_name, document_no, email, phone_no, username, password } = user;
      return this.http.post(API.USER_CREATE, { name, last_name, middle_name, document_no, email, phone_no, username, password });
   }

   updateUser(user: User) {
      const { name, last_name, middle_name, document_no, email, phone_no, username } = user;
      const params = { name, last_name, middle_name, document_no, email, phone_no, username };

      return this.http.put(`${API.USER_UPDATE}${this._sessionSrv.userSubject.value.id_user}`, params)
         .pipe(
            map((response: any) => {
               this._sessionSrv.saveStorage(response.user);

               Swal({
                  title: 'Usuario Actualizado',
               })
               return true;
            }),
            catchError(err => {
               console.log("error en el service: ", err)
               Swal({
                  title: 'Error al actualizar',
               })

               return throwError(err);
            })
         );
   }


   getUsers() {
      return this.http.get(`${API.USER_ALL}`)
         .pipe(
            map((response: any) => {
               return response.users;
            })
         )
   }

}
