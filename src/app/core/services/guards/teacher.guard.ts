//ANGULAR
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
//SERVICIOS
import { SessionService } from '../API/session.service';

@Injectable()
export class TeacherGuard implements CanLoad {

   constructor(
      public _sessionSrv: SessionService,
      public router: Router
   ) { }

   canLoad() {
      let roles = this._sessionSrv.userSubject.value.roles;
      if (roles && roles.length != 0) {
         if (roles.find(role => role.id_role == 2)) return true;
         switch (roles[0].id_role) {
            case 1:
               this.router.navigate(['/admin']);
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
