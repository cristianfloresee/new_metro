//ANGULAR
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
//SERVICIOS
import { SessionService } from '../API/session.service';
//OBJECT-PATH
import * as objectPath from 'object-path';

@Injectable()
export class StudentGuard implements CanLoad {

   constructor(
      public _sessionSrv: SessionService,
      public router: Router
   ) { }

   canLoad() {

      let roles = objectPath.get(this._sessionSrv.userSubject.value, 'roles');
      if (roles && roles.length != 0) {
         if (roles.find(role => role.id_role == 3)) return true;
         switch (roles[0].id_role) {
            case 1:
               this.router.navigate(['/admin']);
               return false;
            case 2:
               this.router.navigate(['/teacher']);
               return false;

            default:
               this.router.navigate(['/login']);
               return false;
         }
      }
      this.router.navigate(['/login']);
      return false;
   }

}
