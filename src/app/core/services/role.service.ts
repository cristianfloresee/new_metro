//ANGULAR
import { Injectable, } from '@angular/core';
import { Router } from '@angular/router';
//RXJS
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { ROLE_URL, ROLEW } from '../../config/constants';
import * as objectPath from 'object-path';



@Injectable()
export class RoleService {

   //current_role: any = new Subject<string>();
   //public current_role: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

   //ROLES DISPONIBLES
   rolesAvailableSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
   roles_available$: Observable<any> = this.rolesAvailableSubject.asObservable();

   //ROL ACTUAL
   roleSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
   role$: Observable<number> = this.roleSubject.asObservable(); //INDEX ROL: 0,1,2


   constructor() {
      let roles = (objectPath.get(JSON.parse(localStorage.getItem('user')), 'roles')); //1,2,3
      if (roles) this.changeAvailableRoles(roles);
   }

   //RECIBE EL ID_ROLE 1, 2 o 3
   changeRole(role) {
      this.roleSubject.next(role);
   }

   //RECIBE UN ARRAY DE ROLES [1,2,3]
   changeAvailableRoles(roles) {
      let _roles = roles.map(id_role => ROLEW.find(row => id_role == row.id_role));
      this.rolesAvailableSubject.next(_roles);
   }

   checkUrlRole(url) {
      console.log("chackUrlRole: ", url);
      let roles = this.rolesAvailableSubject.value;
      console.log("checkUrlRole - roles: ", roles);
      if (roles) {
         let index_role = roles.findIndex(role => role.url == url); //'admin', 'teacher', 'student'
         console.log("checkUrlRole - roles - index_role: ", index_role);
         if (index_role >= 0) {
            console.log(`index role ${index_role} is active...`);
            this.changeRole(index_role) //pasarle el index
         }
      }

   }

   cleanRoles(){
      this.rolesAvailableSubject.next(null);
      this.rolesAvailableSubject.next(null);
   }

}
