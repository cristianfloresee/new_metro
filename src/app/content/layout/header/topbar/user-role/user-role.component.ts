//ANGULAR
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//SERVICIOS
import { RoleService } from '../../../../../core/services/role.service';
//CONSTANTES
import { ROLE_URL } from '../../../../../config/constants';

@Component({
   selector: 'cw-user-role',
   templateUrl: './user-role.component.html'
})
export class UserRoleComponent implements OnInit {

   current_role_index;
   //roles = ROLE_URL;
   roles;

   constructor(
      private roleSrv: RoleService,
      private router: Router
   ) { }

   ngOnInit() {
      //this.roles = JSON.parse(localStorage.getItem('user')).roles;
      this.roleSrv.roles_available$.subscribe((roles)=>{
         this.roles = roles;
         console.log("ROLES DISPONIBLES: ", roles)
      })
      //if (this.roles.length != 0) this.current_role_index = 0;
      //console.log("current... ", this.current_role_index);
      this.roleSrv.role$.subscribe((role) => {
         this.current_role_index = role;
         console.log("CURRENT ROLEXXX: ", this.current_role_index);
         console.log("ROLES: ", this.roles);
      })
   }


   changeRole(role_index) {
      this.current_role_index = role_index;
      //this.roleSrv.setRole(this.current_role_index);

      this.router.navigate([ROLE_URL[role_index].url]);
   }
}
