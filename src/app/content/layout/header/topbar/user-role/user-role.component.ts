//ANGULAR
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//SERVICIOS
import { RoleService } from '../../../../../core/services/role.service';
//CONSTANTES
import { ROLE_URL } from '../../../../../config/constants';
import { LetDirective } from '../../../../../core/directives/let.directive';

@Component({
   selector: 'cw-user-role',
   templateUrl: './user-role.component.html'
})
export class UserRoleComponent implements OnInit {

   //index_role;
   roles;

   constructor(
      private roleSrv: RoleService,
      private router: Router
   ) { }

   ngOnInit() {
      this.roleSrv.roles_available$.subscribe((roles) => {
         this.roles = roles;
      })
      // this.roleSrv.role$.subscribe((role) => {
      //    this.index_role = role;
      //    console.log(`index role has changed: ${this.index_role}`)
      // })
   }


   changeRole(index_role) {
      //this.index_role = index_role;
      this.router.navigate([this.roles[index_role].url]);
   }
}
