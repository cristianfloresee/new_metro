//ANGULAR
import { Injectable, } from '@angular/core';
import { Router } from '@angular/router';
//RXJS
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { ROLE_URL } from '../../config/constants';



@Injectable()
export class RoleService {

   //current_role: any = new Subject<string>();
   //public current_role: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

   //ROLES DISPONIBLES
   rolesAvailableSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
   roles_available$: Observable<any> = this.rolesAvailableSubject.asObservable();

   //ROL ACTUAL
   roleSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
   role$: Observable<any> = this.roleSubject.asObservable();


   constructor() {
      this.changeAvailableRoles(JSON.parse(localStorage.getItem('user')).roles);
   }

   //RECIBE EL ID_ROLE (1,2,3)
   changeRole(role) {
      this.roleSubject.next(role);
   }

   //RECIBE UN ARRAY DE ROLES
   changeAvailableRoles(roles) {
      this.rolesAvailableSubject.next(roles);
   }


}
