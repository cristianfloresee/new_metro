//ANGULAR
import { Injectable, } from '@angular/core';
import { Router } from '@angular/router';
//RXJS
import { BehaviorSubject, Observable } from 'rxjs';
//CONSTANTES
import { ROLES } from '../../config/constants';
//OBJECT-PATH
import * as objectPath from 'object-path';

@Injectable()
export class RoleService {

   //ROLES DISPONIBLES
   rolesAvailableSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
   rolesAvailable$: Observable<any> = this.rolesAvailableSubject.asObservable();

   //ROL ACTUAL
   roleSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null); //ROL DEBE SER { }
   role$: Observable<any> = this.roleSubject.asObservable();

   constructor() {
      let roles = (objectPath.get(JSON.parse(localStorage.getItem('user')), 'roles')); //1,2,3
      if (roles) this.changeAvailableRoles(roles);
   }

   //RECIBE UN OBJETO ROL: {id_role, index, name, url}
   changeRole(role) {
      this.roleSubject.next(role);
   }

   //RECIBE UN ARRAY DE ROLES [1,2,3]
   changeAvailableRoles(roles) {
      let _roles = roles.map(id_role => ROLES.find(row => id_role == row.id_role));
      this.rolesAvailableSubject.next(_roles);
      this.changeRole(_roles[0])
   }

   checkUrlRole(url) {

      console.log("XXXXcheckUrlRole: ", url);
      url = url.match(/\/[0-9a-z-A-Z-_]*/)[0].slice(1); //obtiene la raíz de la url. Ejemplo: http://localhost:4200/admin/(subject) => admin

      let roles = this.rolesAvailableSubject.value;
      if (roles) {
         let index_role = roles.findIndex(role => role.url == url); //admin, teacher, student
         if (index_role >= 0) {
            let role = roles[index_role];
            role.index = index_role;
            console.log("active role: ", role);
            this.changeRole(role)
         }
      }
   }

   cleanRoles() {
      this.rolesAvailableSubject.next(null);
      this.roleSubject.next(null);
   }

}
