//ANGULAR
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
//SERVICIOS
import { SessionService } from '../API/session.service';
//OBJECT-PATH
import * as objectPath from 'object-path';

@Injectable()
export class AdminGuard implements CanLoad {

   constructor(
      public _sessionSrv: SessionService,
      public router: Router
   ) { }

   canLoad() {
      let roles = objectPath.get(this._sessionSrv.userSubject.value, 'roles');
      if (roles && roles.length != 0) {
         if (roles.find(role => role == 1)) return true;
         console.log(`url bloqued by admin guard...`);
         switch (roles[0]) {
            case 2:
               this.router.navigate(['/teacher']);
               return false;
            case 3:
               this.router.navigate(['/student']);
               return false;
         }
      }
      console.log(`url bloqued by admin guard...`);
      this.router.navigate(['/login']);
      return false;
   }

}
