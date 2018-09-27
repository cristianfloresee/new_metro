//ANGULAR
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';

//SERVICIOS
import { LoaderService } from './core/services/loader.service';

//RXJS
import { filter } from 'rxjs/operators';
import { PageService } from './core/services/page.service';
import { RoleService } from './core/services/role.service';
import { ROLE_URL } from './config/constants';


@Component({
   selector: 'cw-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
   animations: [
      trigger('loader_container', [
         state('false', style({ opacity: '0' })),
         state('true', style({ opacity: '0.2' })),
         transition('false => true', animate('300ms ease-in')),
         transition('true => false', animate('600ms ease-in')),
      ]),
      trigger('loader_content', [
         state('false', style({ opacity: '0' })),
         state('true', style({ opacity: '1' })),
         transition('false => true', animate('500ms ease-in')),
         transition('true => false', animate('500ms ease-in')),
      ])
   ]
})
export class AppComponent implements OnInit {
   @ViewChild('cwLoader') cwLoader: ElementRef;

   show_loader: boolean;

   constructor(
      private loaderSrv: LoaderService,
      private _pageSrv: PageService,
      private router: Router,
      private _roleSrv: RoleService
   ) {


      //OBTIENE EL NOMBRE DE LA PÁGINA ACTUAL
      this.router.events
         .pipe(filter(event => event instanceof NavigationEnd))
         .subscribe((event) => {
            let url = event['urlAfterRedirects'].slice(1);
            this._roleSrv.checkUrlRole(url);

            console.log("nombre de la página: ", this._pageSrv.getCurrentPageConfig());

            //VE SI LA URL CARGADA CORRESPONDE A UNA URL INICIAL DE ROL
            // if (ROLE_URL.find(role => role.url == url)) {
            //    this._roleSrv.holi(url);
            // }


            //let index_role = ROLE_URL.find(role => role.url == url);


            // if (index_role !== undefined) {
            //    console.log(`URL ${url}, index ${index_role}`)
            //    //this._roleSrv.setRole(index_role)
            //    this._roleSrv.changeRole(index_role)
            // }

            //this.layoutConfigService.setModel({ page: objectPath.get(this.pageConfigService.getCurrentPageConfig(), 'config') }, true);
         });

   }



   ngOnInit() {
      this.loaderSrv.status.subscribe((status: boolean) => {
         this.show_loader = status;
         if (status) this.cwLoader.nativeElement.style.display = 'block';
         else setTimeout(() => this.cwLoader.nativeElement.style.display = 'none', 600)
      })
   }
}
