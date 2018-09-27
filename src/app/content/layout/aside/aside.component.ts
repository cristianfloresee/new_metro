//ANGULAR
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
//RXJS
import { filter } from 'rxjs/operators';

import { MENU, MENU_ADMIN } from '../../../config/menu';
import { RoleService } from '../../../core/services/role.service';


@Component({
   selector: 'cw-aside',
   templateUrl: './aside.component.html'
})
export class AsideComponent implements OnInit {
   menu: any = MENU;
   currentRouteUrl: string = '';
   current_role;
   admin = MENU_ADMIN;
   gee = 'subject';
   constructor(
      private router: Router,
      private roleSrv: RoleService
   ) { }

   ngOnInit() {
      console.log(MENU);
      this.currentRouteUrl = this.router.url.split(/[?#]/)[0];
      //this.currentRouteUrl = this.router.url;
      this.getCurrentUrl();

      // this.roleSrv.current_role.subscribe((role) => {
      //    console.log("new role desde el side: ", role);
      //    this.current_role = role;
      // })
      this.roleSrv.role$.subscribe((role) => {
         this.current_role = role; //{id_role, index, name, url}
      })
   }


   //SUSCRIBE QUE OBTIENE LA URL ACTUAL LIMPIANDOLA DE PARÁMETROS
   getCurrentUrl() {
      this.router.events
         .pipe(filter(event => event instanceof NavigationEnd))
         .subscribe(() => this.currentRouteUrl = this.router.url.split(/[?#]/)[0]); //QUITA LOS PARÁMETROS DE LA URL (EJEMPLO: ?id=2)
   }

}
