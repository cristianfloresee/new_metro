//ANGULAR
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//SERVICIOS
import { RoleService } from '../../../../../core/services/role.service';

@Component({
   selector: 'cw-user-role',
   templateUrl: './user-role.component.html'
})
export class UserRoleComponent implements OnInit {

   //index_role;
   roles;

   constructor(
      private router: Router,
      private roleSrv: RoleService,

   ) { }

   ngOnInit() {
      this.roleSrv.rolesAvailable$.subscribe((roles) => {
         this.roles = roles;
      })
      // this.roleSrv.role$.subscribe((role) => {
      //    this.index_role = role;
      //    console.log(`index role has changed: ${this.index_role}`)
      // })
   }


   changeRole(index_role) {
      this.router.navigate([this.roles[index_role].url]);
   }

}
