//ANGULAR
import { Component, OnInit } from '@angular/core';
//SERVICIOS
import { UserService } from '../../../../core/services/API/user.service';
import { SocketService } from '../../../../core/services/socket.service';

@Component({
   selector: 'cw-user',
   templateUrl: './user.component.html',
   styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

   ioConnection;

   users: any[] = [];

   constructor(
      private _userSrv: UserService,
      private _socketSrv: SocketService
   ) { }

   ngOnInit() { }

   getUsers() {
      this._userSrv.getUsers()
         .subscribe(
            result => {
               console.log("result: ", result);
               this.users = result;
               //SUSCRIBIRME AL SOCKET
            },
            error => {
               console.log("error:", error);

            });
      this.ioConnection = this._socketSrv.onUsers()
         .subscribe((data) => {
            console.log("NUEVA DATA PAPU: ", data);
         })
   }

}
