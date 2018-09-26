//ANGULAR
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
//SERVICIOS
import { SessionService } from '../API/session.service';

@Injectable()
export class AdminGuard implements CanLoad {

   constructor(
      public _sessionSrv: SessionService,
      public router: Router
   ) { }

   canLoad() {
      let roles = this._sessionSrv.userSubject.value.roles;
      if (roles && roles.length != 0) {
         if (roles.find(role => role.id_role == 1)) return true;
         switch (roles[0].id_role) {
            case 2:
               this.router.navigate(['/teacher']);
               return false;
            case 3:
               this.router.navigate(['/student']);
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
