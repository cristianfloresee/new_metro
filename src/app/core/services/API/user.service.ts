//ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//CONSTANTES
import { API } from '../../../config/constants';
//SERVICIOS
import { SessionService } from './session.service';
// RxJS
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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
      console.log("create user service: ", user);
      const { name, last_name, middle_name, document, email, phone, username, password, roles } = user;
      return this.http.post(API.USER_CREATE, { name, last_name, middle_name, document, email, phone, username, password, roles });
   }

   updateUser(user, id_user?) {
      const { name, last_name, middle_name, document, email, phone, username, active, add_roles, delete_roles } = user;
      console.log("USER: ", user);
      id_user = id_user || this._sessionSrv.userSubject.value.id_user;
      console.log("ID USER: ", id_user)

      return this.http.put(`${API.USER_UPDATE}${id_user}`, { name, last_name, middle_name, document, email, phone, username, active, add_roles, delete_roles })
         .pipe(
            map((response: any) => {
               //this._sessionSrv.saveStorage(response.user);
               //GUARDAR EN EL STORAGE SOLO SI

               return true;
            }),
            catchError(err => {
               console.log("error en el service: ", err)
               return throwError(err);
            })
         );
   }


   getUsers(from, limit, role?, status?, search?) {

      let filter = '';
      if (role) filter += `&role=${role}`;
      if (status) filter += `&status=${status}`;
      if (search) filter += `&search=${search}`;

      return this.http.get(`${API.USER_ALL}?from=${from}&limit=${limit}${filter}`)
         .pipe(map((response: any) => response))
   }

   deleteUser(id_user) {
      return this.http.delete(`${API.USER_DELETE}${id_user}`);
   }

   countUser() {
      return this.http.get(`${API.USER_COUNT}`);
   }

   getUsersByCourse(id_course) {
      const params = { id_course };
      return this.http.get(API.USER_ALL, { params })
   }

   getUsersByDocumentId(document, id_course) {
      const params = { document, id_course };
      return this.http.get(`${API.USER_ALL}/students`, { params })
   }

}
