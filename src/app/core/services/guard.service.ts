import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { UserService } from "./API/user.service";
import { SessionService } from "../authentication/services/session.service";


@Injectable()
export class GuardService implements CanActivate {

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
