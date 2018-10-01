//ANGULAR
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
//RXJS
import { filter } from 'rxjs/operators';
//CONSTANTES
import { MENU, MENU_ADMIN } from '../../../config/menu';
//SERVICIOS
import { RoleService } from '../../../core/services/role.service';

@Component({
   selector: 'cw-aside',
   templateUrl: './aside.component.html'
})
export class AsideComponent implements OnInit {

   currentRouteUrl: string = '';
   current_role;

   menu: any = MENU;
   admin = MENU_ADMIN;

   constructor(
      private router: Router,
      private roleSrv: RoleService
   ) { }

   ngOnInit() {
      console.log("menu: ", MENU);

      this.getCurrentUrl();
      this.roleSrv.role$.subscribe((role) => {
         this.current_role = role; //{id_role, index, name, url}
      })
   }


   //OBSERVABLE QUE OBTIENE LA URL ACTUAL LIMPIANDOLA DE PARÁMETROS
   getCurrentUrl() {
      this.currentRouteUrl = this.router.url.split(/[?#]/)[0];
      this.router.events
         .pipe(filter(event => event instanceof NavigationEnd))
         .subscribe(() => this.currentRouteUrl = this.router.url.split(/[?#]/)[0]); //QUITA LOS PARÁMETROS DE LA URL (EJEMPLO: ?id=2)
   }

   //PERMITE IDENTIFICAR SI EL ITEM RECIBIDO DEL MENU ES LA PÁGINA ACTIVA
   isItemActive(item) {
      if (item.url !== '/' && this.currentRouteUrl.startsWith(`${item.parent}(${item.url})`)) return true;
      return false;
   }

}
