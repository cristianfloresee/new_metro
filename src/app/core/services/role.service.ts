//ANGULAR
import { Injectable, } from '@angular/core';
import { Router } from '@angular/router';
//RXJS
import { BehaviorSubject, Observable } from 'rxjs';
//CONSTANTES
import { ROLES } from '../../config/constants';
//OBJECT-PATH
import * as objectPath from 'object-path';
import { SocketService } from './socket.service';
//import { SidemenuService } from './sidemenu.service';
//SERVICIOS


@Injectable()
export class RoleService {

   // Roles disponibles
   rolesAvailableSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
   rolesAvailable$: Observable<any> = this.rolesAvailableSubject.asObservable();

   // Rol actual
   roleSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null); //ROL DEBE SER { }
   role$: Observable<any> = this.roleSubject.asObservable();

   last_url_role;

   constructor(
      //private _sidemenuSrv: SidemenuService
      private _socketSrv: SocketService
   ) {
      let roles = (objectPath.get(JSON.parse(localStorage.getItem('user')), 'roles')); //1,2,3
      if (roles) this.changeAvailableRoles(roles);
   }

   // Recibe un objeto role: {role, index, name, url}
   changeRole(role) {

      console.log("NUEVO ROL: ", role);
      this.roleSubject.next(role);
      // Emite evento que actualiza el role en la lista de usuarios del servidor (redis)
      this._socketSrv.emit('updateRoleToUserConnected', {role: role.role})
   }

   // Recibe un array de roles [1,2,3]
   changeAvailableRoles(roles) {
      let _roles = roles.map(role => ROLES.find(row => role == row.role));
      this.rolesAvailableSubject.next(_roles);
      this.changeRole(_roles[0]);
   }

   checkUrlRole(url) {

      // Obtiene la raíz de la url (el rol).
      // + Ejemplo: http://localhost:4200/admin/subject/1 => admin
      const url_role = url.match(/\/[0-9a-z-A-Z-_]*/)[0].slice(1);
      console.log(`last url: ${this.last_url_role}, url: ${url_role}`)
      // Si la url base es distinta,
      if (url_role != this.last_url_role) {
         // Almaceno la nueva url_role
         this.last_url_role = url_role;

         // Obtiene los roles disponibles
         let roles = this.rolesAvailableSubject.value;
         console.log("checkRole roles: ", roles);

         if (roles) {
            console.log("ENTRO if(roles)");
            // Busca el rol dentro del array de roles disponibles (admin, teacher, student)
            let index_role = roles.findIndex(role => role.url == url_role);
            console.log("INDEX ROLE: ", index_role);
            if (index_role >= 0) {

               // Necito asignarle el index al que pertence dentro del array
               let role = roles[index_role];
               role.index = index_role;
               //console.log("active role: ", role);
               console.log("ROLES: ", roles);
               this.changeRole(role);
            }
         }
      }
      else{
         // Emitir evento para eliminar al usuario de la lista de usuarios conectados
         console.log("ELIMINAR USUARIO SOCKET...");
      }


   }

   cleanRoles() {
      this.rolesAvailableSubject.next(null);
      this.roleSubject.next(null);
   }

}
