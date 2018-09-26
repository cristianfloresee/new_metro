//ANGULAR
import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
//SERVICIOS
import { UserService } from "../API/user.service";
import { SessionService } from "../API/session.service";

@Injectable()
export class LoginGuard implements CanActivate {

   constructor(
      public userSrv: UserService,
      public sessionSrv: SessionService,
      public router: Router
   ){

   }
   canActivate(){
      if(this.sessionSrv.isLogged()){
         console.log("paso el guard");
          return true;
      }
      else{
         console.log("bloqueado por el guard.");
         this.router.navigate(['/login']);
         return false;
      }
   }
}
